import React from 'react';
import { ItemContainer, ImagePlaceholder, ContentWrapper, HeaderWrapper, RestaurantName, Checkbox, AddressWrapper, AddressIcon, TagsWrapper, Tag } from '../../restaurant/components/RestaurantItem';

const AccommodationItem = ({ accommodation }) => {
  const category = accommodation.categoryName?.split('>')[1]?.trim() || accommodation.categoryName;

  return (
    <ItemContainer to={`/accommodation/${accommodation.id}`}>
      <ImagePlaceholder />
      
      <ContentWrapper>
        <HeaderWrapper>
          <RestaurantName>{accommodation.name}</RestaurantName>
          <Checkbox type="checkbox" />
        </HeaderWrapper>
        
        <AddressWrapper>
          <AddressIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </AddressIcon>
          <span>{accommodation.roadAddress || accommodation.address}</span>
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
    </ItemContainer>
  );
};

export default AccommodationItem;