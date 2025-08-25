import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadKakaoSDK, getCenterByName } from "../../travelDestination/lib/kakao";

/** 숫자 캐스팅 */
const toNum = (v) => (typeof v === "number" ? v : Number(v));

/** 스케줄 아이템 → {lat,lng,title,raw} (좌표 없으면 지오코딩) */
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
                    /* ignore */
                }
            }
        }

        return {
            lat,
            lng,
            title: s.name || "",
            raw: s,
        };
    });

    const pts = await Promise.all(tasks);
    return pts.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
}

/** 하단 상세 시트 */
function DetailSheet({ day, onClose }) {
    const [openIdx, setOpenIdx] = React.useState(null);

    return (
        <div className="fixed inset-x-0 bottom-0 z-30">
            <div className="mx-auto w-full max-w-[420px] px-4 pb-[env(safe-area-inset-bottom,0px)]">
                <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between border-b">
                        <div className="text-sm font-semibold text-gray-900">{day.day}일차</div>
                        <button
                            onClick={onClose}
                            className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
                        >
                            닫기
                        </button>
                    </div>

                    <div className="max-h-[55svh] overflow-y-auto p-3 space-y-3">
                        {(day.schedule || []).map((s, i) => {
                            const isOpen = openIdx === i;
                            return (
                                <div key={i} className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
                                    <div className="flex items-start gap-2">
                                        <div className="shrink-0 w-6 h-6 grid place-items-center rounded-full bg-emerald-100 text-emerald-600 text-xs border border-emerald-200">
                                            {s.order ?? i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm font-semibold text-emerald-700">{s.name}</div>
                                                <button
                                                    onClick={() => setOpenIdx(isOpen ? null : i)}
                                                    className="p-1.5 rounded-md hover:bg-emerald-100"
                                                    aria-label="toggle"
                                                >
                                                    <svg
                                                        className={`w-4 h-4 text-emerald-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
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

/** 지도 아래 일차 스텝퍼 */
function DayStepper({ days, selectedIdx, onPrev, onNext, onOpenDetail }) {
    if (!days?.length) return null;

    return (
        <div className="w-full max-w-[420px] mx-auto px-4 mt-3">
            <div className="rounded-2xl bg-white border border-gray-200 shadow-md">
                {/* 회색 핸들(탭하면 상세 보기) */}
                <button
                    onClick={onOpenDetail}
                    className="w-full grid place-items-center pt-3"
                    aria-label="상세 보기"
                >
                    <span className="block w-24 h-1.5 rounded-full bg-neutral-300" />
                </button>

                {/* 좌/우 + 일차 */}
                <div className="px-4 pb-3 mt-2 flex items-center justify-center gap-4">
                    <button
                        onClick={onPrev}
                        disabled={selectedIdx === 0}
                        className="w-8 h-8 grid place-items-center rounded-full border border-emerald-300 text-emerald-600 disabled:opacity-40"
                        aria-label="이전 일차"
                    >
                        ‹
                    </button>
                    <div className="text-base font-semibold text-gray-900">
                        {days[selectedIdx]?.day}일차
                    </div>
                    <button
                        onClick={onNext}
                        disabled={selectedIdx === days.length - 1}
                        className="w-8 h-8 grid place-items-center rounded-full bg-emerald-500 text-white disabled:opacity-40"
                        aria-label="다음 일차"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MapView() {
    const nav = useNavigate();
    const location = useLocation();

    /** 채팅에서 전달된 content 보존/복원 */
    const initial = React.useMemo(() => {
        const passed = location.state?.content;
        if (Array.isArray(passed)) {
            sessionStorage.setItem("chatbot.map.content", JSON.stringify(passed));
            return passed;
        }
        try {
            const saved = JSON.parse(sessionStorage.getItem("chatbot.map.content") || "null");
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

    /** 지도 초기화 */
    React.useEffect(() => {
        let canceled = false;

        (async () => {
            const kakao = await loadKakaoSDK();
            if (canceled) return;

            // 초기 중심: 대한민국 전체가 한눈에 들어오도록
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

    /** 일차 바뀔 때마다 재그리기 */
    React.useEffect(() => {
        drawSelectedDay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIdx, content]);

    /** 마커/폴리라인 정리 */
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

    /** 선택 일차 지도 반영 */
    async function drawSelectedDay() {
        const map = mapObjRef.current;
        if (!map || !day) return;

        const kakao = window.kakao;
        clearMap();

        const points = await normalizePointsForDay(day);
        if (points.length === 0) return;

        // 마커 & 경계
        const bounds = new kakao.maps.LatLngBounds();
        points.forEach((p, idx) => {
            const latlng = new kakao.maps.LatLng(p.lat, p.lng);
            bounds.extend(latlng);

            const marker = new kakao.maps.Marker({ position: latlng });
            marker.setMap(map);
            markersRef.current.push(marker);

            const iw = new kakao.maps.InfoWindow({
                content: `
          <div style="padding:6px 10px;font-size:12px;">
            <b style="color:#01D281">${idx + 1}. ${p.title || ""}</b><br/>
            <span style="color:#6b7280">${p.raw?.type || ""}</span>
          </div>
        `,
            });
            kakao.maps.event.addListener(marker, "click", () => iw.open(map, marker));
        });

        // 경로 폴리라인
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

    /** 내비게이션 핸들러 */
    const handlePrev = () => setSelectedIdx((i) => Math.max(0, i - 1));
    const handleNext = () => setSelectedIdx((i) => Math.min(days.length - 1, i + 1));

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
                        <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-900">
                        {location.state?.tripTitle || "여행도우미 토박이"}
                    </h1>
                </div>
            </header>

            {/* 본문 (지도 + 스텝퍼) */}
            <main className="max-w-[420px] mx-auto w-full">
                {/* 지도 */}
                <div ref={mapRef} className="w-full h-[min(65svh,520px)] bg-gray-100" />

                {/* 지도 바로 아래 일차 스텝퍼 */}
                <DayStepper
                    days={days}
                    selectedIdx={selectedIdx}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onOpenDetail={() => setShowDetail(true)}
                />
            </main>

            {/* 상세 시트 */}
            {showDetail && day && (
                <DetailSheet
                    day={day}
                    onClose={() => setShowDetail(false)}
                />
            )}
        </div>
    );
}