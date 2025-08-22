import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ItemContainer, ImagePlaceholder, ContentWrapper, HeaderWrapper, RestaurantName, Checkbox, AddressWrapper, AddressIcon, TagsWrapper, Tag } from '../../restaurant/components/RestaurantItem';

const AccommodationItem = ({ accommodation }) => {
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
          <span>{accommodation.address}</span>
        </AddressWrapper>
        
        <TagsWrapper>
          <Tag>{accommodation.discount}</Tag>
          <Tag>{accommodation.rating}</Tag>
        </TagsWrapper>
      </ContentWrapper>
    </ItemContainer>
  );
};

export default AccommodationItem;