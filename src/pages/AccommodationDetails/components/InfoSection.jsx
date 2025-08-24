import React from 'react';
import styled from '@emotion/styled';
import { IoLocationOutline, IoCallOutline, IoLinkOutline } from 'react-icons/io5';
import { useAccommodationDetailsStore } from '../../../stores/useAccommodationDetailsStore';

const InfoContainer = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  margin: 1rem 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const Subtitle = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;
const InfoIcon = styled.div`
  color: #555;
  font-size: 1.2rem;
  width: 20px;
  margin-right: 0.8rem;
`;
const InfoText = styled.a`
  font-size: 0.9rem;
  color: #555;
  text-decoration: none;
`;

const InfoSection = () => {
  const accommodation = useAccommodationDetailsStore((state) => state.accommodation);

  if (!accommodation) return null;

  const { name, roadAddress, address, phone, placeUrl } = accommodation;
  const category = accommodation.categoryName?.split('>').pop().trim() || '';

  return (
    <InfoContainer>
      <SectionTitle>{name}</SectionTitle>
      <Subtitle>{category}</Subtitle>
      <InfoRow>
        <InfoIcon><IoLocationOutline /></InfoIcon>
        <InfoText href="#">{roadAddress || address}</InfoText>
      </InfoRow>
      <InfoRow>
        <InfoIcon><IoCallOutline /></InfoIcon>
        {phone ? (
          <InfoText href={`tel:${phone}`}>{phone}</InfoText>
        ) : (
          <InfoText as="span">해당 정보가 없습니다.</InfoText>
        )}
      </InfoRow>
      <InfoRow>
        <InfoIcon><IoLinkOutline /></InfoIcon>
        <InfoText href={placeUrl} target="_blank" rel="noopener noreferrer">
          상세 정보 페이지로 이동
        </InfoText>
      </InfoRow>
    </InfoContainer>
  );
};

export default InfoSection;