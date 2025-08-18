import React from 'react';
import styled from '@emotion/styled';
import AccommodationItem from './AccommodationItem';

// 숙소 더미 데이터
const dummyAccommodations = [
  {
    id: 1,
    name: '호텔 리츠칼튼',
    address: '서울 강남구 역삼동 123-45',
    discount: '1박 10만원 할인',
    rating: '5성급'
  },
  {
    id: 2,
    name: '신라호텔',
    address: '서울 중구 장충동 2가 202',
    discount: '조식 무료 제공',
    rating: '5성급'
  },
  {
    id: 3,
    name: '제주 신라호텔',
    address: '제주 서귀포시 중문관광로72번길 75',
    discount: '사우나 이용권 증정',
    rating: '5성급'
  },
];

const ListContainer = styled.div`
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 200px);
`;

const AccommodationList = () => {
  return (
    <ListContainer>
      {dummyAccommodations.map(item => (
        <AccommodationItem key={item.id} accommodation={item} />
      ))}
    </ListContainer>
  );
};

export default AccommodationList;