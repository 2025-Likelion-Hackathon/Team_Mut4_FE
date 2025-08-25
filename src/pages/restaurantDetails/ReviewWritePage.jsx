import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import GradeSlider from './components/GradeSlider';
import { useRestaurantDetailsStore } from '../../stores/useRestaurantDetailsStore';
import { useAccommodationDetailsStore } from '../../stores/useAccommodationDetailsStore';
import restaurantHeaderImage from '../../assets/Restaurant.png';
import accommodationHeaderImage from '../../assets/Accommodation.png';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #fff;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #f0f2f5;
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
  transform: translateX(-1.2rem);
`;

const PageContent = styled.div`
  padding: 1rem;
`;

const RestaurantInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f2f5;
`;

const ImagePlaceholder = styled.div`
  width: 60px;
  height: 60px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin-right: 1rem;
  flex-shrink: 0;
  background-image: url(${(props) =>
      props.type === 'accommodation'
        ? accommodationHeaderImage
        : restaurantHeaderImage});
  background-size: cover;
  background-position: center;
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
  padding: 1.5rem 0;
  border-bottom: 1px solid #f0f2f5;
  &:last-of-type {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #000000;
`;

const BlackSectionTitle = styled(SectionTitle)`
  color: #333; /* 검은색 제목 */
`;

const KeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const KeywordButton = styled.button`
  background-color: #f0f2f5;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease;

  &.selected {
    background-color: #C2FFE7;
    border-color: #01D281;
    color: #059669;
    font-weight: 500;
  }
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1rem;
  resize: vertical;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #01D281;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #01D281;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  &:hover {
    background-color: #2cb982;
  }
`;

const ReviewWritePage = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();

  const useDetailsStore = type === 'restaurant' ? useRestaurantDetailsStore : useAccommodationDetailsStore;

  const data = useDetailsStore((state) =>
    type === 'restaurant' ? state.restaurant : state.accommodation
  );
  const fetchDetailsData = useDetailsStore((state) =>
    type === 'restaurant' ? state.fetchRestaurantData : state.fetchAccommodationData
  );

  const [foodTags, setFoodTags] = useState([]);
  const [accommodationTags, setAccommodationTags] = useState([]);
  const [grade, setGrade] = useState('A');
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tags = type === 'restaurant' ? foodTags : accommodationTags;

  useEffect(() => {
    if (id) {
      fetchDetailsData(id);
    }
  }, [id, fetchDetailsData]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (type === 'restaurant') {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/food-tags`);
          const formattedTags = response.data.map(tag => ({
            id: tag.foodTagId,
            name: `👍 ${tag.tagName}`
          }));
          setFoodTags(formattedTags);
        } else if (type === 'accommodation') {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/accommodation-tags`);
          const formattedTags = response.data.map(tag => ({
            id: tag.accommodationTagId,
            name: `👍 ${tag.tagName}`
          }));
          setAccommodationTags(formattedTags);
        }
      } catch (error) {
        console.error(`${type === 'restaurant' ? '음식점' : '숙소'} 태그를 불러오는 데 실패했습니다:`, error);
      }
    };

    fetchTags();
  }, [type]);

  const handleTagClick = (tagId) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = async () => {
    if (content.trim() === '') {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    const endpoint = type === 'restaurant' 
      ? `/food-reviews/${id}` 
      : `/accommodation-reviews/${id}`;

    const requestBody = {
      content,
      grade,
      ...(type === 'restaurant'
        ? { foodTagIds: selectedTagIds }
        : { accommodationTagIds: selectedTagIds }),
    };

    try {
      const fullUrl = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;
      await axios.post(fullUrl, requestBody);
      
      alert('리뷰가 성공적으로 등록되었습니다.');
      navigate(`/${type}/${id}`);
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data) {
    return <div>정보를 불러오는 중...</div>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}><IoChevronBackOutline /></BackButton>
        <HeaderTitle>리뷰쓰기</HeaderTitle>
        <div style={{ width: '24px' }} />
      </Header>

      <PageContent>
        <RestaurantInfo>
          <ImagePlaceholder type={type} />
          <InfoText>
            <RestaurantName>{data.name || '하이엔드 제주'}</RestaurantName>
            <RestaurantDescription>{data.categoryName?.split('>').pop().trim() || '음식점>한식>고깃집'}</RestaurantDescription>
          </InfoText>
        </RestaurantInfo>

        <SectionContainer>
          <GradeSlider value={grade} onChange={setGrade} />
        </SectionContainer>
        
        <SectionContainer>
          <BlackSectionTitle>이 {type === 'restaurant' ? '가게' : '숙소'}의 키워드를 골라주세요</BlackSectionTitle>
          <KeywordWrapper>
            {tags.map((tag) => (
              <KeywordButton
                key={tag.id}
                className={selectedTagIds.includes(tag.id) ? 'selected' : ''}
                onClick={() => handleTagClick(tag.id)}
              >
                {tag.name}
              </KeywordButton>
            ))}
          </KeywordWrapper>
        </SectionContainer>
        
        <SectionContainer>
          <SectionTitle>리뷰를 작성해주세요</SectionTitle>
          <ReviewTextArea
            placeholder="만족도에 대한 후기를 남겨주세요!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </SectionContainer>

        <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '등록 중...' : '리뷰 등록하기'}
        </SubmitButton>
      </PageContent>
    </Container>
  );
};

export default ReviewWritePage;