export default function TopHeader({ title = "여행 지역 선택", onBack, step = 1 }) {
    // step: 1,2,3 → 진행률 계산
    const percent = Math.min(100, Math.max(0, (step / 3) * 100));

    return (
        <div className="sticky top-0 z-10 bg-white">
            <div className="h-12 flex items-center justify-between px-3">
                <button
                    type="button"
                    onClick={onBack}
                    className={`text-gray-700 ${onBack ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    aria-label="뒤로"
                >
                    ←
                </button>
                <h1 className="text-base font-semibold">{title}</h1>
                <span className="w-4" />
            </div>

            {/* 진행바: 회색 트랙 + 초록 채움 */}
            <div className="h-[3px] w-full bg-gray-200">
                <div
                    className="h-full bg-[#01D281] transition-[width] duration-300 ease-out"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}