import React from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { BotBubble, UserBubble } from "./components/MessageBubble";
import TypingIndicator from "./components/TypingIndicator";
import { ScheduleCards } from "./components/ScheduleCards";
import InputBar from "./components/InputBar";
import HistoryDrawer from "./components/HistoryDrawer";
import { useChatStore } from "../../stores/useChatStore.js";
import {
    listSessions,
    getSessionMessages,
    sendMessage,
    getCurrentSessionId,
    startNewSessionId,
    setCurrentSessionId,
} from "../../api/ChatBot.js";

/* ---------------------- 세션 제목 유틸 ---------------------- */
const TITLE_CACHE_KEY = "chatbot.sessionTitles";
const readTitleCache = () => {
    try { return JSON.parse(localStorage.getItem(TITLE_CACHE_KEY) || "{}"); }
    catch { return {}; }
};
const writeTitleCache = (obj) => {
    try { localStorage.setItem(TITLE_CACHE_KEY, JSON.stringify(obj || {})); }
    catch {}
};
const extractTitleFromMessages = (messages, fallback = "새 대화") => {
    if (!Array.isArray(messages)) return fallback;
    const firstUser = messages.find(
        (m) => m?.role === "user" && typeof m.content === "string" && m.content.trim()
    );
    const raw = firstUser?.content || fallback;
    const oneLine = raw.split("\n")[0].replace(/\s+/g, " ").trim();
    return oneLine.length > 30 ? oneLine.slice(0, 30) + "…" : (oneLine || fallback);
};
/* ---------------------------------------------------------- */

