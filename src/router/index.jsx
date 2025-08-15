import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../layout/Layout";

// Flow Pages
const LogoPage = lazy(() => import("../pages/logo"));
const LocationAuthPage = lazy(() => import("../pages/current"));

// Main Page and Features
const MainPage = lazy(() => import("../pages/main"));
const TravelRegionPage = lazy(() => import("../pages/travelDestination"));
const AIChatbotPage = lazy(() => import("../pages/chatbot"));
const RestaurantPage = lazy(() => import("../pages/restaurant"));
const AccommodationPage = lazy(() => import("../pages/accommodation"));

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
        path: "/restaurant",
        element: <RestaurantPage />,
      },
      {
        path: "/accommodation",
        element: <AccommodationPage />,
      },
    ],
  },
]);

export default router;
