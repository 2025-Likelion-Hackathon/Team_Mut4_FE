// // src/pages/chatbot/components/DayStepper.jsx
// import React from "react";
//
// export default function DayStepper({
//                                        index = 0,
//                                        total = 1,
//                                        onPrev,
//                                        onNext,
//                                        className = "",
//                                    }) {
//     const disabledPrev = index <= 0;
//     const disabledNext = index >= total - 1;
//
//     const BRAND = "#01D281";
//     const BRAND_LIGHT = "#C2FFE7";
//
//     const prevClick = () => !disabledPrev && onPrev?.();
//     const nextClick = () => !disabledNext && onNext?.();
//
//     return (
//         <div
//             className={`pointer-events-auto w-full max-w-[420px] mx-auto rounded-2xl bg-white/95 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 ${className}`}
//             role="group"
//             aria-label="일차 이동"
//         >
//             {/* 그립 핸들 */}
//             <div className="flex justify-center pt-3">
//                 <div className="w-40 h-1.5 rounded-full bg-neutral-300" />
//             </div>
//
//             <div className="px-5 py-3 flex items-center justify-center gap-5">
//                 {/* 이전: 원형(아웃라인) */}
//                 <button
//                     type="button"
//                     onClick={prevClick}
//                     disabled={disabledPrev}
//                     className="absolute left-2 p-2 rounded-full hover:bg-gray-100 active:scale-95"
//                     aria-label="뒤로"
//                 >
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M14 6L8 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                 </button>
//
//                 {/* 현재 일차 */}
//                 <div className="min-w-[72px] text-center text-[18px] font-extrabold text-neutral-900">
//                     {index + 1}일차
//                 </div>
//
//                 {/* 다음: 원형(필드) */}
//                 <button
//                     type="button"
//                     onClick={nextClick}
//                     disabled={disabledNext}
//                     aria-label="다음 일차"
//                 >
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M10 6L16 12L10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                 </button>
//             </div>
//         </div>
//     );
// }