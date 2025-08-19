import React from 'react';
import styled from '@emotion/styled';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.div`
  position: relative;
  height: 320px;
  background-color:rgb(137, 136, 136);
  overflow: hidden;
`;

const HeaderTop = styled.div`
  position: absolute;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background-color: #fff;
  padding: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: black;
  font-size: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  flex-grow: 1;
  text-align: center;
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

const RestaurantDetailsHeader = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <HeaderContainer>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('placeholder_image_url.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <HeaderTop>
        <IconButton onClick={handleGoBack}>
          <IoChevronBackOutline />
        </IconButton>
        <Title>가게 이름</Title>
        <div style={{ width: '1.5rem' }} />
      </HeaderTop>
      <ImageIndicator>1/3</ImageIndicator>
    </HeaderContainer>
  );
};

export default RestaurantDetailsHeader;