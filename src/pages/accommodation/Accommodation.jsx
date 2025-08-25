import React from 'react';
import styled from '@emotion/styled';
import RestaurantHeader from '../restaurant/components/RestaurantHeader';
import RestaurantNavigation from '../restaurant/components/RestaurantNavigation';
import AccommodationList from './components/AccommodationList';
import BookmarkSidebar from '../restaurant/components/BookmarkSidebar';

const PageContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
`;

const AccommodationPage = () => {
  return (
    <PageContainer>
      <RestaurantHeader type="accommodation" />
      <RestaurantNavigation />
      <AccommodationList />
      <BookmarkSidebar />
    </PageContainer>
  );
};

export default AccommodationPage;