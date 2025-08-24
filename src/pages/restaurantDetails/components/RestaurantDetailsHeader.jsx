import React from 'react';
import styled from '@emotion/styled';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.div`
  position: relative;
  height: 320px;
  background-color: #d9d9d9;
  overflow: hidden;
`;

const HeaderTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  z-index: 20;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 1.5rem;
  color: black;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  border: 1px solid #e0e0e0;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 1.5rem;
  color: black;
`;

const ImageIndicator = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  z-index: 10;
`;

const RestaurantDetailsHeader = ({ title = "가게 이름" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <HeaderTop>
        <BackButton onClick={handleGoBack}>
          <IoChevronBackOutline />
        </BackButton>
        <SearchContainer>
          <span style={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>{title}</span>
        </SearchContainer>
      </HeaderTop>
      <ImageIndicator>1/3</ImageIndicator>
    </HeaderContainer>
  );
};

export default RestaurantDetailsHeader;