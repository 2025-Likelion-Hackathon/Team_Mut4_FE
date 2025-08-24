import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUIStore } from '../../../stores/useUIStore';
import { useLocationStore } from '../../../stores/uselocationStore';
import { IoClose } from "react-icons/io5";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const SidebarContainer = styled.div`
  position: absolute; /* fixed에서 absolute로 변경 */
  top: 0;
  right: 0;
  width: 80%;
  max-width: 350px;
  height: 100%;
  background-color: white;
  z-index: 1001;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  line-height: 1;
`;

const BookmarkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex-grow: 1;
`;

const SectionHeader = styled.h3`
  font-size: 0.9rem;
  font-weight: bold;
  color: #6b7280;
  margin: 1rem 0 0.5rem;
  padding: 0 1rem;
`;

const BookmarkItem = styled.li`
  /* 스타일 유지를 위해 li 태그는 그대로 둡니다. */
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 1rem;
  text-decoration: none;
  color: #111827;

  &:hover {
    background-color: #f9fafb;
  }
`;

const NoBookmarksText = styled.p`
  padding: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
`;


const BookmarkSidebar = () => {
  const { isBookmarkSidebarOpen, closeBookmarkSidebar } = useUIStore();
  const { locationId } = useLocationStore();
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isBookmarkSidebarOpen && locationId) {
      const fetchAllBookmarks = async () => {
        setIsLoading(true);
        const foodEndpoint = `/location-food-bookmarks/${locationId}`;
        const accEndpoint = `/location-accommodation-bookmarks/${locationId}`;
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        try {
          const [foodResponse, accResponse] = await Promise.all([
            axios.get(`${baseUrl}${foodEndpoint}`),
            axios.get(`${baseUrl}${accEndpoint}`),
          ]);

          const foodBookmarks = foodResponse.data.map(item => ({ ...item, type: 'restaurant' }));
          const accBookmarks = accResponse.data.map(item => ({ ...item, type: 'accommodation' }));

          setBookmarks([...foodBookmarks, ...accBookmarks]);
        } catch (error) {
          console.error("북마크 로딩 실패:", error);
          setBookmarks([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAllBookmarks();
    }
  }, [isBookmarkSidebarOpen, locationId]);

  if (!isBookmarkSidebarOpen) {
    return null;
  }

  const foodBookmarks = bookmarks.filter(b => b.type === 'restaurant');
  const accBookmarks = bookmarks.filter(b => b.type === 'accommodation');

  return (
    <Overlay onClick={closeBookmarkSidebar}>
      <SidebarContainer isOpen={isBookmarkSidebarOpen} onClick={(e) => e.stopPropagation()}>
        <SidebarHeader>
          <Title>북마크</Title>
          <CloseButton onClick={closeBookmarkSidebar}><IoClose /></CloseButton>
        </SidebarHeader>
        <BookmarkList>
          {isLoading ? <NoBookmarksText>불러오는 중...</NoBookmarksText> : (
            <>
              <SectionHeader>음식점</SectionHeader>
              {foodBookmarks.length > 0 ? (
                foodBookmarks.map(item => (
                  <BookmarkItem key={`food-${item.id}`}>
                    <StyledLink to={`/restaurant/${item.id}`} onClick={closeBookmarkSidebar}>
                      {item.name || item.placeName}
                    </StyledLink>
                  </BookmarkItem>
                ))
              ) : (
                <NoBookmarksText>북마크된 음식점이 없습니다.</NoBookmarksText>
              )}

              <SectionHeader>숙소</SectionHeader>
              {accBookmarks.length > 0 ? (
                accBookmarks.map(item => (
                  <BookmarkItem key={`acc-${item.id}`}>
                    <StyledLink to={`/accommodation/${item.id}`} onClick={closeBookmarkSidebar}>
                      {item.name || item.placeName}
                    </StyledLink>
                  </BookmarkItem>
                ))
              ) : (
                <NoBookmarksText>북마크된 숙소가 없습니다.</NoBookmarksText>
              )}
            </>
          )}
        </BookmarkList>
      </SidebarContainer>
    </Overlay>
  );
};

export default BookmarkSidebar;