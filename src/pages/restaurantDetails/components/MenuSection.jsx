import React from 'react';
import styled from '@emotion/styled';

const MenuContainer = styled.div`
  padding: 1.5rem;
  background-color: #f0f0f0;
`;
const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;
const MenuList = styled.ul`
  list-style: none;
  border-radius: 12px;
  padding: 10px 50px;
  background-color: #f9f9f9;
`;
const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.8rem 0;
`;
const MenuName = styled.span`
  font-size: 1rem;
  color: #333;
  padding-right: 0.5rem;
`;
const DottedLine = styled.div`
  flex-grow: 1;
  border-bottom: 2px dotted #ccc;
  transform: translateY(-4px);
`;
const MenuPrice = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  padding-left: 0.5rem;
`;
const NoMenuText = styled.p`
  text-align: center;
  padding: 2rem;
  color: #888;
`;

const mockRestaurant = {
  menus: [
    { name: '메뉴이름 A', price: '10,000 원' },
    { name: '메뉴이름 B', price: '10,000 원' },
    { name: '메뉴이름 C', price: '10,000 원' },
    { name: '메뉴이름 D', price: '10,000 원' },
  ],
};

const MenuSection = () => {
  const restaurant = mockRestaurant;

  if (!restaurant || !restaurant.menus || restaurant.menus.length === 0) {
    return (
      <MenuContainer>
        <SectionTitle>메뉴</SectionTitle>
        <NoMenuText>등록된 메뉴 정보가 없습니다.</NoMenuText>
      </MenuContainer>
    );
  }

  return (
    <MenuContainer>
      <SectionTitle>메뉴</SectionTitle>
      <MenuList>
        {restaurant.menus.map((menu, index) => (
          <MenuItem key={index}>
            <MenuName>{menu.name}</MenuName>
            <DottedLine />
            <MenuPrice>{menu.price}</MenuPrice>
          </MenuItem>
        ))}
      </MenuList>
    </MenuContainer>
  );
};

export default MenuSection;