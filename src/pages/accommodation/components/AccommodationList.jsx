import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import AccommodationItem from './AccommodationItem';
import FilterDropdown from '../../restaurant/components/FilterDropdown';
import { useLocationStore } from '../../../stores/uselocationStore';
import { useAccommodationListStore } from '../../../stores/useAccommodationListStore';

const ListContainer = styled.div`
  padding: 1rem;
  overflow-y: auto;
  height: 100vh;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 20; 
`;

const LoadingText = styled.p`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const AccommodationList = () => {
  const { accommodations, isLoading, error, fetchAccommodations, toggleBookmarkStatus } = useAccommodationListStore();
  const { locationId } = useLocationStore();
  const [selectedFilter, setSelectedFilter] = useState('거리순');

  useEffect(() => {
    fetchAccommodations(locationId);
  }, [locationId, fetchAccommodations]);

  if (isLoading) {
    return <LoadingText>숙소 정보를 불러오는 중...</LoadingText>;
  }
  if (error) {
    return <LoadingText>{error}</LoadingText>;
  }

  return (
    <div>
      <FilterContainer>
        <FilterDropdown 
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
        />
      </FilterContainer>
      <ListContainer>
        {accommodations.length > 0 ? (
          accommodations.map(accommodation => (
            <AccommodationItem 
              key={accommodation.id} 
              accommodation={accommodation}
              onBookmarkChange={toggleBookmarkStatus} 
            />
          ))
        ) : (
          <LoadingText>주변에 숙소가 없습니다.</LoadingText>
        )}
      </ListContainer>
    </div>
  );
};

export default AccommodationList;