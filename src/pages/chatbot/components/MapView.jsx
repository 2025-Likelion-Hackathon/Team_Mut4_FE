// src/pages/chatbot/components/MapView.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadKakaoSDK, getCenterByName } from "../../travelDestination/lib/kakao";

/* ---------- utils ---------- */
const toNum = (v) => (typeof v === "number" ? v : Number(v));

/** 스케줄 아이템 -> {lat,lng,title,raw} (좌표 없으면 지오코딩) */
async function normalizePointsForDay(day) {
    const tasks = (day?.schedule || []).map(async (s) => {
        let lat = toNum(s.latitude);
        let lng = toNum(s.longitude);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            const keyword = s.address?.trim() || s.name?.trim();
            if (keyword) {
                try {
                    const c = await getCenterByName(keyword);
                    lat = c.lat;
                    lng = c.lng;
                } catch {
                    /* ignore geocoding error */
                }
            }
        }
        return { lat, lng, title: s.name || "", raw: s };
    });

    const pts = await Promise.all(tasks);
    return pts.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
}

/* ---------- 상세 시트(설명) ---------- */
function DetailSheet({ day, onClose }) {
    const [openIdx, setOpenIdx] = React.useState(null);

    return (
        <div className="fixed inset-x-0 bottom-0 z-30">
            <div className="mx-auto w-full max-w-[420px] px-4 pb-[env(safe-area-inset-bottom,0px)]">
                <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between border-b">
                        <div className="text-sm font-semibold text-gray-900">
                            {day.day}일차
                        </div>
                        <button
                            onClick={onClose}
                            className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
                        >
                            닫기
                        </button>
                    </div>

                    <div className="max-h-[72svh] overflow-y-auto p-3 space-y-3">
                        {(day.schedule || []).map((s, i) => {
                            const isOpen = openIdx === i;
                            return (
                                <div
                                    key={i}
                                    className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3"
                                >
                                    <div className="flex items-start gap-2">
                                        <div className="shrink-0 w-6 h-6 grid place-items-center rounded-full bg-emerald-100 text-emerald-600 text-xs border border-emerald-200">
                                            {s.order ?? i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm font-semibold text-emerald-700">
                                                    {s.name}
                                                </div>
                                                <button
                                                    onClick={() => setOpenIdx(isOpen ? null : i)}
                                                    className="p-1.5 rounded-md hover:bg-emerald-100"
                                                    aria-label="toggle"
                                                >
                                                    <svg
                                                        className={`w-4 h-4 text-emerald-700 transition-transform ${
                                                            isOpen ? "rotate-180" : ""
                                                        }`}
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                {s.type}
                                                {s.type && s.address ? " · " : ""}
                                                {s.address}
                                            </div>
                                            {isOpen && s.description && (
                                                <div className="mt-2 text-[13px] leading-5 text-gray-700 bg-white border border-emerald-100 rounded-lg p-3">
                                                    {s.description}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- 페이지 ---------- */
export default function MapView() {
    const nav = useNavigate();
    const location = useLocation();

    // 채팅에서 온 content 유지/복원
    const initial = React.useMemo(() => {
        const passed = location.state?.content;
        if (Array.isArray(passed)) {
            sessionStorage.setItem("chatbot.map.content", JSON.stringify(passed));
            return passed;
        }
        try {
            const saved = JSON.parse(
                sessionStorage.getItem("chatbot.map.content") || "null"
            );
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    }, [location.state]);

    const [content] = React.useState(initial);
    const [selectedIdx, setSelectedIdx] = React.useState(0);
    const [showDetail, setShowDetail] = React.useState(false);

    const mapRef = React.useRef(null);
    const mapObjRef = React.useRef(null);
    const lineRef = React.useRef(null);
    const markersRef = React.useRef([]);

    const days = Array.isArray(content) ? content : [];
    const day = days[selectedIdx];

    /* ----- 지도 준비 & 최초 렌더 ----- */
    React.useEffect(() => {
        let canceled = false;
        (async () => {
            const kakao = await loadKakaoSDK();
            if (canceled) return;

            // 초기 중심: 한국 전체 대략
            const center = new kakao.maps.LatLng(36.5, 127.8);
            const map = new kakao.maps.Map(mapRef.current, {
                center,
                level: 12,
            });
            mapObjRef.current = map;

            await drawSelectedDay();
        })();

        return () => {
            canceled = true;
            clearMap();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 일차 바뀌면 재그리기
    React.useEffect(() => {
        drawSelectedDay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIdx, content]);

    /* ----- 지도 유틸 ----- */
    function clearMap() {
        const map = mapObjRef.current;
        if (!map) return;
        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];
        if (lineRef.current) {
            lineRef.current.setMap(null);
            lineRef.current = null;
        }
    }

    async function drawSelectedDay() {
        const map = mapObjRef.current;
        if (!map || !day) return;
        const kakao = window.kakao;

        clearMap();

        const points = await normalizePointsForDay(day);
        if (points.length === 0) return;

        // 마커 + 경계
        const bounds = new kakao.maps.LatLngBounds();
        points.forEach((p, idx) => {
            const ll = new kakao.maps.LatLng(p.lat, p.lng);
            bounds.extend(ll);

            const marker = new kakao.maps.Marker({ position: ll });
            marker.setMap(map);
            markersRef.current.push(marker);

            const info = new kakao.maps.InfoWindow({
                content: `
          <div style="padding:6px 10px;font-size:12px;">
            <b style="color:#01D281">${idx + 1}. ${p.title || ""}</b><br/>
            <span style="color:#6b7280">${p.raw?.type || ""}</span>
          </div>
        `,
            });
            kakao.maps.event.addListener(marker, "click", () => info.open(map, marker));
        });

        // 경로
        const path = points.map((p) => new kakao.maps.LatLng(p.lat, p.lng));
        const polyline = new kakao.maps.Polyline({
            path,
            strokeWeight: 6,
            strokeColor: "#01D281",
            strokeOpacity: 0.95,
            strokeStyle: "solid",
        });
        polyline.setMap(map);
        lineRef.current = polyline;

        // 보기 좋은 범위
        map.setBounds(bounds);
    }

    /* ----- 네비 핸들러 ----- */
    const prevDay = () => setSelectedIdx((i) => Math.max(0, i - 1));
    const nextDay = () =>
        setSelectedIdx((i) => Math.min(days.length - 1, i + 1));

    const currentDayLabel =
        days[selectedIdx]?.day ?? (Number.isFinite(selectedIdx) ? selectedIdx + 1 : 1);

    /* ----- 렌더 ----- */
    return (
        <div className="relative min-h-svh bg-white">
            {/* 헤더 */}
            <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100">
                <div className="relative h-12 flex items-center px-3 max-w-[420px] mx-auto">
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 active:scale-95"
                        aria-label="뒤로"
                        onClick={() => nav(-1)}
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-900">
                        {location.state?.tripTitle || "여행도우미 토박이"}
                    </h1>
                </div>
            </header>

            {/* 지도 */}
            <div className="relative">
                <div ref={mapRef} className="w-full h-[min(65svh,520px)] bg-gray-100" />
                {/* 지도 바로 아래 겹치는 느낌을 주기 위해 살짝 끌어올림 */}
                <div className="-mt-6" />
            </div>

            {/* Day Stepper (디자인 시안 스타일) */}
            <div className="w-full max-w-[420px] mx-auto px-4">
                <div className="pointer-events-auto rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    {/* 검은 핸들: 탭하면 상세 */}
                    <button
                        onClick={() => setShowDetail(true)}
                        className="w-full grid place-items-center pt-3"
                        aria-label="상세 보기"
                    >
                        <span className="block w-24 h-[6px] rounded-full bg-neutral-800" />
                    </button>

                    <div className="px-5 py-3 flex items-center justify-center gap-6">
                        {/* 이전(연한 초록 테두리의 완전 원형) */}
                        <button
                            type="button"
                            onClick={prevDay}
                            disabled={selectedIdx === 0}
                            className={`w-10 h-10 rounded-full grid place-items-center border text-[18px] leading-none transition active:scale-95
                ${
                                selectedIdx === 0
                                    ? "border-emerald-100 text-emerald-200 cursor-not-allowed bg-white"
                                    : "border-emerald-400 text-emerald-500 hover:bg-emerald-50"
                            }`}
                            aria-label="이전 일차"
                        >
                            {/* div 문자를 사용해 정확한 원형/정렬 */}
                            <div className="translate-y-[-1px]">‹</div>
                        </button>

                        {/* 중앙 레이블 */}
                        <div className="min-w-[72px] text-center text-[18px] font-extrabold text-gray-900">
                            {currentDayLabel}일차
                        </div>

                        {/* 다음(진녹색 가득 찬 완전 원형) */}
                        <button
                            type="button"
                            onClick={nextDay}
                            disabled={selectedIdx === days.length - 1}
                            className={`w-10 h-10 rounded-full grid place-items-center text-[18px] leading-none transition active:scale-95
                ${
                                selectedIdx === days.length - 1
                                    ? "bg-emerald-100 text-white cursor-not-allowed"
                                    : "bg-emerald-500 text-white hover:brightness-95"
                            }`}
                            aria-label="다음 일차"
                        >
                            <div className="translate-y-[-1px]">›</div>
                        </button>
                    </div>
                </div>
            </div>

            {/* 상세 시트 */}
            {showDetail && day && (
                <DetailSheet day={day} onClose={() => setShowDetail(false)} />
            )}
        </div>
    );
}