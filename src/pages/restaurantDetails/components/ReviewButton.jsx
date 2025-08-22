import React from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

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

const ReviewButton = ({ type, isLocal }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleReviewClick = () => {
    if (isLocal) { 
      navigate(`/${type}/${id}/review`);
    }
  };

  return (
    <ButtonContainer>
      <Button active={isLocal} onClick={handleReviewClick}>
        리뷰 쓰러 가기
      </Button>
    </ButtonContainer>
  );
};

export default ReviewButton;