import React from 'react';
import styled from '@emotion/styled';
import { useRestaurantDetailsStore } from '../../../stores/useRestaurantDetailsStore';

const ButtonContainer = styled.div`
  padding: 1.5rem;
  background-color: #f0f0f0;
  border-top: 1px solid #e0e0e0;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
  background-color: ${(props) => (props.active ? '#5186F9' : '#a9a9a9')};
  color: #fff;
  transition: background-color 0.3s ease;
`;

const ReviewButton = () => {
  const isLocal = useRestaurantDetailsStore((state) => state.isLocal);

  const handleClick = () => {
    if (isLocal) {
      alert('리뷰 쓰기 페이지로 이동합니다.');
      // 여기에 리뷰 쓰기 페이지 이동 추가
    } else {
      alert('현지인만 리뷰를 작성할 수 있습니다.');
    }
  };

  return (
    <ButtonContainer>
      <Button active={isLocal} onClick={handleClick}>
        리뷰 쓰러 가기
      </Button>
    </ButtonContainer>
  );
};

export default ReviewButton;