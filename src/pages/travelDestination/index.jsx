// src/pages/travelDestination/index.jsx
import { useState } from "react";
import SidoStep from "./SidoStep";
import GugunStep from "./GugunStep";
import { Link } from "react-router-dom";

import { useLocationStore } from "@/stores/uselocationStore";
import { getCenterByName } from "./lib/kakao";

import postCurrentLocation from "@/api/CurrentLocation";


export default function TravelDestination() {
  const [step, setStep] = useState(1);
  const [sido, setSido] = useState(null);
  const [saving, setSaving] = useState(false);

  const { setAddress, setUserType, setLocationId, setCityName } =
      useLocationStore();

  async function handleComplete(guName) {
    if (!sido || saving) return;

    const full = `${sido.label} ${guName}`; // 예: "부산광역시 서구"
    try {
      setSaving(true);

      const { lat, lng } = await getCenterByName(full);

      const result = await postCurrentLocation(lat, lng);

      if (!result?.success) {
        throw new Error(result?.error || "postCurrentLocation failed");
      }

      const data = result.data || {};

      const locationId =
          data.locationId ?? data.id ?? data?.location?.id ?? null;

      if (locationId != null) setLocationId(locationId);

      setAddress(full);        // "시 구" 저장 (스토어에서 가공됨)
      setCityName(sido.label); // 시/광역시만 저장

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
      <div className="p-4 space-y-4">
        {step === 1 && (
            <SidoStep
                onPick={(s) => {
                  setSido(s);
                  setStep(2);
                }}
            />
        )}

        {step === 2 && sido && (
            <GugunStep
                sido={sido}
                onBack={() => setStep(1)}
                onComplete={handleComplete}
                saving={saving}
            />
        )}

        {step === 3 && (
            <div className="min-h-[100svh] flex flex-col pb-28 px-4">
              <div className="flex-1 flex flex-col items-center justify-center gap-8">
                <div className="w-28 h-28 rounded-full bg-gray-200" />
                <h2 className="text-2xl font-semibold">여행 준비 완료!</h2>
              </div>

              <Link
                  to="/main"
                  onClick={() => setUserType("tourist")}
                  className="w-full h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center"
              >
                확인
              </Link>
            </div>
        )}
      </div>
  );
}