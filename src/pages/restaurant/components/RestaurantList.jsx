import React from 'react';
import styled from '@emotion/styled';
import RestaurantItem from './RestaurantItem';
import FilterDropdown from './FilterDropdown';

// 더미 데이터
const dummyRestaurants = [
  {
    id: 1,
    name: '채선당 샤브보트 강남역점',
    address: '서울 강남구 강남대로 378 . 지상1층',
    discount: '5000원 절약',
    rating: '인증 등급 A'
  },
  {
    id: 2,
    name: '채선당 샤브보트 강남역점',
    address: '서울 강남구 강남대로 378 . 지상1층',
    discount: '5000원 절약',
    rating: '인증 등급 A'
  },
  {
    id: 3,
    name: '채선당 샤브보트 강남역점',
    address: '서울 강남구 강남대로 378 . 지상1층',
    discount: '5000원 절약',
    rating: '인증 등급 A'
  },
  {
    id: 4,
    name: '채선당 샤브보트 강남역점',
    address: '서울 강남구 강남대로 378 . 지상1층',
    discount: '5000원 절약',
    rating: '인증 등급 A'
  },
  {
    id: 5,
    name: '채선당 샤브보트 강남역점',
    address: '서울 강남구 강남대로 378 . 지상1층',
    discount: '5000원 절약',
    rating: '인증 등급 A'
  },
  {
    id: 6,
    name: '채선당 샤브보트 강남역점',
    address: '서울 강남구 강남대로 378 . 지상1층',
    discount: '5000원 절약',
    rating: '인증 등급 A'
  },
  {
    id: 7,
    name: '채선당 샤브보트 강남역점',
    address: '서울 강남구 강남대로 378 . 지상1층',
    discount: '5000원 절약',
    rating: '인증 등급 A'
  },
];

const ListContainer = styled.div`
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 250px);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RestaurantList = () => {
  return (
    <div>
        <FilterContainer>
            <FilterDropdown />
        </FilterContainer>
        <ListContainer>
            {dummyRestaurants.map(restaurant => (
                <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            ))}
        </ListContainer>
    </div>
  );
};

export default RestaurantList;