/** 인트로 카드 */
function IntroCard() {
    return (
        <div>
            <p className="text-[13px] leading-5">
                반가워요, 저는 여행 도우미 <b className="font-semibold">토박이</b>입니다. 👋<br />
                신나는 여행을 도와드릴게요! 아래 내용을 알려주세요!
            </p>
            <ol className="mt-3 list-decimal pl-5 space-y-1 text-[13px] ">
                <li>가고 싶은 도시</li>
                <li>여행 일수</li>
                <li>선호하는 음식 종류</li>
            </ol>
            <div className="flex justify-end">
                <div className="max-w-[80%] text-right">
                    <div className="inline-block rounded-2xl rounded-tr-md bg-white text-gray-900 px-4 py-2 border border-gray-200 shadow-sm whitespace-pre-wrap break-words">
                        '제주 3일 한식' 처럼 입력하세요
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AIChatbotPage() {
    const {
        sessionId, setSessionId,
        messages, setMessages, addMessage,
        sessions, setSessions,
        isSending, setSending,
    } = useChatStore();

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [text, setText] = React.useState("");
    const listRef = React.useRef(null);
    const navigate = useNavigate();

    /* 1) 진입 시 새 세션 시작 + 세션 목록 로딩(제목은 캐시만) */
    React.useEffect(() => {
        (async () => {
            const freshId = startNewSessionId();
            setSessionId(freshId);
            setMessages([]);

            const cache = readTitleCache();
            try {
                const ids = await listSessions();
                const normalized = Array.isArray(ids)
                    ? ids.map((i) => (typeof i === "string" ? { id: i } : i))
                    : [];
                const withTitles = normalized.map((s) => ({
                    id: s.id,
                    title: (s.title && s.title.trim()) || cache[s.id] || s.id, // 캐시 없으면 id 노출
                }));
                setSessions(withTitles);
            } catch (e) {
                console.error("listSessions error:", e);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* 2) 드로어 열 때도 캐시 기반으로만 갱신 */
    const openDrawer = async () => {
        setDrawerOpen(true);
        try {
            const cache = readTitleCache();
            const ids = await listSessions();
            const normalized = Array.isArray(ids)
                ? ids.map((i) => (typeof i === "string" ? { id: i } : i))
                : [];
            const withTitles = normalized.map((s) => ({
                id: s.id,
                title: (s.title && s.title.trim()) || cache[s.id] || s.id,
            }));
            setSessions(withTitles);
        } catch (e) {
            console.error("listSessions error:", e);
        }
    };

    /* 3) 세션 선택 시에만 메시지 불러와서 제목 계산 + 캐시/목록 갱신 */
    const pickSession = async (s) => {
        const id = s?.id || s;
        if (!id) return;
        setCurrentSessionId(id);
        setSessionId(id);
        try {
            const ms = await getSessionMessages(id);
            setMessages(ms || []);

            const title = extractTitleFromMessages(ms, s?.title || "새 대화");
            setSessions((prev) => (prev || []).map((x) => (x.id === id ? { ...x, title } : x)));

            const cache = readTitleCache();
            if (cache[id] !== title) {
                cache[id] = title;
                writeTitleCache(cache);
            }
        } catch (e) {
            console.error("getSessionMessages error:", e);
            setMessages([]);
        }
    };

    /* 4) 메시지 전송: 첫 사용자 입력이면 즉시 제목 캐시/목록 반영 */
    const onSend = async (value) => {
        const content = (value ?? text).trim();
        if (!content || isSending) return;
        const sid = sessionId || getCurrentSessionId();

        addMessage({ role: "user", content, createdAt: Date.now() });
        setText("");

        // 첫 사용자 입력으로 제목 세팅(캐시+목록)
        try {
            const cache = readTitleCache();
            if (!cache[sid]) {
                const title = extractTitleFromMessages([{ role: "user", content }], "새 대화");
                cache[sid] = title;
                writeTitleCache(cache);
                setSessions((prev = []) => {
                    const exists = prev.some((x) => x.id === sid);
                    return exists
                        ? prev.map((x) => (x.id === sid ? { ...x, title } : x))
                        : [{ id: sid, title }, ...prev];
                });
            }
        } catch {}

        setSending(true);
        try {
            const res = await sendMessage({ content, sessionId: sid });
            if (res?.message) {
                addMessage({
                    role: res.message.role || "assistant",
                    content: res.message.content,
                    createdAt: Date.now(),
                });
            }
        } catch (e) {
            console.error("sendMessage error:", e);
            addMessage({
                role: "assistant",
                content: "죄송해요. 서버 응답이 불안정해요. 잠시 후 다시 시도해주세요.",
                createdAt: Date.now(),
            });
        } finally {
            setSending(false);
        }
    };

    /* 자동 스크롤 */
    React.useEffect(() => {
        if (!listRef.current) return;
        listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, isSending]);

    /* 마지막 사용자 입력(인트로 칩 표시는 유지) */
    const lastUserText =
        [...messages].reverse().find((m) => m.role === "user")?.content || "";

    /* 지도 페이지로 이동 — 프로젝트 라우터에 맞춰 경로 설정 */
    const goMap = React.useCallback(() => {
        const sid = sessionId || getCurrentSessionId();
        // 라우터가 /chatbot/map 이면 아래 줄 사용:
        // navigate("/chatbot/map", { state: { sessionId: sid } });
        navigate("/map", { state: { sessionId: sid } });
    }, [navigate, sessionId]);

    const renderMessage = (m, i) => {
        if (m.role === "user") {
            return (
                <UserBubble key={i}>
                    {typeof m.content === "string" ? m.content : JSON.stringify(m.content)}
                </UserBubble>
            );
        }
        const structured = Array.isArray(m.content);
        return (
            <BotBubble
                key={i}
                after={structured ? <ScheduleCards content={m.content} onOpenMap={goMap} /> : null}
            >
                {structured
                    ? "아래 일정으로 정리했어요:"
                    : typeof m.content === "string"
                        ? m.content
                        : JSON.stringify(m.content)}
            </BotBubble>
        );
    };

    return (
        <div className="min-h-svh bg-gray-50 text-gray-900">
            <TopBar onOpenMenu={openDrawer} />

            <div ref={listRef} className="w-full ">
                <div className="mx-auto w-full max-w-[420px] px-4 pt-4 pb-[150px] space-y-4">
                    <IntroCard latestUserText={lastUserText} />
                    {messages.map(renderMessage)}
                    {isSending && <TypingIndicator />}
                </div>
            </div>

            <InputBar
                value={text}
                onChange={setText}
                onSend={() => onSend()}
                disabled={!text.trim() || isSending}
            />

            <HistoryDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sessions={sessions}
                onSelect={pickSession}
            />
        </div>
    );
}