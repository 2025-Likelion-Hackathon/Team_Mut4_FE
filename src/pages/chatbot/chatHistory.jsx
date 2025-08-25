// src/pages/chatbot/chatHistory.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { listSessions, getSessionMessages } from "../../api/ChatBot";

import { ScheduleCards } from "./components/ScheduleCards";
import { BotBubble, UserBubble } from "./components/MessageBubble";

/* -------------------------------- UI -------------------------------- */

function TitleBar({ title, onBack, showBack }) {
    return (
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100">
            <div className="relative h-12 flex items-center px-3">
                {showBack && (
                    <button
                        onClick={onBack}
                        className="absolute left-2 p-2 rounded-full hover:bg-gray-100 active:scale-95"
                        aria-label="뒤로"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                        </svg>
                    </button>
                )}
                <h1 className="mx-auto text-sm font-semibold text-gray-900 truncate max-w-[70%]">
                    {title}
                </h1>
            </div>
        </header>
    );
}

const Empty = ({ children }) => (
    <p className="text-center text-sm text-gray-500 py-16">{children}</p>
);

const fmtTime = (ts) => {
    try { return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
    catch { return ""; }
};

/* --------------------------- helpers (공통화) --------------------------- */

// 어떤 형태가 와도 배열 [{id,title,updatedAt}] 로 변환
const ensureArray = (xs) => {
    if (Array.isArray(xs)) return xs;
    if (!xs) return [];
    if (typeof xs === "string") return [{ id: xs, title: xs }];
    if (typeof xs === "object") {
        return Object.entries(xs).map(([id, title]) => ({
            id,
            title: String(title || id),
        }));
    }
    return [];
};

// 제목이 비었거나 id와 같은 항목의 title을 첫 사용자 메시지로 채움
async function hydrateTitlesWithFirstUserMessage(items, limit = 30) {
    const need = items.filter((it) => !it.title || it.title === it.id).slice(0, limit);
    if (need.length === 0) return items;

    const settled = await Promise.allSettled(
        need.map(async (it) => {
            const ms = await getSessionMessages(it.id);
            const firstUser =
                Array.isArray(ms) && ms.find((m) => m?.role === "user" && typeof m.content === "string");
            const title = firstUser?.content?.trim();
            return { id: it.id, title: title && title.length ? title : it.title || it.id };
        })
    );

    const titleMap = new Map();
    settled.forEach((r) => {
        if (r.status === "fulfilled") titleMap.set(r.value.id, r.value.title);
    });

    return items.map((it) => (titleMap.has(it.id) ? { ...it, title: titleMap.get(it.id) } : it));
}

/* ----------------------------- Page ----------------------------- */

export default function ChatHistoryPage() {
    const navigate = useNavigate();

    const [view, setView] = React.useState("list");

    // 목록 상태
    const [sessions, setSessions] = React.useState([]);
    const [loadingList, setLoadingList] = React.useState(true);
    const [errList, setErrList] = React.useState("");

    // 상세 상태
    const [current, setCurrent] = React.useState(null); // { id, title }
    const [messages, setMessages] = React.useState([]);
    const [loadingMsg, setLoadingMsg] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState("");

    // 최초 목록 로드 (HistoryDrawer와 동일한 정규화/제목 보강)
    React.useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                const raw = await listSessions();
                // 1) 타입 안전 정규화
                let items = ensureArray(raw).map((item) =>
                    typeof item === "string"
                        ? { id: item, title: item }
                        : {
                            id: item.id ?? item,
                            title: item.title ?? (typeof item === "string" ? item : ""),
                            updatedAt: item.updatedAt,
                        }
                );
                // 2) 제목 비어있으면 첫 사용자 메시지로 보강
                items = await hydrateTitlesWithFirstUserMessage(items);

                if (!ignore) setSessions(items);
            } catch (e) {
                if (!ignore) setErrList(e?.message || "목록을 불러오지 못했습니다.");
            } finally {
                if (!ignore) setLoadingList(false);
            }
        })();
        return () => { ignore = true; };
    }, []);

    const openSession = async (s) => {
        const id = s.id || s;
        const title = s.title || id;
        setCurrent({ id, title });
        setView("detail");

        setLoadingMsg(true);
        setErrMsg("");
        try {
            const ms = await getSessionMessages(id);
            setMessages(ms || []);
        } catch (e) {
            setErrMsg(e?.message || "대화를 불러오지 못했습니다.");
        } finally {
            setLoadingMsg(false);
        }
    };

    const backToList = () => {
        setView("list");
        setCurrent(null);
        setMessages([]);
    };

    const renderMsg = (m, i) => {
        const t = fmtTime(m.createdAt);
        if (m.role === "user") {
            return (
                <UserBubble key={i} time={t}>
                    {typeof m.content === "string" ? m.content : JSON.stringify(m.content)}
                </UserBubble>
            );
        }
        const structured = Array.isArray(m.content);
        return (
            <BotBubble key={i} time={t} after={structured ? <ScheduleCards content={m.content} /> : null}>
                {structured
                    ? "아래 일정으로 정리했어요:"
                    : typeof m.content === "string"
                        ? m.content
                        : JSON.stringify(m.content)}
            </BotBubble>
        );
    };

    if (view === "detail") {
        return (
            <div className="min-h-svh bg-white">
                <TitleBar title={current?.title || "세션"} onBack={backToList} showBack />
                <main className="mx-auto w-full max-w-[640px] px-4 pt-4 pb-[120px] space-y-4">
                    {loadingMsg && <p className="text-sm text-gray-500 p-4">불러오는 중…</p>}
                    {errMsg && <p className="text-sm text-red-600 p-4">{errMsg}</p>}
                    {!loadingMsg && !errMsg && (messages?.length ? messages.map(renderMsg) : <Empty>대화가 없습니다.</Empty>)}
                    <div className="pt-2">
                        <button
                            onClick={() => navigate("/chatbot")}
                            className="w-full text-center text-sm px-4 py-3 rounded-xl border hover:bg-gray-50"
                        >
                            이 세션으로 이동
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-svh bg-white">
            <TitleBar title="이전 대화" onBack={() => navigate(-1)} showBack />
            <main className="mx-auto w-full max-w-[420px] px-4 py-4 space-y-2">
                {loadingList && <p className="text-sm text-gray-500 p-4">불러오는 중…</p>}
                {errList && <p className="text-sm text-red-600 p-4">{errList}</p>}

                {!loadingList && !errList && sessions.length === 0 && (
                    <Empty>세션이 없습니다.</Empty>
                )}

                {sessions.map((s) => (
                    <button
                        key={s.id || s}
                        onClick={() => openSession(s)}
                        className="w-full text-left p-4 rounded-xl border hover:bg-gray-50"
                    >
                        <div className="text-sm font-medium truncate">
                            {s.title || s.id || String(s)}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                            {s.updatedAt ? new Date(s.updatedAt).toLocaleString() : ""}
                        </div>
                    </button>
                ))}
            </main>
        </div>
    );
}