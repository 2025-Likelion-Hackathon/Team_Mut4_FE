import React from "react";
import { TopBar } from "./components/TopBar";
import { BotBubble, UserBubble } from "./components/MessageBubble";
import TypingIndicator from "./components/TypingIndicator";
import QuickReplies from "./components/QuickReplies";
import { ScheduleCards } from "./components/ScheduleCards";
import InputBar from "./components/InputBar";
import HistoryDrawer from "./components/HistoryDrawer";
import { useChatStore } from "../../stores/useChatStore.js";
import { listSessions, getSessionMessages, sendMessage } from "../../api/ChatBot.js";

function fmtTime(ts){ try{ return new Date(ts).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}); } catch { return ""; } }

export default function AIChatbotPage(){
    const { sessionId, setSessionId, messages, setMessages, addMessage, sessions, setSessions, isSending, setSending } = useChatStore();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [text, setText] = React.useState("");
    const listRef = React.useRef(null);

    React.useEffect(()=>{ (async()=>{
        try {
            const s = await listSessions();
            const normalized = Array.isArray(s) ? s.map((item)=> (typeof item === 'string' ? {id:item, title:item} : { id: item.id || item, title: item.title || item.id || String(item), updatedAt: item.updatedAt })) : [];
            setSessions(normalized);
            if (sessionId){ const ms = await getSessionMessages(sessionId); setMessages(ms||[]); }
        } catch(e){ console.error(e); }
    })(); }, []); // eslint-disable-line

    const openDrawer = async ()=>{ setDrawerOpen(true); try{ const s = await listSessions(); const normalized = Array.isArray(s)? s.map((item)=> (typeof item==='string'? {id:item,title:item}:{id:item.id||item,title:item.title||item.id||String(item),updatedAt:item.updatedAt})) : []; setSessions(normalized);}catch(e){console.error(e);} };

    const pickSession = async (s)=>{ const id = s?.id || s; if(!id) return; setSessionId(id); try{ const ms = await getSessionMessages(id); setMessages(ms||[]);}catch(e){console.error(e);} };

    const onSend = async (value)=>{
        const content = (value ?? text).trim(); if(!content || isSending) return;
        const userMsg = { role:'user', content, createdAt: Date.now() }; addMessage(userMsg); setText(""); setSending(true);
        try {
            const res = await sendMessage({ sessionId: sessionId || undefined, message: { role:'user', content } });
            if (res?.sessionId && res.sessionId !== sessionId) setSessionId(res.sessionId);
            if (res?.message) addMessage({ role: res.message.role || 'assistant', content: res.message.content, createdAt: Date.now() });
        } catch(e){ console.error(e); addMessage({ role:'assistant', content:'죄송해요. 네트워크 오류가 발생했어요.', createdAt: Date.now() }); }
        finally { setSending(false); }
    };

    const onPickQuick = (label)=>{ setText(label); onSend(label); };

    React.useEffect(()=>{ if(!listRef.current) return; listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior:'smooth' }); }, [messages, isSending]);

    const renderMessage = (m, i)=>{
        const time = fmtTime(m.createdAt);
        if (m.role === 'user') return <UserBubble key={i} time={time}>{typeof m.content === 'string' ? m.content : JSON.stringify(m.content)}</UserBubble>;
        const structured = Array.isArray(m.content);
        return (
            <BotBubble key={i} time={time} after={structured ? <ScheduleCards content={m.content}/> : null}>
                {structured ? '아래 일정으로 정리했어요:' : (typeof m.content === 'string' ? m.content : JSON.stringify(m.content))}
            </BotBubble>
        );
    };

    return (
        <div className="min-h-svh bg-white text-gray-900">
            <TopBar onOpenMenu={openDrawer} />
            <main ref={listRef} className="w-full px-4 pt-4 pb-[150px] space-y-4 overflow-y-auto">
                {!messages?.length && (
                    <div className="flex justify-center">
                        <div className="max-w-[92%] rounded-2xl border border-dashed border-gray-300 p-4 text-center text-sm text-gray-600">
                            반가워요! 저는 여행 도우미 <b className="font-semibold">토박이</b>에요. 아래처럼 알려주세요.<br/> 1) 가고 싶은 도시 2) 여행 일수 3) 선호 음식
                        </div>
                    </div>
                )}
                {messages.map(renderMessage)}
                {isSending && <TypingIndicator />}
                <div>
                    <QuickReplies items={["메뉴 추천해줘","가격대는?","예약 필요해?","대중교통으로 가는 법"]} onPick={onPickQuick} />
                </div>
            </main>
            <InputBar value={text} onChange={setText} onSend={()=>onSend()} disabled={!text.trim()||isSending} />
            <HistoryDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} sessions={sessions} onSelect={pickSession} />
        </div>
    );
}
