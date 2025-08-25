// src/pages/chatbot/components/MapView.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadKakaoSDK, getCenterByName } from "../../travelDestination/lib/kakao";

import pin from '../assets/pin.svg';


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

/* ---------- 공통: 원형 버튼 ---------- */
function RoundBtn({ kind = "outline", disabled, onClick, label = "‹" }) {
    // kind: 'outline' | 'solid'
    const base =
        "size-8 aspect-square rounded-full grid place-items-center text-[20px] border shrink-0 p-0";
    if (kind === "outline") {
        return (
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={`${base} ${
                    disabled
                        ? "border border-[#01D281] text-[#01D281] cursor-not-allowed bg-white"
                        : "border border-[#01D281] text-[#01D281] hover:bg-emerald-50"
                }`}
                aria-label="prev"
            >
                <div className="-translate-y-[1px]">{label}</div>
            </button>
        );
    }
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${
                disabled
                    ? "bg-[#01D281] text-white cursor-not-allowed"
                    : "bg-[#01D281] text-white hover:brightness-95"
            }`}
            aria-label="next"
        >
            <div className="-translate-y-[1px]">{label}</div>
        </button>
    );
}

/* ---------- 상세 시트(설명) ---------- */
function DetailSheet({
                         day,
                         selectedIdx,
                         daysLen,
                         onPrev,
                         onNext,
                         onClose,
                     }) {
    const [openIdx, setOpenIdx] = React.useState(null);

    return (
        <div className="fixed inset-x-0 bottom-0 z-30">
            <div className="mx-auto w-full max-w-[420px] px-4 pb-[env(safe-area-inset-bottom,0px)]">
                <div className="rounded-2xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.18)] border border-gray-200 overflow-hidden">
                    {/* 핸들 (탭하면 닫힘) */}
                    <button
                        onClick={onClose}
                        className="w-full grid place-items-center pt-3 pb-1"
                        aria-label="닫기"
                    >
                        <span className="block w-24 h-[6px] rounded-full bg-neutral-800" />
                    </button>

                    {/* 가운데 스텝퍼 */}
                    <div className="px-5 pb-2 flex items-center justify-center gap-3">
                        <RoundBtn kind="outline" label="‹" onClick={onPrev} disabled={selectedIdx===0}/>
                        <div className="min-w-[72px] text-center text-[18px] font-extrabold text-gray-900">
                            {day.day}일차
                        </div>
                        <RoundBtn kind="solid" label="›" onClick={onNext} disabled={selectedIdx===daysLen-1}/>
                    </div>
                    {/* 리스트 */}
                    <div className="max-h-[72svh] overflow-y-auto p-3 space-y-8">
                        {(day.schedule || []).map((s, i) => {
                            const isOpen = openIdx === i;
                            const isLast = i === (day.schedule?.length ?? 0) - 1;

                            return (
                                <div key={i} className="relative pl-10">
                                    {/* 왼쪽 핀 */}
                                    <img
                                        src={pin}
                                        alt="핀"
                                        className="absolute left-0 top-1 w-6 h-6"
                                    />

                                    {/* 핀 사이 점선(마지막은 숨김) */}
                                    {!isLast && (
                                        <div className="pointer-events-none absolute left-[12px] top-8 bottom-[-18px] border-l border-dashed border-gray-200" />
                                    )}


                                    {/* 본문 카드 */}
                                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="text-[18px] font-semibold leading-6 text-[#01D281]">
                                                    {s.name}
                                                </div>
                                            </div>

                                            {/* 설명 토글 버튼 (작은 초록 원형) */}
                                            <button
                                                onClick={() => setOpenIdx(isOpen ? null : i)}
                                                className="size-8 aspect-square rounded-full grid bg-[#01D281] text-white place-items-center text-[20px] border shrink-0 p-0"
                                                aria-label="toggle"
                                            ><span className={`inline-block transition-transform ${isOpen ? "" : "rotate-180"}`}>^</span>
                                            </button>
                                        </div>

                                        {/* 설명 영역 */}
                                        {isOpen && (
                                            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-[13px] leading-5 text-gray-700">
                                                {s.description || "설명이 없어요. 여정을 즐겨보세요!"}
                                            </div>
                                        )}

                                        {/* 하단 메타 정보 (데이터 기반) */}
                                        <div className="mt-2 text-[12px] text-gray-500">
                                            {s.type}
                                            {s.type && s.address ? " · " : ""}
                                            {s.address}
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
    const nextDay = () => setSelectedIdx((i) => Math.min(days.length - 1, i + 1));

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
                        <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-900">
                        {location.state?.tripTitle || "여행도우미 토박이"}
                    </h1>
                </div>
            </header>

            {/* 지도(하단 스텝퍼 위까지 크게) */}
            <div className="relative">
                <div
                    ref={mapRef}
                    className="w-full bg-gray-100"
                    style={{ height: "calc(100svh - 182px)" }} // 헤더(48) + 스텝퍼(약 120~130) 고려
                />
            </div>

            {/* 하단 고정 Day Stepper */}
            <div className="fixed inset-x-0 bottom-0 z-20">
                <div className="w-full max-w-[420px] mx-auto px-4 pb-[env(safe-area-inset-bottom,0px)]">
                    <div className="pointer-events-auto rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                        {/* 검은 핸들: 탭하면 상세 열기 */}
                        <button
                            onClick={() => setShowDetail(true)}
                            className="w-full grid place-items-center pt-3"
                            aria-label="상세 보기"
                        >
                            <span className="block w-24 h-[6px] rounded-full bg-neutral-800" />
                        </button>

                        <div className="px-5 py-3 flex items-center justify-center gap-3">
                            <RoundBtn kind="outline" label="‹" onClick={prevDay} disabled={selectedIdx===0} />
                            <div className="min-w-[72px] text-center text-[18px] font-extrabold text-gray-900">
                                {currentDayLabel}일차
                            </div>
                            <RoundBtn kind="solid" label="›" onClick={nextDay} disabled={selectedIdx===days.length-1} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 상세 시트 */}
            {showDetail && day && (
                <DetailSheet
                    day={day}
                    selectedIdx={selectedIdx}
                    daysLen={days.length}
                    onPrev={prevDay}
                    onNext={nextDay}
                    onClose={() => setShowDetail(false)}
                />
            )}
        </div>
    );
}