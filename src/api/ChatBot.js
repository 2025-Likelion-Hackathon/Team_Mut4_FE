// src/api/ChatBot.js
// ⚡ 하나의 인터페이스(listSessions/getSessionMessages/sendMessage)
//    - USE_MOCK=1 이면 mock으로 동작
//    - USE_MOCK=0 이면 실서버로 동작
//    - 실서버와 스웨거 시그니처 일치

import { createMockDB } from "./mockData";

export const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
export const USE_MOCK = String(import.meta.env.VITE_USE_MOCK || "0") === "1";

// ── 공통 세션 헬퍼(로컬 유지) ─────────────────────────────
const SESSION_KEY = "jeju.sessionId";
function getLocalId() { try { return localStorage.getItem(SESSION_KEY); } catch { return null; } }
function setLocalId(id) { try { id ? localStorage.setItem(SESSION_KEY, id) : localStorage.removeItem(SESSION_KEY); } catch {} }
function uuid() {
    try { return crypto.randomUUID(); }
    catch { return `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
}

// 외부에서 쓸 수 있게 노출
export function getCurrentSessionId() {
    return getLocalId();
}
export function setCurrentSessionId(id) {
    setLocalId(id);
    return id;
}
export function startNewSessionId() {
    const id = uuid();
    setLocalId(id);
    return id;
}

// ── 실서버 구현 ─────────────────────────────────────────
async function handle(res) {
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch { data = text; }
    if (!res.ok) {
        const msg =
            (data && typeof data === "object" && (data.message || data.error || data.detail)) ||
            (typeof data === "string" ? data : "") || `HTTP ${res.status}`;
        const err = new Error(msg);
        err.status = res.status;
        err.data = data;
        throw err;
    }
    return data;
}
const realApi = {
    get: (p, init) => fetch(`${API_BASE}${p}`, { method: "GET", ...init }).then(handle),
    post: (p, body, init) => fetch(`${API_BASE}${p}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
        body: JSON.stringify(body),
        ...init,
    }).then(handle),
};
const real = {
    async listSessions() {
        return realApi.get("/chatbot"); // ["sessionId1", ...]
    },
    async getSessionMessages(id) {
        if (!id) throw new Error("sessionId required");
        return realApi.get(`/chatbot/${id}`); // [{id, sessionId, role, content, createdAt}, ...] or 유사
    },
    async sendMessage({ content, sessionId }) {
        const sid = sessionId || getLocalId() || startNewSessionId();
        const payload = { sessionId: sid, message: { role: "user", content } };
        const res = await realApi.post("/chatbot", payload);
        // 실서버가 sessionId를 돌려주면 로컬 갱신
        if (res?.sessionId) setLocalId(res.sessionId);
        return res;
    },
};

// ── 목업 구현 ───────────────────────────────────────────
const mockDB = USE_MOCK ? createMockDB() : null;
const mock = {
    listSessions() {
        return Promise.resolve(mockDB.listSessions());
    },
    getSessionMessages(id) {
        if (!id) return Promise.resolve([]);
        return Promise.resolve(mockDB.getMessages(id));
    },
    sendMessage({ content, sessionId }) {
        const sid = sessionId || getLocalId() || startNewSessionId();
        const res = mockDB.send({ sessionId: sid, message: { role: "user", content } });
        setLocalId(res.sessionId);
        return Promise.resolve(res);
    },
};

// ── export (외부에 동일 API 제공) ────────────────────────
export const listSessions = (...a) => (USE_MOCK ? mock.listSessions(...a) : real.listSessions(...a));
export const getSessionMessages = (...a) => (USE_MOCK ? mock.getSessionMessages(...a) : real.getSessionMessages(...a));
export const sendMessage = (...a) => (USE_MOCK ? mock.sendMessage(...a) : real.sendMessage(...a));
