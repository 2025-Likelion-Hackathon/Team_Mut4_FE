export default function QuickReplies({ items = [], onPick }){
    return (
        <div className="mt-2 flex flex-wrap gap-2">
            {items.map((label, i)=> (
                <button key={i} onClick={()=>onPick?.(label)} className="px-3 py-1 text-sm rounded-full border border-gray-200 bg-white hover:bg-gray-50 active:scale-95">{label}</button>
            ))}
        </div>
    );
}
