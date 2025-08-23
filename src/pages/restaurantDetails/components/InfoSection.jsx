import React from 'react';
import styled from '@emotion/styled';
import { IoLocationOutline, IoCallOutline } from 'react-icons/io5';
import { useRestaurantDetailsStore } from '../../../stores/useRestaurantDetailsStore';

// ... (styled-components 코드는 이전과 동일) ...
const InfoContainer = styled.div`
  padding: 1.5rem;
  background-color: #f0f0f0;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const InfoTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;
const LikeButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  color: #888;
`;
const Category = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
const DetailInfo = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
`;
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
  font-size: 0.9rem;
  color: #333;

  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
    color: #555;
  }
`;

const InfoSection = () => {
  const restaurant = useRestaurantDetailsStore((state) => state.restaurant);

  if (!restaurant) return null;

  // 🔽 categoryName에서 카테고리 부분만 추출
  const category = restaurant.categoryName?.split('>').pop().trim() || '';

  return (
    <InfoContainer>
      <TitleWrapper>
        <InfoTitle>{restaurant.name}</InfoTitle>
        <LikeButton>🤍</LikeButton>
      </TitleWrapper>
      {/* 🔽 restaurant.category 대신 category 변수 사용 */}
      <Category>{category}</Category>
      <DetailInfo>
        <InfoRow>
          <IoLocationOutline />
          {/* 🔽 roadAddress를 우선으로 표시 */}
          <span>{restaurant.roadAddress || restaurant.address}</span>
        </InfoRow>
        <InfoRow>
          <IoCallOutline />
          <span>{restaurant.phone}</span>
        </InfoRow>
        {/* 🔽 instagram 필드는 API 응답에 없으므로 제거 */}
      </DetailInfo>
    </InfoContainer>
  );
};

export default InfoSection;