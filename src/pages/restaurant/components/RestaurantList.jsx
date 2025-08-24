import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';
import FilterDropdown from './FilterDropdown';
import { useLocationStore } from '../../../stores/uselocationStore';

const ListContainer = styled.div`
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 250px);
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
          
          let allRestaurantsEndpoint = `/locations/${locationId}/nearby-food-all`;
          if (selectedFilter === '등급순') {
            allRestaurantsEndpoint += '/grade';
          }
          const bookmarksEndpoint = `/location-food-bookmarks/${locationId}`;

          const allRestaurantsUrl = `${import.meta.env.VITE_API_BASE_URL}${allRestaurantsEndpoint}`;
          const bookmarksUrl = `${import.meta.env.VITE_API_BASE_URL}${bookmarksEndpoint}`;

          const [allRestaurantsResponse, bookmarksResponse] = await Promise.all([
            axios.get(allRestaurantsUrl, { params: { radius: 2000 }, timeout: 10000 }),
            axios.get(bookmarksUrl)
          ]);

          const allRestaurants = allRestaurantsResponse.data;
          const bookmarkedRestaurants = bookmarksResponse.data;

          const bookmarkedIdSet = new Set(bookmarkedRestaurants.map(b => b.id));

          const mergedRestaurants = allRestaurants.map(restaurant => ({
            ...restaurant,
            isBookmarked: bookmarkedIdSet.has(restaurant.id)
          }));

          setRestaurants(mergedRestaurants);
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

  const handleBookmarkChange = (foodId, newBookmarkStatus) => {
    setRestaurants(currentRestaurants =>
      currentRestaurants.map(r =>
        r.id === foodId ? { ...r, isBookmarked: newBookmarkStatus } : r
      )
    );
  };

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
                <RestaurantItem 
                  key={restaurant.id} 
                  restaurant={restaurant}
                  onBookmarkChange={handleBookmarkChange}
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