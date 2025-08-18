import React from 'react';
import styled from '@emotion/styled';

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ImagePlaceholder = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: #e5e7eb;
  border-radius: 0.375rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const RestaurantName = styled.h3`
  font-weight: 600;
  font-size: 1.125rem;
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
`;

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const AddressIcon = styled.svg`
  height: 1rem;
  width: 1rem;
  margin-right: 0.25rem;
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
`;

const RestaurantItem = ({ restaurant }) => {
  return (
    <ItemContainer>
      <ImagePlaceholder />
      
      <ContentWrapper>
        <HeaderWrapper>
          <RestaurantName>{restaurant.name}</RestaurantName>
          <Checkbox type="checkbox" />
        </HeaderWrapper>
        
        <AddressWrapper>
          <AddressIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </AddressIcon>
          <span>{restaurant.address}</span>
        </AddressWrapper>
        
        <TagsWrapper>
          <Tag>{restaurant.discount}</Tag>
          <Tag>{restaurant.rating}</Tag>
        </TagsWrapper>
      </ContentWrapper>
    </ItemContainer>
  );
};

export default RestaurantItem;