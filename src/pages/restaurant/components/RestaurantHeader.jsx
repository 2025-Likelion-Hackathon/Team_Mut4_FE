import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";

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
`;

const SearchInputContainer = styled.div`
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

const RestaurantHeader = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToBookmark = () => {
    navigate('/bookmark');
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <IconButton onClick={handleGoBack}>
          <IoChevronBackOutline />
        </IconButton>
        <SearchInputContainer>
          <SearchInput type="text" placeholder=" " />
          <SearchIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </SearchIcon>
        </SearchInputContainer>
        <IconButton onClick={handleGoToBookmark}>
          <FiBookmark />
        </IconButton>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default RestaurantHeader;