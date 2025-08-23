import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom'; // 🔽 useParams 추가
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

const LoadingText = styled.p`
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
`;

const RestaurantDetailPage = () => {
  // 🔽 1. URL 파라미터에서 음식점 id를 가져옵니다.
  const { id } = useParams(); 
  // 🔽 2. 스토어에서 필요한 상태와 액션을 모두 가져옵니다.
  const { restaurant, isLoading, error, fetchRestaurantData, isLocal } = useRestaurantDetailsStore();

  useEffect(() => {
    // 🔽 3. id가 존재할 때만 API를 호출합니다.
    if (id) {
      fetchRestaurantData(id);
    }
  }, [id, fetchRestaurantData]);

  // 🔽 4. 로딩 및 에러 상태를 화면에 표시합니다.
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
        {/* 🔽 LocalReviewSection에 props로 데이터 전달 */}
        <LocalReviewSection data={restaurant} />
      </ContentWrapper>
      <ReviewButton type="restaurant" isLocal={isLocal} />
      {/* 🔽 ReviewsSection에 props로 데이터 전달 */}
      <ReviewsSection reviews={restaurant.reviews} />
    </Container>
  );
};

export default RestaurantDetailPage;