// /src/pages/chatbot/components/MessageBubble.jsx
export function MessageTime({ children }) {
    return <span className="mt-1 block text-[10px] text-gray-400">{children}</span>;
}

export function BotBubble({ children, time, after }) {
    return (
        <div className="flex justify-start">
            <div className="max-w-[80%]">
                <div className="rounded-2xl rounded-tl-md bg-gray-100 text-gray-900 px-4 py-2 shadow-sm whitespace-pre-wrap break-words">
                    {children}
                </div>
                {time && <MessageTime>{time}</MessageTime>}
                {after}
            </div>
        </div>
    );
}

export function UserBubble({ children, time }) {
    return (
        <div className="flex justify-end">
            <div className="max-w-[80%] text-right">
                <div className="inline-block rounded-2xl rounded-tr-md bg-blue-600 text-white px-4 py-2 shadow-sm whitespace-pre-wrap break-words">
                    {children}
                </div>
                {time && <MessageTime>{time}</MessageTime>}
            </div>
        </div>
    );
}