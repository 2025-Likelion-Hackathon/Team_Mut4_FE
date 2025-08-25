import React from 'react';
import styled from '@emotion/styled';
import RestaurantHeader from './components/RestaurantHeader';
import RestaurantNavigation from './components/RestaurantNavigation';
import RestaurantList from './components/RestaurantList';
import BookmarkSidebar from './components/BookmarkSidebar';

const PageContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
`;

const RestaurantPage = () => {
  return (
    <PageContainer>
      <RestaurantHeader type="restaurant" />
      <RestaurantNavigation />
      <RestaurantList />
      <BookmarkSidebar />
    </PageContainer>
  );
};

export default RestaurantPage;