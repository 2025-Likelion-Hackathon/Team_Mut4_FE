import React from 'react';
import styled from '@emotion/styled';
import { useMoreTabStore } from '../../../stores/useMoreTabStore';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa; /* 배경색 추가 */
`;

const NavButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-bottom: ${props => props.active ? '3px solid #34d399' : 'none'}; /* 활성 탭 밑줄을 조금 더 두껍게 변경 */
  font-weight: ${props => props.active ? '600' : 'normal'};
  color: ${props => props.active ? '#34d399' : '#6b7280'};
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
  font-size: 1rem; /* 폰트 크기 명시 */
  outline: none; /* 클릭 시 파란색 테두리 제거 */
`;

const RestaurantNavigation = () => {
  const { activeTab, setActiveTab } = useMoreTabStore();

  return (
    <NavContainer>
      <NavButton
        active={activeTab === 'restaurant'}
        onClick={() => setActiveTab('restaurant')}
      >
        음식점
      </NavButton>
      <NavButton
        active={activeTab === 'accommodation'}
        onClick={() => setActiveTab('accommodation')}
      >
        숙소
      </NavButton>
    </NavContainer>
  );
};

export default RestaurantNavigation;