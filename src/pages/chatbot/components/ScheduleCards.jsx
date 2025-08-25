import React from "react";
import { useNavigate } from "react-router-dom";

/** 일정 카드 + 지도 CTA (채팅 말풍선 아래 붙는 UI) */
export function ScheduleCards({ content }) {
    const navigate = useNavigate();

    const goMap = () => {
        navigate("/chatbot/map", { state: { content } }); // ← 전체 일정 전달
    };

    if (!Array.isArray(content)) return null;

    return (
        <div className="mt-3 space-y-3">
            {/* 가로 스크롤 카드 */}
            <div className="-mx-2 overflow-x-auto pb-2">
                <div className="flex gap-3 px-2">
                    {content.map((d, idx) => (
                        <div
                            key={idx}
                            className="min-w-[320px] shrink-0 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
                        >
                            {/* 상단 타이틀 라인 */}
                            <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-full border border-emerald-200 bg-[#01D281] px-3 text-xs font-semibold text-white">
                  {d.day}일차
                </span>
                                {d.title && (
                                    <span className="text-sm font-semibold text-emerald-700">
                    {d.title}
                  </span>
                                )}
                            </div>

                            {/* 일정 목록 */}
                            <ol className="space-y-2 text-sm">
                                {(d.schedule || []).map((s, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="grid h-1.5 w-1.5 shrink-0 place-items-center rounded-full border  bg-gray-200">
                                        </span>
                                        <div>
                                            <div className="font-medium">{s.name}</div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>

            {/* 지도 CTA (말풍선 아래 바로 표시) */}
            <div className="rounded-2xl border border-[#01D281]/25 bg-white px-4 py-3">
                <div className="text-sm">
                    토박이가 이동 경로와 일정을 정리했어요. 지금 확인해 볼까요?
                </div>
                <div className="mt-3">
                    <button
                        onClick={goMap}
                        className="w-full rounded-xl bg-[#01D281] py-3 font-semibold text-white active:translate-y-[1px]"
                    >
                        지도 보러가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ScheduleCards;