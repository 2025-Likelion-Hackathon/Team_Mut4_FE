import React from 'react';
import styled from '@emotion/styled';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #e5e7eb;
`;

const NavButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-bottom: ${props => props.active ? '2px solid black' : 'none'};
  font-weight: ${props => props.active ? '600' : 'normal'};
  color: ${props => props.active ? '#000' : '#6b7280'};
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
`;

const RestaurentNavigation = () => {
  return (
    <NavContainer>
      <NavButton active>음식점</NavButton>
      <NavButton>숙소</NavButton>
    </NavContainer>
  );
};

export default RestaurentNavigation;