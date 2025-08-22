// /src/pages/chatbot/components/TypingIndicator.jsx
export default function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-md bg-gray-100 px-3 py-2 text-gray-600">
                <span className="text-sm">토박이가 입력 중</span>
                <span className="inline-flex ml-1 align-middle">
          <span className="w-1.5 h-1.5 mx-0.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.2s]"/>
          <span className="w-1.5 h-1.5 mx-0.5 rounded-full bg-gray-400 animate-bounce"/>
          <span className="w-1.5 h-1.5 mx-0.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"/>
        </span>
            </div>
        </div>
    );
}