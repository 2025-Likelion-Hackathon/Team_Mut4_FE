import { useRef, useState } from "react";
import { GUGUN_BY_SIDO } from "@/pages/travelDestination/constants/krRegions";
import KakaoSearchMap from "./components/KakaoSearchMap";

export default function GugunStep({ sido, onBack, onComplete }) {
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
        <div className="space-y-4">
            <button className="text-sm text-gray-600" onClick={onBack}>← 뒤로</button>

            <h2 className="font-bold text-lg">
                2. {sido.label}의 <span className="text-blue-600">지역(구/시/군)</span>을 선택하세요
            </h2>

            <KakaoSearchMap ref={mapRef} defaultKeyword={sido.label} height={360} />

            <div className="max-h-44 overflow-y-auto no-scrollbar pr-1">
                <div className="grid grid-cols-3 gap-2">
                    {list.map((name) => (
                        <button
                            key={name}
                            onClick={() => handlePick(name)}
                            className={`px-3 py-2 rounded border text-sm ${
                                picked === name ? "bg-blue-600 text-white" : "bg-white"
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bottom-0 bg-white pt-2">
                <button
                    disabled={!picked}
                    onClick={() => onComplete(picked)}
                    className=" w-full py-3 rounded bg-blue-600 text-white disabled:opacity-40"
                >
                    {picked ? "선택 완료" : "선택 완료"}
                </button>
            </div>
        </div>
    );
}