import React from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useLocationStore } from '../../../stores/uselocationStore';
import {
  ItemContainer,
  ContentWrapper, HeaderWrapper,
  RestaurantName, BookmarkButton, AddressWrapper, AddressIcon,
  TagsWrapper, Tag
} from '../../restaurant/components/RestaurantItem';
import accommodationImage from '../../../assets/Accommodation.png';

const ImagePlaceholder = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 0.375rem;
  margin-right: 1rem;
  flex-shrink: 0;
  background-image: url(${accommodationImage});
  background-size: cover;
  background-position: center;
`;


const AccommodationItem = ({ accommodation, onBookmarkChange }) => {
  // 1. 백엔드 데이터 구조에 맞게 변수를 destructuring 합니다.
  const {
    name, placeName,
    roadAddress, roadAddressName,
    address, addressName,
    categoryName,
    averageGrade,
    priceDifference // 'priceDifference'를 직접 사용합니다.
  } = accommodation;

  // 2. savings 변수에 priceDifference 값을 할당하고, 이 값이 0보다 클 때만 태그를 보여줍니다.
  const savings = priceDifference;
  const showSavingsTag = savings != null && savings > 0;

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
      if (!isCurrentlyBookmarked) {
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
        {accommodation.isBookmarked ? <AiFillHeart color="#34d399" /> : <AiOutlineHeart />}
      </BookmarkButton>
    </ItemContainer>
  );
};

export default AccommodationItem;