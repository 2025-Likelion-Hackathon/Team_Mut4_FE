import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import RestaurantDetailsHeader from './components/RestaurantDetailsHeader';
import InfoSection from './components/InfoSection';
import MenuSection from './components/MenuSection';
import LocalReviewSection from './components/LocalReviewSection';
import ReviewButton from './components/ReviewButton';
import ReviewsSection from './components/ReviewsSection';
import { useRestaurantDetailsStore } from '../../stores/useRestaurantDetailsStore';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #f0f0f0;
  min-height: 90vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: auto; 
  height: calc(100vh - 200px);
`;

const ContentWrapper = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
`;

const RestaurantDetailPage = () => {
  const fetchRestaurantData = useRestaurantDetailsStore((state) => state.fetchRestaurantData);
  const isLocal = useRestaurantDetailsStore((state) => state.isLocal);

  useEffect(() => {
    fetchRestaurantData();
  }, [fetchRestaurantData]);

  return (
    <Container>
      <RestaurantDetailsHeader />
      <ContentWrapper>
        <InfoSection />
        <MenuSection />
        <LocalReviewSection />
      </ContentWrapper>
      <ReviewButton type="restaurant" isLocal={isLocal} />
      <ReviewsSection />
    </Container>
  );
};

export default RestaurantDetailPage;