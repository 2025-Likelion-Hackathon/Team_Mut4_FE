import React, { useState } from 'react';
import styled from '@emotion/styled';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const FilterText = styled.span`
  white-space: nowrap;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  color: #4b5563;
  font-weight: 500;
  width: 70px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: 0.5rem 0;
  z-index: 10;
  min-width: 120px;
  list-style-type: none;
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('거리순');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggle}>
        <FilterText>{selectedFilter}</FilterText>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <DropdownItem onClick={() => handleSelect('거리순')}>거리순</DropdownItem>
          <DropdownItem onClick={() => handleSelect('등급순')}>등급순</DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default FilterDropdown;