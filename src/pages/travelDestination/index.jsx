import { useState } from "react";
import SidoStep from "./SidoStep";
import GugunStep from "./GugunStep";
import { Link } from "react-router-dom";
import { useLocationStore } from "@/stores/uselocationStore";
import { getCenterByName } from "@/pages/travelDestination/lib/kakao";

export default function TravelDestination() {
    const [step, setStep] = useState(1);
    const [sido, setSido] = useState(null);
    const { setAddress, setUserType } = useLocationStore();

    async function handleComplete(guName) {
        const full = `${sido.label} ${guName}`;
        try {
            const c = await getCenterByName(full);
        } catch (e) {
        }
        setAddress(full);
        setStep(3);
    }

    return (
        <div className="p-4 space-y-4">
            {step === 1 && (
                <>
                    <SidoStep
                        onPick={(s) => {
                            setSido(s);
                            setStep(2);
                        }}
                    />
                </>
            )}

            {step === 2 && sido && (
                <GugunStep
                    sido={sido}
                    onBack={() => setStep(1)}
                    onComplete={handleComplete}
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