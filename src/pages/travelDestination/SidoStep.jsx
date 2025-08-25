import { SIDO_LIST } from "@/pages/travelDestination/constants/krRegions";

export default function SidoStep({ value, onChange }) {
    return (
        <div className="space-y-4">
            {/* 제목 영역 (시안처럼 볼드 + 초록 포인트) */}
            <div className="space-y-1">
                <p className="text-lg font-bold">1. 방문하고 싶은</p>
                <p className="text-lg">
                    <span className="text-[#01D281] font-semibold">여행지를 선택</span>해주세요
                </p>
            </div>

            {/* 버튼 리스트 (시안형 회색칩 + 선택시 초록라인/연한초록 배경) */}
            <div className="grid grid-cols-2 gap-3">
                {SIDO_LIST.map((s) => {
                    const selected = value?.key === s.key;
                    return (
                        <button
                            key={s.key}
                            onClick={() => onChange(s)}
                            className={`rounded-lg px-4 py-3 text-sm font-medium border transition
                ${selected
                                ? "bg-[#C2FFE7] border-[#01D281] text-[#01D281]"
                                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {s.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}