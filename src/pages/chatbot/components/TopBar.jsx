import { useNavigate } from "react-router-dom";

export function TopBar({ onBack, onOpenMenu }) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate("/main");
        }
    };

    return (
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100">
            <div className="relative h-12 flex items-center px-3">
                {/* Back */}
                <button
                    onClick={handleBack}
                    className="absolute left-2 p-2 rounded-full hover:bg-gray-100 active:scale-95"
                    aria-label="뒤로"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                </button>

                {/* Title */}
                <h1 className="mx-auto text-sm font-semibold text-gray-900">여행도우미 토박이</h1>

                {/* History / menu */}
                <button
                    onClick={onOpenMenu}
                    className="absolute right-2 p-2 rounded-full hover:bg-gray-100"
                    aria-label="히스토리"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-7.5 6h12m-9 6h6"/>
                    </svg>
                </button>
            </div>
        </header>
    );
}