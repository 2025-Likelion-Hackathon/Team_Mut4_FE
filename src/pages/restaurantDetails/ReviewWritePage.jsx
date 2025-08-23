import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import GradeSlider from './components/GradeSlider'

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  min-height: 90vh;
  background-color: #f0f0f0;
  padding: 1rem;
  overflow-y: auto; 
  height: calc(100vh - 200px);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  margin: -1rem -1rem 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

const HeaderTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
`;

const RestaurantInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ImagePlaceholder = styled.div`
  width: 60px;
  height: 60px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin-right: 1rem;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const RestaurantName = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
`;

const RestaurantDescription = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

const SectionContainer = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const KeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const KeywordButton = styled.button`
  background-color: #e0e0e0;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  &.selected {
    background-color: #5186f9;
    color: #fff;
  }
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  resize: vertical;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #5186f9;
  }
`;

const ReviewImageContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ImageUploadButton = styled.button`
  width: 60px;
  height: 60px;
  border: 1px dashed #ccc;
  background-color: #f7f7f7;
  border-radius: 8px;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #5186f9;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  &:hover {
    background-color: #4a7ae8;
  }
`;

const ReviewWritePage = () => {
  const navigate = useNavigate();
  const { type, id } = useParams(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (type === 'restaurant') {
        setData({ name: `레스토랑 #${id}`, description: "레스토랑 설명입니다." });
      } else if (type === 'accommodation') {
        setData({ name: `숙소 #${id}`, description: "숙소 설명입니다." });
      } else {
        setData(null);
      }
      setLoading(false);
    };

    fetchData();
  }, [type, id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }
  
  if (!data) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <IoChevronBackOutline />
        </BackButton>
        <HeaderTitle>리뷰쓰기</HeaderTitle>
        <div style={{ width: '1.5rem' }} />
      </Header>

      <RestaurantInfo>
        <ImagePlaceholder />
        <InfoText>
          <RestaurantName>{data.name}</RestaurantName>
          <RestaurantDescription>{data.description}</RestaurantDescription>
        </InfoText>
      </RestaurantInfo>

      <GradeSlider />

      <SectionContainer>
        <SectionTitle>이 {type === 'restaurant' ? '가게' : '숙소'}의 키워드를 골라주세요</SectionTitle>
        <KeywordWrapper>
          <KeywordButton>👍 깔끔해요</KeywordButton>
          <KeywordButton>👍 맛있어요</KeywordButton>
          <KeywordButton>👍 친절해요</KeywordButton>
          <KeywordButton>👍 편안해요</KeywordButton>
          <KeywordButton>👍 편리해요</KeywordButton>
        </KeywordWrapper>
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>리뷰를 작성해주세요</SectionTitle>
        <ReviewTextArea placeholder="만족도에 대한 후기를 남겨주세요!" />
        <ReviewImageContainer>
          <ImageUploadButton>+</ImageUploadButton>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#e0e0e0', borderRadius: '8px' }} />
        </ReviewImageContainer>
      </SectionContainer>

      <SubmitButton>리뷰 등록하기</SubmitButton>
    </Container>
  );
};

export default ReviewWritePage;