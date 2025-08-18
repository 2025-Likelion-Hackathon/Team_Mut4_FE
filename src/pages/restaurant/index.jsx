import React from 'react';
import { Global } from '@emotion/react';
import RestaurantList from './components/RestaurantList';
import RestaurantHeader from './components/RestaurantHeader';
import RestaurantNavigation from './components/RestaurantNavigation';

const globalStyles = `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

function RestaurantPage() {
  return (
    <>
      <Global styles={globalStyles} />
      <RestaurantHeader />
      <RestaurantNavigation />
      <RestaurantList />
    </>
  );
}

export default RestaurantPage;
