import React from 'react';
import styled from '@emotion/styled';
import { useRestaurantDetailsStore } from '../../../stores/useRestaurantDetailsStore';

const MenuContainer = styled.div`
  padding: 1rem 1.5rem;
  border-top: 10px solid #f0f0f0;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const MenuList = styled.ul`
  list-style: none;
  background-color: #fff;
  border-radius: 12px;
  padding: 10px 50px;
`;

const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const MenuName = styled.span`
  font-size: 1rem;
  color: #333;
`;

const MenuPrice = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const MenuSection = () => {
  const restaurant = useRestaurantDetailsStore((state) => state.restaurant);

  if (!restaurant) return null;

  return (
    <MenuContainer>
      <SectionTitle>메뉴</SectionTitle>
      <MenuList>
        {restaurant.menus.map((menu, index) => (
          <MenuItem key={index}>
            <MenuName>{menu.name}</MenuName>
            <MenuPrice>{menu.price}</MenuPrice>
          </MenuItem>
        ))}
      </MenuList>
    </MenuContainer>
  );
};

export default MenuSection;