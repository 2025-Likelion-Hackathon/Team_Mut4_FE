const NAV_HEIGHT_PX = 0;

export default function InputBar({ value, onChange, onSend, disabled }) {
    return (
        <div
            className="
        fixed z-50 left-1/2 -translate-x-1/2 w-full max-w-[420px]
        bg-white/90 backdrop-blur border-t border-gray-100
      "
            style={{ bottom: `calc(${NAV_HEIGHT_PX}px + env(safe-area-inset-bottom, 0px))` }}
        >
            <div className="px-3 py-2">
                <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); onSend?.(); }}>
                    <div className="flex-1">
                        <label htmlFor="chatInput" className="sr-only">메시지 입력</label>
                        <textarea
                            id="chatInput"
                            rows={1}
                            value={value}
                            onChange={(e) => onChange?.(e.target.value)}
                            placeholder=" ex) 제주 3일 한식"
                            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[15px]
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={disabled}
                        className={`px-4 py-2 rounded-xl ${
                            disabled
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-[#0DA872] text-white hover:bg-[#0DA872] active:scale-95'
                        }`}
                    >
                        전송
                    </button>
                </form>
            </div>
        </div>
    );
}