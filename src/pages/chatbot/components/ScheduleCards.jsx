export function ScheduleCards({ content }){
    if (!Array.isArray(content)) return null;
    return (
        <div className="mt-2 space-y-3">
            {content.map((d, idx)=> (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="font-medium text-gray-900 mb-2">{d.day}일차 일정</div>
                    <ol className="space-y-2 text-sm">
                        {(d.schedule||[]).map((s,i)=> (
                            <li key={i} className="flex items-start gap-2">
                                <span className="shrink-0 w-6 h-6 grid place-items-center rounded-full bg-blue-50 text-blue-600 text-xs border border-blue-100">{s.order}</span>
                                <div>
                                    <div className="font-medium text-gray-900">{s.name}</div>
                                    <div className="text-gray-500">{s.type}</div>
                                    {s.address && <div className="text-gray-500">{s.address}</div>}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </div>
    );
}