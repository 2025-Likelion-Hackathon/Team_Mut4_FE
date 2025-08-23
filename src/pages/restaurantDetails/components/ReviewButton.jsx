import React from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

// isLocal 값에 따라 버튼 스타일을 동적으로 변경합니다.
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

  /* disabled 속성이 true일 때의 스타일을 정의합니다. */
  background-color: ${({ disabled }) => (disabled ? '#b0b0b0' : '#5186f9')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#b0b0b0' : '#4a7ae8')};
  }
`;

const ReviewButton = ({ type, isLocal }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = () => {
    // isLocal이 false이면 아무 동작도 하지 않습니다.
    if (!isLocal) return;
    navigate(`/${type}/${id}/write`);
  };

  return (
    // isLocal이 false이면 disabled 속성이 true가 됩니다.
    <Button onClick={handleNavigate} disabled={!isLocal}>
      {isLocal ? '이 장소 리뷰쓰기' : '현지인 인증 필요'}
    </Button>
  );
};

export default ReviewButton;