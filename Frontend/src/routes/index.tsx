import { useRoutes, type RouteObject } from "react-router-dom";
import Login from "../pages/Auth.page";
import MainLayout from "../layouts/mainLayouts";
import HomePage from "../pages/HomePage/HomePage";
import { DiscoverCourts } from "../pages/Courts/CourtPage";
import CourtDetailPage from "../pages/Courts/CourtDetail/CourtDetailPage";
import BookingSummaryPage from "../pages/Booking/Booking.page";
import ProfilePage from "../pages/Profile/ProfilePage";
import { dashboardRoutes } from "./dashboard";

export const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/login", element: <Login /> },
        { path: "/court", element: <DiscoverCourts /> },
        { path: "/court/:id", element: <CourtDetailPage /> },
        { path: "/court/:id/booking", element: <BookingSummaryPage /> },
        { path: "/me", element: <ProfilePage /> },
      ],
    },
    ...dashboardRoutes,
  ];

  return useRoutes(routes);
};
