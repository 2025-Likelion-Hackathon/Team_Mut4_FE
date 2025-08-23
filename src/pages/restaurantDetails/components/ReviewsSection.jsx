import React, { useState } from 'react';
import styled from '@emotion/styled';

const ReviewsContainer = styled.div`
  padding: 1.5rem;
  background-color: #f0f0f0;
`;

const TabBar = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => (props.active ? '#333' : '#a9a9a9')};
  cursor: pointer;
  padding: 0.5rem 0;
  margin-right: 1rem;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${(props) => (props.active ? '#333' : 'transparent')};
  }
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
  const [activeTab, setActiveTab] = useState('recommended');
  const [expandedReviews, setExpandedReviews] = useState({});

  // 🔽 스토어 직접 호출 코드를 삭제하고 props를 그대로 사용합니다.
  // const restaurant = useRestaurantDetailsStore((state) => state.restaurant);
  // const reviews = restaurant?.reviews || [];

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  if (reviews.length === 0) {
    return (
        <ReviewsContainer>
            <TabBar>
                <Tab active>추천순</Tab>
                <Tab>최신순</Tab>
            </TabBar>
            <NoReviewText>작성된 리뷰가 없습니다.</NoReviewText>
        </ReviewsContainer>
    );
  }

  return (
    <ReviewsContainer>
      <TabBar>
        <Tab active={activeTab === 'recommended'} onClick={() => setActiveTab('recommended')}>
          추천순
        </Tab>
        <Tab active={activeTab === 'latest'} onClick={() => setActiveTab('latest')}>
          최신순
        </Tab>
      </TabBar>

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