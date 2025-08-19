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

const LocationButton = styled.button`
  background-color: #e0e0e0;
  color: #888;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ReviewImages = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ReviewImage = styled.div`
  width: 100%;
  height: 120px;
  background-color: #f0f0f0;
  border-radius: 8px;
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

const dummyReviews = [
  {
    id: 1,
    nickname: 'nickname',
    location: '제주시',
    text: '리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용',
    images: 2,
  },
  {
    id: 2,
    nickname: 'nickname',
    location: '제주시',
    text: '리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용 리뷰에 대한 내용',
    images: 2,
  },
];

const ReviewsSection = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

      {dummyReviews.map((review) => {
        const isExpanded = expandedReviews[review.id];
        const displayMoreButton = review.text.length > 150;
        const displayText = isExpanded || !displayMoreButton
          ? review.text
          : `${review.text.substring(0, 150)}...`;

        return (
          <ReviewCard key={review.id}>
            <ReviewHeader>
              <UserInfo>
                <UserAvatar />
                <Nickname>{review.nickname}</Nickname>
              </UserInfo>
              <LocationButton>
                {review.location}
              </LocationButton>
            </ReviewHeader>
            <ReviewImages>
              {Array.from({ length: review.images }).map((_, index) => (
                <ReviewImage key={index} />
              ))}
            </ReviewImages>
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