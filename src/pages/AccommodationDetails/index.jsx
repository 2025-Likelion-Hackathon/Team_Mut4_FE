import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import RestaurantDetailsHeader from '../restaurantDetails/components/RestaurantDetailsHeader';
import InfoSection from './components/InfoSection';
import LocationSection from './components/LocationSection';
import LocalReviewSection from '../restaurantDetails/components/LocalReviewSection';
import ReviewButton from '../restaurantDetails/components/ReviewButton';
import ReviewsSection from '../restaurantDetails/components/ReviewsSection';
import { useAccommodationDetailsStore } from '../../stores/useAccommodationDetailsStore';

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

const AccommodationDetailsPage = () => {
  const fetchAccommodationData = useAccommodationDetailsStore((state) => state.fetchAccommodationData);
  const accommodation = useAccommodationDetailsStore((state) => state.accommodation);
  const isLocal = useAccommodationDetailsStore((state) => state.isLocal);

  useEffect(() => {
    fetchAccommodationData();
  }, [fetchAccommodationData]);

  if (!accommodation) {
    return null;
  }

  return (
    <Container>
      <RestaurantDetailsHeader title={accommodation.name} />
      <InfoSection />
      <LocationSection />
      <LocalReviewSection />
      <ReviewButton type="accommodation" isLocal={isLocal} />
      <ReviewsSection />
    </Container>
  );
};

export default AccommodationDetailsPage;