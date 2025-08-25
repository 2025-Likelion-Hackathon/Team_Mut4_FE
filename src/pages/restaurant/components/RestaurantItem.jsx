import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 
import { useLocationStore } from '../../../stores/uselocationStore';
import restaurantImage from '../../../assets/Restaurant.png';

export const ItemContainer = styled(Link)`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  text-decoration: none;
  color: inherit;
  position: relative;
`;

export const ImagePlaceholder = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 0.375rem;
  margin-right: 1rem;
  flex-shrink: 0;
  background-image: url(${restaurantImage});
  background-size: cover;
  background-position: center;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

export const RestaurantName = styled.h3`
  font-weight: 600;
  font-size: 1.125rem;
`;

export const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: #4b5663;
  z-index: 10;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const AddressIcon = styled.svg`
  height: 1rem;
  width: 1rem;
  margin-right: 0.25rem;
`;

export const TagsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  background-color: ${({ variant }) => {
    if (variant === 'grade') return '#d1fae5';
    if (variant === 'savings') return '#e0f2fe';
    return '#f3f4f6';
  }};
  color: ${({ variant }) => {
    if (variant === 'grade') return '#059669';
    if (variant === 'savings') return '#0284c7';
    return '#4b5663';
  }};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
`;

const RestaurantItem = ({ restaurant, onBookmarkChange }) => {
  const { locationId } = useLocationStore();
  
  // 1. 백엔드 데이터 구조에 맞게 변수를 destructuring 합니다.
  const { 
    name, placeName, 
    roadAddress, roadAddressName, 
    address, addressName, 
    categoryName, 
    averageGrade, 
    priceDifference // 'priceDifference'를 직접 사용합니다.
  } = restaurant;

  // 2. savings 변수에 priceDifference 값을 할당하고, 이 값이 0보다 클 때만 태그를 보여줍니다.
  const savings = priceDifference;
  const showSavingsTag = savings != null && savings > 0;

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ... (handleBookmarkClick 로직은 이전과 동일)
  };

  return (
    <ItemContainer to={`/restaurant/${restaurant.id}`}>
      <ImagePlaceholder />
      
      <ContentWrapper>
        <HeaderWrapper>
          <RestaurantName>{name || placeName}</RestaurantName>
        </HeaderWrapper>
        
        <AddressWrapper>
          <AddressIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </AddressIcon>
          <span>{roadAddress || roadAddressName || address || addressName}</span>
        </AddressWrapper>    

        <TagsWrapper>
          {/* 3. 이제 이 부분은 새로운 로직에 따라 정확하게 렌더링됩니다. */}
          {showSavingsTag && (
            <Tag variant="savings">
              {savings.toLocaleString('ko-KR')}원 절약
            </Tag>
          )}

          {averageGrade && averageGrade !== 'N/A' && (
            <Tag variant="grade">
              인증 등급 {averageGrade}
            </Tag>
          )}
        </TagsWrapper>
      </ContentWrapper>
      
      <BookmarkButton onClick={handleBookmarkClick}>
        {restaurant.isBookmarked ? <AiFillHeart color="#34d399" /> : <AiOutlineHeart />}
      </BookmarkButton>
    </ItemContainer>
  );
};

export default RestaurantItem;