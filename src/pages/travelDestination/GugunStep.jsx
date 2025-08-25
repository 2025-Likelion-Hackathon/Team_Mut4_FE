// src/pages/travelDestination/GugunStep.jsx
import { useRef, useState } from "react";
import { GUGUN_BY_SIDO } from "@/pages/travelDestination/constants/krRegions";
import KakaoSearchMap from "./components/KakaoSearchMap";

export default function GugunStep({ sido, onBack, onComplete, saving }) {
    if (!sido) return null;

    const list = GUGUN_BY_SIDO[sido.key] || [];
    const [picked, setPicked] = useState(null);
    const mapRef = useRef(null);

    function handlePick(guName) {
        setPicked(guName);
        const keyword = `${sido.label} ${guName}`;
        mapRef.current?.search(keyword);
    }

    return (
        <>
            {/* 상단 텍스트 (내부 뒤로 버튼 없음) */}
            <div className="space-y-1 mb-3">
                <h2 className="font-bold text-lg">
                    2. <span className="text-[#01D281]">지역을 선택</span>해주세요
                </h2>
            </div>

            {/* 지도 */}
            <div className="overflow-hidden rounded-xl border border-gray-200">
                <KakaoSearchMap ref={mapRef} defaultKeyword={sido.label} height={320} />
            </div>

            {/* 브레드크럼: "<시/도 라벨> > 시/군/구 선택" */}
            <p className="text-left text-gray-500 text-sm mt-3">
                {sido.label} <span className="mx-1">{">"}</span> 시/군/구 선택
            </p>

            {/* 구/군 리스트 */}
            <div className="max-h-44 overflow-y-auto no-scrollbar pr-1 mt-3">
                <div className="grid grid-cols-3 gap-2">
                    {list.map((name) => {
                        const selected = picked === name;
                        return (
                            <button
                                key={name}
                                onClick={() => handlePick(name)}
                                className={`px-3 py-2 rounded-lg border text-sm transition
                  ${
                                    selected
                                        ? "bg-[#C2FFE7] border-[#01D281] text-[#01D281]"
                                        : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 하단 고정 버튼 */}
            <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md bg-white/95 backdrop-blur border-t p-3">
                <button
                    disabled={!picked || saving}
                    onClick={() => onComplete(picked)}
                    className="w-full h-12 rounded-xl font-semibold text-white disabled:opacity-40"
                    style={{ backgroundColor: "#01D281" }}
                >
                    선택 완료
                </button>
            </div>
        </>
    );
}