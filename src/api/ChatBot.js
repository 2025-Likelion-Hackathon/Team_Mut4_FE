// src/api/ChatBot.js
export const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ✅ 고정 세션 ID
export const FIXED_SESSION_ID = "some-unique-session-id-128";

// ---- 공통 fetch 래퍼 ----
async function handle(res) {
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch { data = text; }

    if (!res.ok) {
        const msg =
            (data && typeof data === "object" && (data.message || data.error || data.detail)) ||
            (typeof data === "string" ? data : "") ||
            `HTTP ${res.status}`;
        const err = new Error(msg);
        err.status = res.status;
        err.data = data;
        throw err;
    }
    return data;
}

const api = {
    get: (p, init) => fetch(`${API_BASE}${p}`, { method: "GET", ...init }).then(handle),
    post: (p, body, init) =>
        fetch(`${API_BASE}${p}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
            body: JSON.stringify(body),
            ...init,
        }).then(handle),
};

// ---- API ----
export const listSessions = () => api.get("/chatbot");

// 고정 세션으로 조회 (id를 넘기면 그걸 사용하고, 없으면 고정값 사용)
export const getSessionMessages = (id) => api.get(`/chatbot/${id || FIXED_SESSION_ID}`);

/** ✅ 항상 고정 sessionId + role:'user' 로 전송 */
export function sendMessage({ content }) {
    return api.post("/chatbot", {
        sessionId: FIXED_SESSION_ID,
        message: { role: "user", content },
    });
}