import React from 'react';
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

const MapPlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 0.9rem;
  border-radius: 8px;
`;

const LocationSection = () => {
  return (
    <LocationContainer>
      <SectionTitle>위치</SectionTitle>
      <MapPlaceholder>(지도)</MapPlaceholder>
    </LocationContainer>
  );
};

export default LocationSection;