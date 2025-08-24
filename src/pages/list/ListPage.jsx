import React from 'react';
import { Global } from '@emotion/react';
import RestaurantList from '../restaurant/components/RestaurantList'
import AccommodationList from '../accommodation/components/AccommodationList';
import RestaurantHeader from '../restaurant/components/RestaurantHeader';
import RestaurantNavigation from '../restaurant/components/RestaurantNavigation';
import { useMoreTabStore } from '../../stores/useMoreTabStore';

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
    <>
      <Global styles={globalStyles} />
      <RestaurantHeader type={activeTab} />
      <RestaurantNavigation />
      {activeTab === 'restaurant' ? <RestaurantList /> : <AccommodationList />}
    </>
  );
}

export default ListPage;