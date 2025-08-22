export const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function handle(res) {
    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json") ? await res.json() : await res.text();
    if (!res.ok) {
        const err = new Error(data?.message || res.statusText);
        err.status = res.status;
        err.data = data;
        throw err;
    }
    return data;
}

const api = {
    get: (path, init) => fetch(`${API_BASE}${path}`, { method: "GET", ...init }).then(handle),
    post: (path, body, init) =>
        fetch(`${API_BASE}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
            body: JSON.stringify(body),
            ...init,
        }).then(handle),
};

// === Chatbot endpoints ===
export const listSessions = () => api.get("/chatbot");
export const getSessionMessages = (sessionId) => api.get(`/chatbot/${sessionId}`);
export const sendMessage = ({ sessionId, message }) => api.post("/chatbot", { sessionId, message });