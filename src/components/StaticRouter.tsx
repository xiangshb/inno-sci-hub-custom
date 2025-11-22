import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '../lib/scroll-to-top';
import HomePage from '../components/pages/HomePage';
import InsightsPage from '../components/pages/InsightsPage';
import ResearchPlansPage from '../components/pages/ResearchPlansPage';
import AgentsPage from '../components/pages/AgentsPage';
import ToolsPage from '../components/pages/ToolsPage';
import KnowledgePage from '../components/pages/KnowledgePage';
import VisualizationsPage from '../components/pages/VisualizationsPage';

// Simple error page component to replace Wix error handler
function ErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-heading text-darktext mb-4">Page Not Found</h1>
        <p className="text-lg text-darktext/70 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

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