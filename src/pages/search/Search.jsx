import React from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useRestaurantListStore } from '../../stores/useRestaurantListStore';
import { useAccommodationListStore } from '../../stores/useAccommodationListStore';
import { useLocationStore } from '../../stores/uselocationStore';

import RestaurantHeader from '../restaurant/components/RestaurantHeader';
import BookmarkSidebar from '../restaurant/components/BookmarkSidebar';
import RestaurantItem from '../restaurant/components/RestaurantItem';
import AccommodationItem from '../accommodation/components/AccommodationItem';

const PageContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
`;

const ResultsContainer = styled.div`
  padding: 1rem;
`;

const NoResultsText = styled.p`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  
  const { locationId } = useLocationStore();
  const { toggleBookmarkStatus: toggleRestaurantBookmark } = useRestaurantListStore();
  const { toggleBookmarkStatus: toggleAccBookmark } = useAccommodationListStore();

  const [combinedResults, setCombinedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performSingleSearch = async () => {
      if (keyword && locationId) {
        setIsLoading(true);
        setCombinedResults([]);
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;
          const response = await axios.get(`${baseUrl}/locations/${locationId}/search`, {
            params: { keyword, radius: 2000 },
          });

          const resultsWithTpe = response.data.map(item => ({
            ...item,
            resultType: (item.categoryName?.includes('숙박') || item.categoryName?.includes('호텔'))
              ? 'accommodation'
              : 'restaurant',
          }));
          setCombinedResults(resultsWithTpe);

        } catch (error) {
          console.error("Search failed:", error);
          setCombinedResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCombinedResults([]);
      }
    };

    performSingleSearch();
  }, [keyword, locationId]);
  
  const handleBookmarkChange = (id, type) => {
    if (type === 'restaurant') {
      toggleRestaurantBookmark(id);
    } else if (type === 'accommodation') {
      toggleAccBookmark(id);
    }
  };

  return (
    <PageContainer>
      <RestaurantHeader type="search" />
      <ResultsContainer>
        {isLoading ? (
          <NoResultsText>검색 중...</NoResultsText>
        ) : combinedResults.length > 0 ? (
          combinedResults.map(item =>
            item.resultType === 'restaurant' ? (
              <RestaurantItem 
                key={`restaurant-${item.id}`} 
                restaurant={item} 
                onBookmarkChange={(id) => handleBookmarkChange(id, 'restaurant')}
              />
            ) : (
              <AccommodationItem 
                key={`accommodation-${item.id}`} 
                accommodation={item} 
                onBookmarkChange={(id) => handleBookmarkChange(id, 'accommodation')}
              />
            )
          )
        ) : (
          <NoResultsText>'{keyword}'에 대한 검색 결과가 없습니다.</NoResultsText>
        )}
      </ResultsContainer>
      <BookmarkSidebar />
    </PageContainer>
  );
};

export default SearchPage;