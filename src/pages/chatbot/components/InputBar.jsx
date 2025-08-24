// InputBar.jsx
const NAV_HEIGHT_PX = 64; // 하단 탭 높이 맞춰서

export default function InputBar({ value, onChange, onSend, disabled }) {
    return (
        <div
            className="
        fixed z-50
        left-1/2 -translate-x-1/2        /* ← 가로 중앙 */
        w-full max-w-[420px]              /* ← 본문과 동일 폭 */
        bg-white/90 backdrop-blur border-t border-gray-100
      "
            style={{ bottom: `calc(${NAV_HEIGHT_PX}px + env(safe-area-inset-bottom, 0px))` }}
        >
            <div className="px-3 py-2">
                <form
                    className="flex items-end gap-2"
                    onSubmit={(e) => { e.preventDefault(); onSend?.(); }}
                >
                    <div className="flex-1">
                        <label htmlFor="chatInput" className="sr-only">메시지 입력</label>
                        <textarea
                            id="chatInput"
                            rows={1}
                            value={value}
                            onChange={(e) => onChange?.(e.target.value)}
                            placeholder="제주도에 대해 궁금한 걸 물어보세요!"
                            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[15px]
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={disabled}
                        className={`px-4 py-2 rounded-xl ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'}`}
                    >
                        전송
                    </button>
                </form>
            </div>
        </div>
    );
}