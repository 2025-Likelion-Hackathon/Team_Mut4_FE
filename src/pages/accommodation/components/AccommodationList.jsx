import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import AccommodationItem from './AccommodationItem';
import FilterDropdown from '../../restaurant/components/FilterDropdown';
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

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('거리순');

  const { locationId } = useLocationStore();

  useEffect(() => {
    if (locationId) {
      const fetchAccommodations = async () => {
        try {
          setIsLoading(true);
          
          const allAccommodationsEndpoint = `/locations/${locationId}/nearby-accommodation-all`;
          const bookmarksEndpoint = `/location-accommodation-bookmarks/${locationId}`;

          const allAccommodationsUrl = `${import.meta.env.VITE_API_BASE_URL}${allAccommodationsEndpoint}`;
          const bookmarksUrl = `${import.meta.env.VITE_API_BASE_URL}${bookmarksEndpoint}`;

          const [allAccommodationsResponse, bookmarksResponse] = await Promise.all([
            axios.get(allAccommodationsUrl, { params: { radius: 2000 }, timeout: 10000 }),
            axios.get(bookmarksUrl)
          ]);

          const allAccommodations = allAccommodationsResponse.data;
          const bookmarkedAccommodations = bookmarksResponse.data;

          const bookmarkedIdSet = new Set(bookmarkedAccommodations.map(b => b.id));

          const mergedAccommodations = allAccommodations.map(accommodation => ({
            ...accommodation,
            isBookmarked: bookmarkedIdSet.has(accommodation.id)
          }));

          setAccommodations(mergedAccommodations);
          setError(null);
          
        } catch (err) {
          console.error("Error fetching accommodations:", err);
          setError("숙소 정보를 불러오는 데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchAccommodations();
    } else {
      setIsLoading(false);
      setAccommodations([]);
    }
  }, [locationId, selectedFilter]);

  const handleBookmarkChange = (accommodationId, newBookmarkStatus) => {
    setAccommodations(currentAccommodations => 
      currentAccommodations.map(acc => 
        acc.id === accommodationId ? { ...acc, isBookmarked: newBookmarkStatus } : acc
      )
    );
  };

  if (!locationId) {
    return <LoadingText>위치 정보를 가져오는 중...</LoadingText>;
  }

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
                  onBookmarkChange={handleBookmarkChange} 
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