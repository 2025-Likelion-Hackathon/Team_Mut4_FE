import React from "react";
import { useNavigate } from "react-router-dom";

/** order=1의 이름(없으면 가장 앞 일정)으로 "xxx에서 출발" 타이틀 생성 */
function makeDepartureTitle(dayObj) {
    const list = Array.isArray(dayObj?.schedule) ? dayObj.schedule : [];
    if (list.length === 0) return `${dayObj?.day ?? ""}일차 일정`;

    const num = (v) => (typeof v === "number" ? v : Number(v));
    const first =
        list.find((s) => num(s.order) === 1) ||
        [...list].sort(
            (a, b) =>
                num(a.order ?? Number.POSITIVE_INFINITY) -
                num(b.order ?? Number.POSITIVE_INFINITY)
        )[0];

    return first?.name ? `${first.name}에서 출발` : `${dayObj?.day ?? ""}일차 일정`;
}

/** grade 배지 */
function GradeBadge({ grade }) {
    const isPending = !grade || String(grade).toUpperCase() === "N/A";
    const label = isPending ? "인증 대기중" : `인증 등급 ${grade}`;

    const cls = isPending
        ? "bg-gray-100 text-gray-600 border-gray-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200";

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold ${cls}`}
        >
      {label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
            d="M10 6L16 12L10 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
    </span>
    );
}

/** 일정 카드 + 지도 CTA (채팅 말풍선 아래 붙는 UI) */
export function ScheduleCards({ content }) {
    const navigate = useNavigate();

    const goMap = () => {
        navigate("/chatbot/map", { state: { content } }); // 전체 일정 전달
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
                            className="min-w-[250px] shrink-0 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
                        >
                            {/* 상단 타이틀 라인 */}
                            <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-full border border-emerald-200 bg-[#01D281] px-3 text-xs font-semibold text-white">
                  {d.day}일차
                </span>

                                <span className="max-w-[150px] truncate text-sm font-semibold text-emerald-700">
                  {makeDepartureTitle(d)}
                </span>
                            </div>

                            {/* 일정 목록 */}
                            <ol className="space-y-2 text-sm">
                                {(d.schedule || []).map((s, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                                        <div className="flex-1 font-medium text-gray-900">
                                            {s.name}
                                        </div>

                                        {"grade" in s && <GradeBadge grade={s.grade} />}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>

            {/* 지도 CTA (말풍선 아래 바로 표시) */}
            <div className="rounded-2xl border bg-white px-4 py-3">
                <div className="text-sm">
                    토박이가 이동 경로와 일정을 정리했어요.
                    <br />
                    지금 확인해 볼까요?
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