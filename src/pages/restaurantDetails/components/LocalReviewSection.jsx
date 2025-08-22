import React from 'react';
import styled from '@emotion/styled';
import { useRestaurantDetailsStore } from '../../../stores/useRestaurantDetailsStore';

const ReviewContainer = styled.div`
  padding: 1.5rem;
  border-top: 10px solid #f0f0f0;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SectionBox = styled.div`
  background-color: #f9f9f9;
  padding: 1.2rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const GradeTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
`;

const GradeBarWrapper = styled.div`
  display: flex;
  position: relative;
  height: 25px;
  background-color: #ddd;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const GradeFill = styled.div`
  background-color: #5186f9;
  height: 100%;
  width: ${(props) => props.width}%;
  border-radius: 12px;
  transition: width 0.5s ease;
`;

const GradeLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const GradeLabel = styled.span`
  font-size: 0.8rem;
  color: #888;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const PriceTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PriceItem = styled.div`
  background-color: ${(props) => (props.active ? '#a9a9a9' : '#e5e7eb')};
  color: ${(props) => (props.active ? 'white' : '#4b5563')};
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: bold;
  font-size: 0.9rem;
  flex: 1;
  text-align: center;
`;

const ReviewItem = styled.div`
  background-color: #f0f0f0;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReviewIcon = styled.span`
  font-size: 1.1rem;
`;

const ReviewTypeText = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

const ReviewCount = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
`;

const LocalReviewSection = () => {
  const restaurant = useRestaurantDetailsStore((state) => state.restaurant);

  if (!restaurant) return null;

  const { localReview } = restaurant;

  const grades = ['E', 'D', 'C', 'B', 'A'];

  const gradeWidths = {
    E: 20,
    D: 40,
    C: 60,
    B: 80,
    A: 100,
  };

  const currentGrade = 'A';

  return (
    <ReviewContainer>
      <SectionTitle>현지인 리뷰</SectionTitle>

      <SectionBox>
        <GradeTitle>
          현지인 등급 <span style={{ fontWeight: 'bold' }}>{currentGrade}</span> 가게예요
        </GradeTitle>
        <GradeBarWrapper>
          <GradeFill width={gradeWidths[currentGrade]} />
        </GradeBarWrapper>
        <GradeLabelWrapper>
          {grades.map((grade) => (
            <GradeLabel key={grade}>{grade}</GradeLabel>
          ))}
        </GradeLabelWrapper>
      </SectionBox>

      <SectionBox>
        <PriceTitle>
          평균 가격에서 <span style={{ fontWeight: 'bold' }}>{localReview.averagePrice}</span>원 더 싸요
        </PriceTitle>
        <PriceRow>
          <PriceItem>평균 15000</PriceItem>
          <PriceItem active>10000원</PriceItem>
        </PriceRow>
      </SectionBox>

      <SectionBox>
        <ReviewItem>
          <ReviewTextWrapper>
            <ReviewIcon>👍</ReviewIcon>
            <ReviewTypeText>맛있어요</ReviewTypeText>
          </ReviewTextWrapper>
          <ReviewCount>20</ReviewCount>
        </ReviewItem>
        <ReviewItem>
          <ReviewTextWrapper>
            <ReviewIcon>👍</ReviewIcon>
            <ReviewTypeText>맛있어요</ReviewTypeText>
          </ReviewTextWrapper>
          <ReviewCount>20</ReviewCount>
        </ReviewItem>
        <ReviewItem>
          <ReviewTextWrapper>
            <ReviewIcon>👍</ReviewIcon>
            <ReviewTypeText>맛있어요</ReviewTypeText>
          </ReviewTextWrapper>
          <ReviewCount>20</ReviewCount>
        </ReviewItem>
      </SectionBox>
    </ReviewContainer>
  );
};

export default LocalReviewSection;