import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useLocationStore } from '../../../stores/uselocationStore';

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
  background-color: #e5e7eb;
  border-radius: 0.375rem;
  margin-right: 1rem;
  flex-shrink: 0;
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
  font-size: 1.25rem;
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
    if (variant === 'grade') return '#e0f2fe';
    if (variant === 'savings') return '#ede9fe';
    return '#f3f4f6';
  }};
  color: ${({ variant }) => {
    if (variant === 'grade') return '#0284c7';
    if (variant === 'savings') return '#6d28d9';
    return '#4b5663';
  }};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
`;

const RestaurantItem = ({ restaurant, onBookmarkChange }) => {
  const { locationId } = useLocationStore();
  
  const { 
    name, placeName, 
    roadAddress, roadAddressName, 
    address, addressName, 
    categoryName, 
    averageGrade, 
    restaurantPrice, 
    regionRestaurantAveragePrice 
  } = restaurant;

  const category = categoryName?.split('>')[1]?.trim() || categoryName;

  // 절약 가격을 음식점, 숙소 조회 API에서도 넘어줄 수 있는지 물어보기
  const savings = regionRestaurantAveragePrice - restaurantPrice;
  const showSavingsTag = savings > 0;

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (restaurant.isBookmarked) {
      alert('이미 북마크된 항목입니다.');
      return;
    }

    if (!locationId || !restaurant.id) {
      alert('필요한 정보가 없습니다.');
      return;
    }

    const foodId = restaurant.id;
    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/location-food-bookmarks`;
    const params = { locationId, foodId };

    try {
      await axios.post(endpoint, null, { params });
      alert('북마크에 추가되었습니다.');
      
      if (onBookmarkChange) {
        onBookmarkChange(foodId, true);
      }
    } catch (error) {
      console.error('북마크 추가 실패:', error);
      alert('북마크 추가에 실패했습니다.');
    }
  };

  return (
    <ItemContainer to={`/restaurant/${restaurant.id}`}>
      <ImagePlaceholder />
      
      <ContentWrapper>
        <HeaderWrapper>
          <RestaurantName>{restaurant.name || restaurant.placeName}</RestaurantName>
        </HeaderWrapper>
        
        <AddressWrapper>
          <AddressIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </AddressIcon>
          <span>{restaurant.roadAddress || restaurant.roadAddressName || restaurant.address || restaurant.addressName}</span>
        </AddressWrapper>    

        <TagsWrapper>
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
        {restaurant.isBookmarked ? <BsBookmarkFill color="#5186f9" /> : <BsBookmark />}
      </BookmarkButton>
    </ItemContainer>
  );
};

export default RestaurantItem;