import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../layout/Layout";

// Flow Pages
const LogoPage = lazy(() => import("../pages/logo"));
const LocationAuthPage = lazy(() => import("../pages/current"));
const LocationPage = lazy(() => import("../pages/current/location"));

// Main Page and Features
const MainPage = lazy(() => import("../pages/main"));
const TravelRegionPage = lazy(() => import("../pages/travelDestination"));
const AIChatbotPage = lazy(() => import("../pages/chatbot"));
const MapView = lazy(() => import("../pages/chatbot/components/MapView"));
const AIChatbotHistoryPage = lazy(
  () => import("../pages/chatbot/chatHistory.jsx")
);
const RestaurantPage = lazy(() => import("../pages/restaurant/Restaurant.jsx"));
const RestaurantDetailsPage = lazy(() => import("../pages/restaurantDetails"));
const ReviewWritePage = lazy(() => import("../pages/restaurantDetails/ReviewWritePage"));
const AccommodationPage = lazy(() => import("../pages/accommodation/Accommodation.jsx"));
const AccommodationDetailsPage = lazy(() => import("../pages/AccommodationDetails"));
const SearchPage = lazy(() => import("../pages/search/Search.jsx"));

const router = createBrowserRouter([
  // Initial Flow Routes (without common Layout for these specific steps)
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LogoPage />
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loading />}>
        <LocationAuthPage />
      </Suspense>
    ),
  },

  // Main App Routes (with common Layout)
  {
    path: "/location",
    element: (
      <Suspense fallback={<Loading />}>
        <LocationPage />
      </Suspense>
    ),
  },
  // Main App Routes (with common Layout)
  {
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/main", // Main page after flow
        element: <MainPage />,
      },
      {
        path: "/destination",
        element: <TravelRegionPage />,
      },
      {
        path: "/chatbot",
        element: <AIChatbotPage />,
      },
      {
        path: "/chatbot/map",
        element: <MapView />,
      },
      {
        path: "/history",
        element: <AIChatbotHistoryPage />,
      },
      {
        path: "/restaurant",
        element: <RestaurantPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetailsPage />,
      },
      {
        path: "/:type/:id/review",
        element: <ReviewWritePage />,
      },
      {
        path: "/accommodation",
        element: <AccommodationPage />,
      },
      {
        path: "/accommodation/:id",
        element: <AccommodationDetailsPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
