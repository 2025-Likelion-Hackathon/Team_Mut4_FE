import React from 'react';
import styled from '@emotion/styled';

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

const LocalReviewSection = ({ data }) => {
  if (!data) return null;

  const grades = ['E', 'D', 'C', 'B', 'A'];
  const gradeWidths = { E: 20, D: 40, C: 60, B: 80, A: 100 };
  
  const currentGrade = data.averageGrade;
  console.log(currentGrade);
  const gradeWidth = gradeWidths[currentGrade] || 0;
  const topTags = data.topTags || [];

  return (
    <ReviewContainer>
      <SectionTitle>현지인 리뷰</SectionTitle>

      <SectionBox>
        {currentGrade === 'N/A' || currentGrade === undefined ? (
          <GradeTitle>현지인 등급 인증 대기중</GradeTitle>
        ) : (
          <>
            <GradeTitle>
              현지인 등급 <span style={{ fontWeight: 'bold' }}>{currentGrade}</span>
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

      {topTags.length > 0 && (
        <SectionBox>
          {topTags.map((tag) => (
            <ReviewItem key={tag.id}>
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