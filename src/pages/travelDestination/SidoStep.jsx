import { SIDO_LIST } from "@/pages/travelDestination/constants/krRegions";

export default function SidoStep({ onPick }) {
    return (
        <div className="space-y-4">
            <h2 className="font-bold text-lg">1. 방문하고 싶은 <span className="text-blue-600">여행지(시/도)</span>를 선택해주세요</h2>
            <div className="grid grid-cols-2 gap-2">
                {SIDO_LIST.map((s) => (
                    <button
                        key={s.key}
                        onClick={() => onPick(s)}
                        className="rounded-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-sm"
                    >
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}