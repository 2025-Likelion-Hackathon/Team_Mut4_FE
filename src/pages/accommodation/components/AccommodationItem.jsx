import React from 'react';
import axios from 'axios';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useLocationStore } from '../../../stores/uselocationStore';
import {
  ItemContainer, ImagePlaceholder, ContentWrapper, HeaderWrapper, 
  RestaurantName, BookmarkButton, AddressWrapper, AddressIcon, 
  TagsWrapper, Tag 
} from '../../restaurant/components/RestaurantItem';

const AccommodationItem = ({ accommodation, onBookmarkChange }) => {
  const {
    name, placeName,
    roadAddress, roadAddressName,
    address, addressName,
    categoryName,
    averageGrade, //API 변수명 수정 됐는지 확인
    accommodationPrice,
    regionAccommodationAveragePrice
  } = accommodation;
  
  const arePricesValid = typeof accommodationPrice === 'number' && typeof regionAccommodationAveragePrice === 'number';
  const savings = arePricesValid ? regionAccommodationAveragePrice - accommodationPrice : 0;
  const showSavingsTag = arePricesValid && savings > 0;

  const { locationId } = useLocationStore();

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!locationId || !accommodation.id) {
      alert('필요한 정보가 없습니다.');
      return;
    }

    const accommodationId = accommodation.id;
    const isCurrentlyBookmarked = accommodation.isBookmarked;
    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/location-accommodation-bookmarks`;
    const params = { locationId, accommodationId };

    try {
      if (isCurrentlyBookmarked) {
        await axios.delete(endpoint, { params });
        alert('북마크가 삭제되었습니다.');
      } else {
        await axios.post(endpoint, null, { params });
        alert('북마크에 추가되었습니다.');
      }
      
      if (onBookmarkChange) {
        onBookmarkChange(accommodationId, !isCurrentlyBookmarked);
      }
    } catch (error) {
      console.error('북마크 처리 실패:', error);
      alert('북마크 처리에 실패했습니다.');
    }
  };

  return (
    <ItemContainer to={`/accommodation/${accommodation.id}`}>
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
        {accommodation.isBookmarked ? <BsBookmarkFill color="#5186f9" /> : <BsBookmark />}
      </BookmarkButton>
    </ItemContainer>
  );
};

export default AccommodationItem;