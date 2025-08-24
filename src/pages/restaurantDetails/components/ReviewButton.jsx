import React from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

const Button = styled.button`
  width: calc(100% - 2rem);
  margin: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  transition: background-color 0.2s ease;

  background-color: ${({ disabled }) => (disabled ? '#adb5bd' : '#01D281')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#adb5bd' : '#2cb982')};
  }
`;

const ReviewButton = ({ type, isLocal }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = () => {
    if (!isLocal) return;
    navigate(`/${type}/${id}/review`);
  };

  return (
    <Button onClick={handleNavigate} disabled={!isLocal}>
      {isLocal ? '리뷰 쓰러 가기' : '현지인 인증 필요'}
    </Button>
  );
};

export default ReviewButton;