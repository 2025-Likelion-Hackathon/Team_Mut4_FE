// src/api/mockServer.js
import { getDB, setDB, SEED_SESSION_ID, JEJU_3DAYS_KFOOD } from "./mockData";

const sleep = (ms = 400) => new Promise(r => setTimeout(r, ms));

function newId() {
    try { return crypto.randomUUID(); } catch { return `id-${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
}

export async function mockListSessions() {
    await sleep();
    const db = getDB();
    return db.sessions.slice(); // ["session-1", ...]
}

export async function mockGetSessionMessages(sessionId) {
    await sleep();
    const db = getDB();
    return (db.messages[sessionId] || []).slice();
}

export async function mockSendMessage({ sessionId, message }) {
    await sleep(500);
    const db = getDB();
    if (!sessionId) sessionId = newId();

    if (!db.sessions.includes(sessionId)) db.sessions.unshift(sessionId);
    if (!db.messages[sessionId]) db.messages[sessionId] = [];

    // 1) 유저 메시지 저장
    const uid = ++db.lastId;
    db.messages[sessionId].push({
        id: uid,
        sessionId,
        role: "user",
        content: message?.content ?? "",
        createdAt: new Date().toISOString(),
    });

    // 2) 봇 응답: “제주/3일/한식” 키워드면 카드, 아니면 일반 텍스트
    let botContent;
    const txt = (message?.content || "").toLowerCase();
    if (/(제주|jeju)/.test(txt) && /(3|삼).*(일)/.test(txt) && /(한식|korean)/.test(txt)) {
        botContent = JEJU_3DAYS_KFOOD;
    } else {
        botContent = "일정을 만들었어요. 상단 메뉴에서 '이전 대화'로 다른 세션도 확인할 수 있어요!";
    }

    const aid = ++db.lastId;
    const assistantMessage = {
        id: aid,
        sessionId,
        role: "assistant",
        content: botContent,
        createdAt: new Date().toISOString(),
    };
    db.messages[sessionId].push(assistantMessage);

    setDB(db);

    // Swagger 응답 예시와 비슷하게 돌려줌
    return {
        sessionId,
        message: assistantMessage,
    };
}