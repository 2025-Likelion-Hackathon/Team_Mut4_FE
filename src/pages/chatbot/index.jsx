import React from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import {BotBubble, MessageTime, UserBubble} from "./components/MessageBubble";
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

function fmtTime(ts) {
    try {
        return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
        return "";
    }
}

/** 인트로 카드 + 유저 입력 칩 */
function IntroCard() {
    return (
        <div>
            <p className="text-[13px] leading-5">
                반가워요, 저는 여행 도우미 <b className="font-semibold">토박이</b>입니다.{" "}
                <span className="ml-0.5">👋</span>
                <br />
                신나는 여행을 도와드릴게요! 아래 내용을 알려주세요!
            </p>
            <ol className="mt-3 list-decimal pl-5 space-y-1 text-[13px] ">
                <li>가고 싶은 도시</li>
                <li>여행 일수</li>
                <li>선호하는 음식 종류</li>
            </ol>
            <div className="flex justify-end">
                <div className="max-w-[80%] text-right">
                    {/* ✅ 흰색 말풍선 + 테두리 */}
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
        sessionId,
        setSessionId,
        messages,
        setMessages,
        addMessage,
        sessions,
        setSessions,
        isSending,
        setSending,
    } = useChatStore();

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [text, setText] = React.useState("");
    const listRef = React.useRef(null);
    const navigate = useNavigate();

    // 페이지 진입 시 항상 새 세션으로 시작 + 목록만 로드
    React.useEffect(() => {
        (async () => {
            const freshId = startNewSessionId();
            setSessionId(freshId);
            setMessages([]);

            try {
                const ids = await listSessions();
                const normalized = Array.isArray(ids)
                    ? ids.map((i) => (typeof i === "string" ? { id: i, title: i } : i))
                    : [];
                setSessions(normalized);
            } catch (e) {
                console.error("listSessions error:", e);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openDrawer = async () => {
        setDrawerOpen(true);
        try {
            const ids = await listSessions();
            const normalized = Array.isArray(ids)
                ? ids.map((i) => (typeof i === "string" ? { id: i, title: i } : i))
                : [];
            setSessions(normalized);
        } catch (e) {
            console.error("listSessions error:", e);
        }
    };

    const pickSession = async (s) => {
        const id = s?.id || s;
        if (!id) return;
        setCurrentSessionId(id);
        setSessionId(id);
        try {
            const ms = await getSessionMessages(id);
            setMessages(ms || []);
        } catch (e) {
            console.error("getSessionMessages error:", e);
            setMessages([]);
        }
    };

    const onSend = async (value) => {
        const content = (value ?? text).trim();
        if (!content || isSending) return;

        const sid = sessionId || getCurrentSessionId();

        // 사용자 메시지 먼저 렌더
        addMessage({ role: "user", content, createdAt: Date.now() });
        setText("");
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

    // 자동 스크롤
    React.useEffect(() => {
        if (!listRef.current) return;
        listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, isSending]);

    // 마지막 사용자 입력(칩에 노출)
    const lastUserText =
        [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // 지도 페이지 이동
    const goMap = React.useCallback(() => {
        const sid = sessionId || getCurrentSessionId();
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
                after={
                    structured ? (
                        <ScheduleCards content={m.content} onOpenMap={goMap} />
                    ) : null
                }
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

            {/* 스크롤 영역: 안쪽을 살짝 회색으로 */}
            <div ref={listRef} className="w-full ">
                <div className="mx-auto w-full max-w-[420px] px-4 pt-4 pb-[150px] space-y-4">
                    {/* 인트로 카드 + 사용자 입력 칩 */}
                    <IntroCard latestUserText={lastUserText} />

                    {/* 메시지들 */}
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