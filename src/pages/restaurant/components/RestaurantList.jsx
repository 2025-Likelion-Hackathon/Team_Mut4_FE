import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';
import FilterDropdown from './FilterDropdown';
import { useLocationStore } from '../../../stores/useLocationStore';

const ListContainer = styled.div`
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 250px);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoadingText = styled.p`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('거리순');

  const { locationId, userType } = useLocationStore();

  useEffect(() => {
    if (locationId) {
      const fetchRestaurants = async () => {
        try {
          setIsLoading(true);
          
          let endpoint = `/locations/${locationId}/nearby-food-all`;
          if (selectedFilter === '등급순') {
            endpoint += '/grade';
          }

          const fullUrl = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

          const response = await axios.get(fullUrl, {
            params: {
              radius: 2000
            },
            timeout: 10000
          });

          setRestaurants(response.data);
          setError(null);
        } catch (err) {
          console.error("Error fetching restaurants:", err);
          setError("음식점 정보를 불러오는 데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchRestaurants();
    } else {
        setIsLoading(false);
        setRestaurants([]);
    }
  }, [locationId, userType, selectedFilter]);

  if (userType === 'local' && !locationId) {
    return <LoadingText>위치 정보를 가져오는 중...</LoadingText>;
  }

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
                <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            ))
        ) : (
            <LoadingText>주변에 음식점이 없습니다.</LoadingText>
        )}
      </ListContainer>
    </div>
  );
};

export default RestaurantList;