import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import InsightsPage from '@/components/pages/InsightsPage';
import ResearchPlansPage from '@/components/pages/ResearchPlansPage';
import AgentsPage from '@/components/pages/AgentsPage';
import ToolsPage from '@/components/pages/ToolsPage';
import KnowledgePage from '@/components/pages/KnowledgePage';
import VisualizationsPage from '@/components/pages/VisualizationsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "insights",
        element: <InsightsPage />,
      },
      {
        path: "research-plans",
        element: <ResearchPlansPage />,
      },
      {
        path: "agents",
        element: <AgentsPage />,
      },
      {
        path: "tools",
        element: <ToolsPage />,
      },
      {
        path: "knowledge",
        element: <KnowledgePage />,
      },
      {
        path: "visualizations",
        element: <VisualizationsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: '/inno-sci-hub-custom',
});

export default function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}