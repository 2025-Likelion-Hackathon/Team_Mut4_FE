// /src/pages/chatbot/components/MessageBubble.jsx
export function MessageTime({ children }) {
    return <span className="mt-1 block text-[10px] text-gray-400">{children}</span>;
}

export function BotBubble({ children, after }) {
    return (
        <div className="flex justify-start">
            <div className="max-w-[80%]">
                <div>
                    {children}
                </div>
                {after}
            </div>
        </div>
    );
}

export function UserBubble({ children, time }) {
    return (
        <div className="flex justify-end">
            <div className="max-w-[80%] text-right">
                {/* ✅ 흰색 말풍선 + 테두리 */}
                <div className="inline-block rounded-2xl rounded-tr-md bg-white text-gray-900 px-4 py-2 border border-gray-200 shadow-sm whitespace-pre-wrap break-words">
                    {children}
                </div>
                {time && <MessageTime>{time}</MessageTime>}
            </div>
        </div>
    );
}