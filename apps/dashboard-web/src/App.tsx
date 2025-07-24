import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Loader, Center } from '@mantine/core';

// Layouts
import MainLayout from './layouts/MainLayout';

// Dashboard Components
import Dashboard from './pages/dashboard/Dashboard';

// Auth Pages (commented out to avoid compilation errors)
// import Login from './pages/auth/Login';
// import Signup from './pages/auth/Signup';

// Visualization Pages
// const SiteGraph = lazy(() => import('./pages/visualization/SiteGraph'));
// import SiteIssues from './pages/visualization/SiteIssues';
// import DesignOptions from './pages/visualization/DesignOptions';

// Lazy-loaded components
// const Settings = lazy(() => import('./pages/dashboard/Settings'));
// const Profile = lazy(() => import('./pages/dashboard/Profile'));
// const NotFound = lazy(() => import('./pages/NotFound'));

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
  console.log('App component is rendering!');
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
