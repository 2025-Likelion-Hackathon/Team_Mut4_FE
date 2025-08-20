import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { loadKakaoSDK } from "@/pages/travelDestination/lib/kakao";

const KakaoSearchMap = forwardRef(function KakaoSearchMap(
    { defaultKeyword = "서울특별시", maxMarkers = 10, height = 360 },
    ref
) {
    const mapRef = useRef(null);
    const mapDivRef = useRef(null);
    const placesRef = useRef(null);

    useEffect(() => {
        let destroyed = false;

        loadKakaoSDK().then((kakao) => {
            if (destroyed || !mapDivRef.current) return;

            const map = new kakao.maps.Map(mapDivRef.current, {
                center: new kakao.maps.LatLng(37.5665, 126.9780),
                level: 7,
            });
            mapRef.current = map;
            placesRef.current = new kakao.maps.services.Places();

            doSearch(defaultKeyword);
        });

        return () => {
            destroyed = true;
            mapRef.current = null;
            placesRef.current = null;
        };
    }, []);

    function doSearch(q) {
        const kakao = window.kakao;
        if (!q || !placesRef.current || !mapRef.current) return;

        placesRef.current.keywordSearch(q, (data, status) => {
            if (status !== kakao.maps.services.Status.OK || data.length === 0) {
                return;
            }

            const bounds = new kakao.maps.LatLngBounds();
            data.slice(0, maxMarkers).forEach((d) => {
                const pos = new kakao.maps.LatLng(parseFloat(d.y), parseFloat(d.x));
                bounds.extend(pos);
            });

            if (bounds.getSouthWest().equals(bounds.getNorthEast())) {
                mapRef.current.setCenter(bounds.getSouthWest());
                mapRef.current.setLevel(5);
            } else {
                mapRef.current.setBounds(bounds);
            }
        });
    }

    useImperativeHandle(ref, () => ({
        search: (q) => doSearch(q),
        getMap: () => mapRef.current,
    }));

    return (
        <div className="space-y-3">
            <div
                ref={mapDivRef}
                style={{ height }}
                className="w-full rounded border"
            />
        </div>
    );
});

export default KakaoSearchMap;