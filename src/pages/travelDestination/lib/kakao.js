let kakaoLoadingPromise;

/** Kakao JS SDK 로드 후 kakao 객체 반환 (중복 로드 방지) */
export function loadKakaoSDK() {
    if (typeof window === "undefined") return Promise.reject("SSR");

    if (window.kakao && window.kakao.maps) return Promise.resolve(window.kakao);
    if (kakaoLoadingPromise) return kakaoLoadingPromise;

    kakaoLoadingPromise = new Promise((resolve, reject) => {
        const APPKEY = import.meta.env.VITE_KAKAO_JS_KEY;
        if (!APPKEY) {
            reject(new Error("VITE_KAKAO_JS_KEY가 설정되어 있지 않습니다."));
            return;
        }

        // 이미 추가된 스크립트가 있으면 재사용
        let script = document.querySelector('script[data-kakao-sdk="true"]');

        const onLoaded = () => {
            if (!window.kakao || !window.kakao.maps) {
                reject(new Error("카카오 SDK 로드 실패: maps 미탑재"));
                return;
            }
            window.kakao.maps.load(() => resolve(window.kakao)); // autoload=false
        };

        if (!script) {
            script = document.createElement("script");
            script.setAttribute("data-kakao-sdk", "true");
            script.async = true;
            script.src =
                `https://dapi.kakao.com/v2/maps/sdk.js` +
                `?appkey=${APPKEY}&autoload=false&libraries=services`;
            script.onload = onLoaded;
            script.onerror = () => reject(new Error("카카오 SDK 스크립트 로드 실패"));
            document.head.appendChild(script);
        } else {
            // 이미 붙어있으면 로드 완료 시점만 보장
            script.addEventListener("load", onLoaded, { once: true });
            // 혹시 이미 로드가 끝난 상태라면 바로 시도
            if (script.readyState === "complete") onLoaded();
        }
    });

    return kakaoLoadingPromise;
}

/** 키워드/주소로 중심 좌표 찾기 (키워드 실패 시 주소 검색) */
export function getCenterByName(keyword) {
    return loadKakaoSDK().then(
        (kakao) =>
            new Promise((resolve, reject) => {
                const places = new kakao.maps.services.Places();
                const geocoder = new kakao.maps.services.Geocoder();

                // 1) 키워드 검색
                places.keywordSearch(keyword, (data, status) => {
                    if (status === kakao.maps.services.Status.OK && data.length > 0) {
                        const d = data[0];
                        resolve({
                            lat: parseFloat(d.y),
                            lng: parseFloat(d.x),
                            name: d.place_name,
                        });
                        return;
                    }
                    // 2) 주소 검색
                    geocoder.addressSearch(keyword, (res, status2) => {
                        if (status2 === kakao.maps.services.Status.OK && res.length > 0) {
                            const r = res[0];
                            resolve({
                                lat: parseFloat(r.y),
                                lng: parseFloat(r.x),
                                name:
                                    r.road_address?.address_name ||
                                    r.address?.address_name ||
                                    keyword,
                            });
                        } else {
                            reject(new Error("좌표를 찾지 못했습니다."));
                        }
                    });
                });
            })
    );
}