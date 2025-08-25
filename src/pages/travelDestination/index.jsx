import { useState } from "react";
import SidoStep from "./SidoStep";
import GugunStep from "./GugunStep";
import { Link } from "react-router-dom";
import TopHeader from "./components/TopHeader";

import { useLocationStore } from "@/stores/uselocationStore";
import { getCenterByName } from "./lib/kakao";
import postCurrentLocation from "@/api/CurrentLocation";

export default function TravelDestination() {
  const [step, setStep] = useState(1);
  const [sido, setSido] = useState(null);       // 확정된 시/도
  const [sidoPick, setSidoPick] = useState(null); // 1단계 선택만
  const [saving, setSaving] = useState(false);

  const { setAddress, setUserType, setLocationId, setCityName } = useLocationStore();

  async function handleComplete(guName) {
    if (!sido || saving) return;
    const full = `${sido.label} ${guName}`;

    try {
      setSaving(true);
      const { lat, lng } = await getCenterByName(full);
      const result = await postCurrentLocation(lat, lng);
      if (!result?.success) throw new Error(result?.error || "postCurrentLocation failed");

      const data = result.data || {};
      const locationId = data.locationId ?? data.id ?? data?.location?.id ?? null;
      if (locationId != null) setLocationId(locationId);

      setAddress(full);
      setCityName(sido.label);
      setStep(3);
    } catch (e) {
      console.error("여행지 저장 실패:", e);
      setAddress(full);
      setCityName(sido.label);
      setStep(3);
    } finally {
      setSaving(false);
    }
  }

  return (
      <div className="min-h-[100svh] bg-gray-50">
        <TopHeader
            title="여행 지역 선택"
            onBack={step === 1 ? undefined : () => setStep(step - 1)}
            step={step}     // ✅ 진행률 표시용
        />

        {/* 중앙 카드형 컨테이너 (모바일 중심) */}
        <div className="mx-auto max-w-md px-4 pt-4 pb-28">
          {step === 1 && (
              <>
                <SidoStep
                    value={sidoPick}
                    onChange={(s) => setSidoPick(s)}
                />
                {/* 하단 고정 확인 버튼 */}
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white/95 backdrop-blur border-t p-3">
                  <button
                      disabled={!sidoPick}
                      onClick={() => {
                        setSido(sidoPick);
                        setStep(2);
                      }}
                      className="w-full h-12 rounded-xl font-semibold text-white disabled:opacity-40"
                      style={{ backgroundColor: "#01D281" }}
                  >
                    확인
                  </button>
                </div>
              </>
          )}

          {step === 2 && sido && (
              <>
                <GugunStep
                    sido={sido}
                    onBack={() => setStep(1)}
                    onComplete={handleComplete}
                    saving={saving}
                />
                {/* 선택 완료 버튼은 GugunStep 내부에서 렌더(하단 고정) */}
              </>
          )}

          {step === 3 && (
              <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8">
                <div className="w-20 h-20 rounded-full bg-[#C2FFE7] flex items-center justify-center">
                  <span className="text-[#01D281] text-2xl">✓</span>
                </div>
                <h2 className="text-2xl font-semibold">여행 준비 완료!</h2>
              </div>
          )}
        </div>

        {/* 완료 화면 하단 고정 버튼 */}
        {step === 3 && (
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white/95 backdrop-blur border-t p-3">
              <Link
                  to="/main"
                  onClick={() => setUserType("tourist")}
                  className="w-full h-12 rounded-xl font-semibold text-white flex items-center justify-center"
                  style={{ backgroundColor: "#01D281" }}
              >
                확인
              </Link>
            </div>
        )}
      </div>
  );
}