import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const LocationContainer = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  margin: 1rem 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const MapDiv = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
`;

const LocationSection = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const mapContainer = mapContainerRef.current;
        if (!mapContainer) return;

        const mapOption = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 2, 
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);
      });
    }
  }, [latitude, longitude]);

  return (
    <LocationContainer>
      <SectionTitle>위치</SectionTitle>
      <MapDiv ref={mapContainerRef} />
    </LocationContainer>
  );
};

export default LocationSection;