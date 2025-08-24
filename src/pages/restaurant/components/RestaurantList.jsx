import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import RestaurantItem from './RestaurantItem';
import FilterDropdown from './FilterDropdown';
import { useLocationStore } from '../../../stores/uselocationStore';
import { useRestaurantListStore } from '../../../stores/useRestaurantListStore';

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

const RestaurantList = () => {
  const { restaurants, isLoading, error, fetchRestaurants, toggleBookmarkStatus } = useRestaurantListStore();
  const { locationId } = useLocationStore();
  
  const [selectedFilter, setSelectedFilter] = useState('거리순');

  useEffect(() => {
    fetchRestaurants(locationId, selectedFilter);
  }, [locationId, selectedFilter, fetchRestaurants]);

  if (isLoading) {
    return <LoadingText>음식점 정보를 불러오는 중...</LoadingText>;
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
        {restaurants.length > 0 ? (
            restaurants.map(restaurant => (
                <RestaurantItem 
                  key={restaurant.id} 
                  restaurant={restaurant}
                  onBookmarkChange={toggleBookmarkStatus}
                />
            ))
        ) : (
            <LoadingText>주변에 음식점이 없습니다.</LoadingText>
        )}
      </ListContainer>
    </div>
  );
};

export default RestaurantList;