import React, { useState } from 'react';
import styled from '@emotion/styled';

const ReviewsContainer = styled.div`
  padding: 1.5rem;
  background-color: #f0f0f0;
`;

const SortLabel = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ReviewCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

const Nickname = styled.span`
  font-weight: bold;
`;

const ReviewText = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #a9a9a9;
  font-size: 0.85rem;
  cursor: pointer;
`;

const NoReviewText = styled.p`
  text-align: center;
  padding: 2rem;
  color: #888;
`;

const ReviewsSection = ({ reviews = [] }) => {
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  if (reviews.length === 0) {
    return (
        <ReviewsContainer>
            <NoReviewText>작성된 리뷰가 없습니다.</NoReviewText>
        </ReviewsContainer>
    );
  }

  return (
    <ReviewsContainer>
      <SortLabel>최신순</SortLabel>

      {reviews.map((review) => {
        const isExpanded = expandedReviews[review.id];
        const displayMoreButton = review.content.length > 150; 
        const displayText = isExpanded || !displayMoreButton
          ? review.content
          : `${review.content.substring(0, 150)}...`;

        return (
          <ReviewCard key={review.id}>
            <ReviewHeader>
              <UserInfo>
                <UserAvatar />
                <Nickname>{review.username}</Nickname>
              </UserInfo>
            </ReviewHeader>
            
            <ReviewText>{displayText}</ReviewText>
            {displayMoreButton && (
              <MoreButton onClick={() => toggleExpand(review.id)}>
                {isExpanded ? '접기' : '더보기'}
              </MoreButton>
            )}
          </ReviewCard>
        );
      })}
    </ReviewsContainer>
  );
};

export default ReviewsSection;