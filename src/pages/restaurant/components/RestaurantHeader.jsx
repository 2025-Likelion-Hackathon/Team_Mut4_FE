import React from 'react';
import styled from '@emotion/styled';

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
  color: #4b5563;
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
  return (
    <HeaderContainer>
      <HeaderInner>
        <IconButton>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </IconButton>
        <SearchInputContainer>
          <SearchInput type="text" placeholder=" " />
          <SearchIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </SearchIcon>
        </SearchInputContainer>
        <IconButton>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </IconButton>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default RestaurantHeader;