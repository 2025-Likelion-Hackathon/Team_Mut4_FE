export default function HistoryDrawer({ open, onClose, sessions = [], onSelect }){
    return (
        <div className={`fixed inset-0 z-40 ${open?"":"pointer-events-none"}`}>
            <div onClick={onClose} className={`absolute inset-0 bg-black/30 transition-opacity ${open?"opacity-100":"opacity-0"}`}/>
            <aside className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl transition-transform ${open?"translate-x-0":"translate-x-full"}`}>
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-semibold">이전 대화</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" aria-label="닫기">✕</button>
                </div>
                <div className="p-2 space-y-2 overflow-y-auto h-[calc(100%-56px)]">
                    {sessions.length === 0 && <p className="text-sm text-gray-500 p-4">세션이 없습니다.</p>}
                    {sessions.map((s)=> (
                        <button key={s.id||s} onClick={()=>{onSelect?.(s); onClose?.();}} className="w-full text-left p-3 rounded-lg border hover:bg-gray-50">
                            <div className="text-sm font-medium truncate">{s.title || s.firstMessage || s.id || s}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{s.updatedAt ? new Date(s.updatedAt).toLocaleString() : ''}</div>
                        </button>
                    ))}
                </div>
            </aside>
        </div>
    );
}