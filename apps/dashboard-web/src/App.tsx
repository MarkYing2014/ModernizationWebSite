import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppShell, Loader, Center } from '@mantine/core';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';

// Projects Pages
import ProjectsList from './pages/projects/ProjectsList';
import NewProject from './pages/projects/NewProject';
import ProjectDetails from './pages/projects/ProjectDetails';
import CrawlProgress from './pages/projects/CrawlProgress';

// Visualization Pages
import SiteGraph from './pages/visualization/SiteGraph';
import SiteIssues from './pages/visualization/SiteIssues';
import DesignOptions from './pages/visualization/DesignOptions';

// Lazy-loaded components
const Settings = lazy(() => import('./pages/dashboard/Settings'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Auth context mock (will be replaced with real auth later)
const useAuth = () => {
  // For demo purposes, always consider user as authenticated
  // In a real app, this would check tokens, etc.
  return { isAuthenticated: true, user: { name: 'Demo User', email: 'demo@example.com' } };
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated, preserving the intended destination
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Loading fallback for lazy-loaded components
const LoadingFallback = () => (
  <Center style={{ width: '100%', height: '100%', minHeight: '300px' }}>
    <Loader size="xl" variant="dots" />
  </Center>
);

function App() {
  return (
    <AppShell padding={0}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />

            {/* Projects */}
            <Route path="projects">
              <Route index element={<ProjectsList />} />
              <Route path="new" element={<NewProject />} />
              <Route path=":projectId">
                <Route index element={<ProjectDetails />} />
                <Route path="crawl" element={<CrawlProgress />} />
                <Route path="visualization" element={<SiteGraph />} />
                <Route path="issues" element={<SiteIssues />} />
                <Route path="designs" element={<DesignOptions />} />
              </Route>
            </Route>
          </Route>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}

export default App;
