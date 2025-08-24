import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import RestaurantDetailsHeader from '../restaurantDetails/components/RestaurantDetailsHeader';
import InfoSection from './components/InfoSection';
import LocationSection from './components/LocationSection';
import LocalReviewSection from '../restaurantDetails/components/LocalReviewSection';
import ReviewButton from '../restaurantDetails/components/ReviewButton';
import ReviewsSection from '../restaurantDetails/components/ReviewsSection';
import { useAccommodationDetailsStore } from '../../stores/useAccommodationDetailsStore';
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

const LoadingText = styled.p`
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
`;

const AccommodationDetailsPage = () => {
  const { id } = useParams();
  const { accommodation, isLoading, error, fetchAccommodationData } = useAccommodationDetailsStore();
  const { userType } = useLocationStore();

  const isUserLocal = userType === 'local';

  useEffect(() => {
    if (id) {
      fetchAccommodationData(id);
    }
  }, [id, fetchAccommodationData]);

  if (isLoading) {
    return <LoadingText>정보를 불러오는 중...</LoadingText>;
  }

  if (error) {
    return <LoadingText>{error}</LoadingText>;
  }
  
  if (!accommodation) {
    return <LoadingText>숙소 정보가 없습니다.</LoadingText>;
  }

  return (
    <Container>
      <RestaurantDetailsHeader title={accommodation.name} />
      <InfoSection />
      <LocationSection 
        name={accommodation.name}
        address={accommodation.roadAddress || accommodation.address}
        latitude={accommodation.latitude}
        longitude={accommodation.longitude}
      />
      <LocalReviewSection data={accommodation} type="accommodation" />
      <ReviewButton type="accommodation" isLocal={isUserLocal} />
      <ReviewsSection reviews={accommodation.reviews} />
    </Container>
  );
};

export default AccommodationDetailsPage;