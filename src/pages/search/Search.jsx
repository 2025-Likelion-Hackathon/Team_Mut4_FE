import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { useRestaurantListStore } from '../../stores/useRestaurantListStore';
import { useLocationStore } from '../../stores/uselocationStore';

import RestaurantHeader from '../restaurant/components/RestaurantHeader';
import RestaurantList from '../restaurant/components/RestaurantList';
import BookmarkSidebar from '../restaurant/components/BookmarkSidebar';

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
`;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  
  const { locationId } = useLocationStore();
  const { searchRestaurants } = useRestaurantListStore();

  useEffect(() => {
    if (keyword && locationId) {
      searchRestaurants(locationId, keyword);
    }
  }, [keyword, locationId, searchRestaurants]);

  return (
    <PageContainer>
      <RestaurantHeader type="search" />
      <RestaurantList />
      <BookmarkSidebar />
    </PageContainer>
  );
};

export default SearchPage;