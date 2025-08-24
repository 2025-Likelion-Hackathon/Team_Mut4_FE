import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { useLocationStore } from '../../../stores/uselocationStore'; 
import { useRestaurantListStore } from '../../../stores/useRestaurantListStore';
import { useAccommodationListStore } from '../../../stores/useAccommodationListStore';
import { useMoreTabStore } from '../../../stores/useMoreTabStore';
import { useUIStore } from '../../../stores/useUIStore';

const HeaderContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconButton = styled.button`
  color:rgb(0, 0, 0);
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const SearchForm = styled.form`
  position: relative;
  flex-grow: 1;
  margin: 0 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
  }
`;

const SearchIcon = styled.svg`
  height: 1.25rem;
  width: 1.25rem;
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const RestaurantHeader = ({ type }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const { locationId } = useLocationStore();

  const activeTab = useMoreTabStore((state) => state.activeTab);

  const searchAction = type === 'restaurant'
    ? useRestaurantListStore((state) => state.searchRestaurants)
    : useAccommodationListStore((state) => state.searchAccommodations);

  useEffect(() => {
    setKeyword('');
  }, [activeTab]);

  const { openBookmarkSidebar } = useUIStore();

  const handleGoBack = () => navigate(-1);
  
  const handleOpenBookmarkSidebar = () => {
    openBookmarkSidebar();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    searchAction(locationId, keyword);
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <IconButton onClick={handleGoBack}><IoChevronBackOutline /></IconButton>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput 
            type="text" 
            placeholder={type === 'restaurant' ? '음식점 검색' : '숙소 검색'} 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </SearchIcon>
        </SearchForm>

        <IconButton onClick={handleOpenBookmarkSidebar}>
          <FiBookmark />
        </IconButton>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default RestaurantHeader;