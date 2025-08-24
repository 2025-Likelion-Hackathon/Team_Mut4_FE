import React from 'react';
import axios from 'axios';
import { useLocationStore } from '../../../stores/uselocationStore';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import {
  ItemContainer,
  ImagePlaceholder,
  ContentWrapper,
  HeaderWrapper,
  RestaurantName,
  BookmarkButton,
  AddressWrapper,
  AddressIcon,
  TagsWrapper,
  Tag
} from '../../restaurant/components/RestaurantItem';

const AccommodationItem = ({ accommodation, onBookmarkChange }) => {
  const category = accommodation.categoryName?.split('>')[1]?.trim() || accommodation.categoryName;
  const { locationId } = useLocationStore();

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (accommodation.isBookmarked) {
      alert('이미 북마크된 숙소입니다.');
      return;
    }

    if (!locationId || !accommodation.id) {
      alert('필요한 정보가 없습니다.');
      return;
    }

    const accommodationId = accommodation.id;
    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/location-accommodation-bookmarks`;
    const params = { locationId, accommodationId };

    try {
      await axios.post(endpoint, null, { params });
      alert('북마크에 추가되었습니다!');

      if (onBookmarkChange) {
        onBookmarkChange(accommodationId, true);
      }
    } catch (error) {
      console.error('북마크 추가 실패:', error);
      alert('북마크 추가에 실패했습니다.');
    }
  };

  return (
    <ItemContainer to={`/accommodation/${accommodation.id}`}>
      <ImagePlaceholder />
      
      <ContentWrapper>
        <HeaderWrapper>
          <RestaurantName>{accommodation.name || accommodation.placeName}</RestaurantName>
        </HeaderWrapper>
        
        <AddressWrapper>
          <AddressIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </AddressIcon>
          <span>{accommodation.roadAddress || accommodation.roadAddressName || accommodation.address || accommodation.addressName}</span>
        </AddressWrapper>
        
        <TagsWrapper>
          {category && <Tag>{category}</Tag>}
          {accommodation.averageGrad && (
            <Tag>
              {accommodation.averageGrad === 'N/A' 
                ? '인증 대기중' 
                : `등급: ${accommodation.averageGrad}`}
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