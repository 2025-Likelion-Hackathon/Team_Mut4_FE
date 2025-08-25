import React from 'react';
import styled from '@emotion/styled';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import restaurantHeaderImage from '../../../assets/Restaurant.png';
import accommodationHeaderImage from '../../../assets/Accommodation.png';

const HeaderWrapper = styled.div`
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-color: #d9d9d9;

  background-image: url(${(props) =>
    props.type === 'accommodation'
      ? accommodationHeaderImage
      : restaurantHeaderImage});
`;

const HeaderTop = styled.div`
  position: static;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: #fff;
  border-bottom: 1px solid #f0f2f5;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 1.5rem;
  color: #333;
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  flex-grow: 1;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  transform: translateX(-1.2rem); 
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

const RestaurantDetailsHeader = ({ title = "상세 정보", type = "restaurant" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (

    <HeaderWrapper>
      <HeaderTop>
        <BackButton onClick={handleGoBack}>
          <IoChevronBackOutline />
        </BackButton>
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderTop>
      <ImageContainer type={type}>
        <ImageIndicator>1/3</ImageIndicator>
      </ImageContainer>
    </HeaderWrapper>
  );
};

export default RestaurantDetailsHeader;