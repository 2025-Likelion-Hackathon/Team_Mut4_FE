import React, { useEffect } from "react";
import { Global } from "@emotion/react";
import RestaurantList from "./components/RestaurantList";
import AccommodationList from "../accommodation/components/AccommodationList";
import RestaurantHeader from "./components/RestaurantHeader";
import RestaurantNavigation from "./components/RestaurantNavigation";
import { useMoreTabStore } from "../../stores/useMoreTabStore";
import { useLocation } from "react-router-dom";

const globalStyles = `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

function RestaurantPage() {
  const activeTab = useMoreTabStore((state) => state.activeTab);
  const setActiveTab = useMoreTabStore((state) => state.setActiveTab);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/accommodation") {
      setActiveTab("accommodation");
    } else {
      setActiveTab("restaurant");
    }
  }, [location.pathname, setActiveTab]);

  return (
    <>
      <Global styles={globalStyles} />
      <RestaurantHeader />
      <RestaurantNavigation />
      {activeTab === "restaurant" ? <RestaurantList /> : <AccommodationList />}
    </>
  );
}

export default RestaurantPage;
