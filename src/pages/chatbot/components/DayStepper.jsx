// src/pages/chatbot/components/DayStepper.jsx
import React from "react";

/**
 * 일정 일차 이동 스텝퍼 (하단 오버레이)
 * props:
 *  - total: 전체 일수 (number)
 *  - index: 현재 인덱스(0-base)
 *  - onChange: (nextIndex:number)=>void
 *  - className: 외부 wrapper에 줄 추가 클래스 (선택)
 */
export default function DayStepper({ total = 0, index = 0, onChange, className = "" }) {
    if (total <= 1) return null;

    const prev = () => onChange?.(Math.max(0, index - 1));
    const next = () => onChange?.(Math.min(total - 1, index + 1));

    const disabledPrev = index <= 0;
    const disabledNext = index >= total - 1;

    return (
        <div
            className={`pointer-events-auto w-full max-w-[420px] mx-auto rounded-2xl bg-white/95 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 ${className}`}
            role="group"
            aria-label="일차 이동"
        >
            {/* 그립 핸들 */}
            <div className="flex justify-center pt-3">
                <div className="w-28 h-1.5 rounded-full bg-neutral-300" />
            </div>

            <div className="px-4 py-3 flex items-center justify-center gap-5">
                {/* 이전 */}
                <button
                    type="button"
                    onClick={prev}
                    disabled={disabledPrev}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition active:scale-95
            ${disabledPrev ? "text-emerald-300 border-emerald-100 cursor-not-allowed" : "text-emerald-600 border-emerald-300 hover:bg-emerald-50"}`}
                    aria-label="이전 일차"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M14 6L8 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* 현재 일차 */}
                <div className="min-w-[72px] text-center text-[17px] font-semibold text-gray-900">
                    {index + 1}일차
                </div>

                {/* 다음 */}
                <button
                    type="button"
                    onClick={next}
                    disabled={disabledNext}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition active:scale-95
            ${disabledNext ? "text-emerald-300 border-emerald-100 cursor-not-allowed" : "text-white bg-emerald-500 border-emerald-500 hover:bg-emerald-600"}`}
                    aria-label="다음 일차"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M10 6L16 12L10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}