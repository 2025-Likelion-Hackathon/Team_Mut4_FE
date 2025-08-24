import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import RestaurantDetailsHeader from './components/RestaurantDetailsHeader';
import InfoSection from './components/InfoSection';
import MenuSection from './components/MenuSection';
import LocalReviewSection from './components/LocalReviewSection';
import ReviewButton from './components/ReviewButton';
import ReviewsSection from './components/ReviewsSection';
import { useRestaurantDetailsStore } from '../../stores/useRestaurantDetailsStore';
import { useLocationStore } from '../../stores/uselocationStore';

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

const LoadingText = styled.p`
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
`;

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { restaurant, isLoading, error, fetchRestaurantData } = useRestaurantDetailsStore();
  const { userType } = useLocationStore();
  console.log("food", userType);

  const isUserLocal = userType === 'local';

  useEffect(() => {
    if (id) {
      fetchRestaurantData(id);
    }
  }, [id, fetchRestaurantData]);

  if (isLoading) {
    return <LoadingText>정보를 불러오는 중...</LoadingText>;
  }

  if (error) {
    return <LoadingText>{error}</LoadingText>;
  }

  if (!restaurant) {
    return <LoadingText>음식점 정보가 없습니다.</LoadingText>;
  }

  return (
    <Container>
      <RestaurantDetailsHeader title={restaurant.name} />
      <ContentWrapper>
        <InfoSection />
        <MenuSection />
        <LocalReviewSection data={restaurant} type="restaurant" />
      </ContentWrapper>
      <ReviewButton type="restaurant" isLocal={isUserLocal} />
      <ReviewsSection reviews={restaurant.reviews} />
    </Container>
  );
};

export default RestaurantDetailPage;