import { type RouteObject, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import CourtDashboard from "../pages/Dashboard/CourtDashboard";
import RevenueDashboard from "../pages/Dashboard/RevenueDashboard";
import Test from "../pages/Dashboard/MainDashboard";
import ProtectedRoleRoute from "../utils/components/ProtectedRoleRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import EntityFormConfig from "../pages/Dashboard/EntityFormConfig";

export const dashboardRoutes: RouteObject[] = [
  {
    element: <ProtectedRoleRoute allowedRoles={["STAFF", "ADMIN"]} />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Test /> },
          { path: "reports", element: <RevenueDashboard /> },
          // { path: "courts", element: <CourtDashboard /> },
          { path: ":entity", element: <Dashboard /> },
          { path: ":entity/new", element: <EntityFormConfig /> },
          { path: ":entity/edit/:id", element: <EntityFormConfig /> },
        ],
      },
    ],
  },
];
