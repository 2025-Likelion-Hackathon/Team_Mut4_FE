import React from 'react';
import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
`;

const NavButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-bottom: ${props => props.active ? '3px solid #34d399' : 'none'};
  font-weight: ${props => props.active ? '600' : 'normal'};
  color: ${props => props.active ? '#34d399' : '#6b7280'};
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
  font-size: 1rem;
  outline: none;
`;

const RestaurantNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavContainer>
      <NavButton
        active={location.pathname.startsWith('/restaurant')}
        onClick={() => navigate('/restaurant')}
      >
        음식점
      </NavButton>
      <NavButton
        active={location.pathname.startsWith('/accommodation')}
        onClick={() => navigate('/accommodation')}
      >
        숙소
      </NavButton>
    </NavContainer>
  );
};

export default RestaurantNavigation;