import React from 'react';
import styled from '@emotion/styled';

const ReviewContainer = styled.div`
  padding: 1.5rem;
  background-color: #f0f0f0;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SectionBox = styled.div`
  background-color: #fff;
  padding: 1.2rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #f0f2f5;
`;

const GradeTitle = styled.h3`
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-weight: 500;
  
  strong {
    color: #10b981;
    font-size: 1.1rem;
  }
`;

const GradeBarWrapper = styled.div`
  display: flex;
  position: relative;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const GradeFill = styled.div`
  background-color: #34d399;
  height: 100%;
  width: ${(props) => props.width}%;
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const GradeLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
`;

const GradeLabel = styled.span`
  font-size: 0.8rem;
  color: #adb5bd;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const ReviewItem = styled.div`
  background-color: #f8f9fa;
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
  color: #34d399;
`;

const PriceComparisonTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  text-align: center;
  margin-bottom: 1rem;

  span {
    color: #10b981;
    font-weight: bold;
  }
`;

const PriceBoxesWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const PriceBox = styled.div`
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ isAverage }) => (isAverage ? '#f3f4f6' : '#d1fae5')};
  color: ${({ isAverage }) => (isAverage ? '#4b5563' : '#065f46')};
`;


const LocalReviewSection = ({ data, type }) => {
  if (!data) return null;

  const grades = ['E', 'D', 'C', 'B', 'A'];
  const gradeWidths = { E: 20, D: 40, C: 60, B: 80, A: 100 };
  
  const currentGrade = data.averageGrade;
  const gradeWidth = gradeWidths[currentGrade] || 0;
  const topTags = data.topTags || [];
  const price = data.restaurantPrice ?? data.accommodationPrice;
  const regionAveragePrice = data.foodAveragePrice ?? data.regionAccommodationAveragePrice;
  const priceDifference = data.priceDifference;
  const showPriceInfo = price != null && regionAveragePrice != null && regionAveragePrice > 0;

  let comparisonText = '';
  if (showPriceInfo) {
    const formattedDiff = Math.abs(priceDifference).toLocaleString('ko-KR');

    if (priceDifference > 0) {
      comparisonText = <>평균 가격보다 <span>{formattedDiff}원</span> 더 싸요</>;
    } else if (priceDifference < 0) {
      comparisonText = <>평균 가격보다 <span>{formattedDiff}원</span> 더 비싸요</>;
    } else {
      comparisonText = '지역 평균 가격과 같아요';
    }
  }

  return (
    <ReviewContainer>
      <SectionTitle>현지인 리뷰</SectionTitle>

      <SectionBox>
        {currentGrade === 'N/A' || currentGrade === undefined ? (
          <GradeTitle>현지인 등급 인증 대기중</GradeTitle>
        ) : (
          <>
            <GradeTitle>
              현지인 등급 <strong style={{ fontWeight: 'bold' }}>{currentGrade}</strong>
              {type === 'restaurant' ? ' 가게에요' : ' 숙소에요'}
            </GradeTitle>
            <GradeBarWrapper>
              <GradeFill width={gradeWidth} />
            </GradeBarWrapper>
            <GradeLabelWrapper>
              {grades.map((grade) => (
                <GradeLabel key={grade}>{grade}</GradeLabel>
              ))}
            </GradeLabelWrapper>
          </>
        )}
      </SectionBox>

      {showPriceInfo && (
        <SectionBox>
          <PriceComparisonTitle>{comparisonText}</PriceComparisonTitle>
          <PriceBoxesWrapper>
            <PriceBox isAverage>
              평균 {regionAveragePrice.toLocaleString('ko-KR')}원
            </PriceBox>
            <PriceBox>
              {price.toLocaleString('ko-KR')}원
            </PriceBox>
          </PriceBoxesWrapper>
        </SectionBox>
      )}

      {topTags.length > 0 && (
        <SectionBox>
          {topTags.map((tag) => (
            <ReviewItem key={tag.tagName}>
              <ReviewTextWrapper>
                <ReviewIcon>👍</ReviewIcon>
                <ReviewTypeText>{tag.tagName}</ReviewTypeText>
              </ReviewTextWrapper>
              <ReviewCount>{tag.count}</ReviewCount>
            </ReviewItem>
          ))}
        </SectionBox>
      )}
    </ReviewContainer>
  );
};

export default LocalReviewSection;