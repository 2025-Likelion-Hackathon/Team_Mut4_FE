import React from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import RestaurantList from '../restaurant/components/RestaurantList'
import AccommodationList from '../accommodation/components/AccommodationList';
import RestaurantHeader from '../restaurant/components/RestaurantHeader';
import RestaurantNavigation from '../restaurant/components/RestaurantNavigation';
import { useMoreTabStore } from '../../stores/useMoreTabStore';
import BookmarkSidebar from '../restaurant/components/BookmarkSidebar';

const PageContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  overflow-x: hidden;
`;

const globalStyles = `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

function ListPage() {
  const { activeTab } = useMoreTabStore();

  return (
    <PageContainer>
      <Global styles={globalStyles} />
      <RestaurantHeader type={activeTab} />
      <RestaurantNavigation />
      {activeTab === 'restaurant' ? <RestaurantList /> : <AccommodationList />}
      <BookmarkSidebar />
    </PageContainer>
  );
}

export default ListPage;