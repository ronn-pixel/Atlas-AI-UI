import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ThemeProvider } from '@/app/ThemeContext';
import { useAuth } from '@/store/authStore';

// Lazy load pages for performance
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Members = React.lazy(() => import('@/pages/Members'));
const Vendors = React.lazy(() => import('@/pages/Vendors'));
const Plans = React.lazy(() => import('@/pages/Plans'));
const Claims = React.lazy(() => import('@/pages/Claims'));
const Cases = React.lazy(() => import('@/pages/Cases'));
const Reports = React.lazy(() => import('@/pages/Reports'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const Admin = React.lazy(() => import('@/pages/Admin'));
const Payments = React.lazy(() => import('@/pages/Payments'));
const VendorRouting = React.lazy(() => import('@/pages/VendorRouting'));
const Login = React.lazy(() => import('@/pages/Login'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <React.Suspense fallback={<div className="h-screen w-screen bg-bg-app dark:bg-[#111827] flex items-center justify-center animate-pulse"><div className="w-16 h-16 bg-trust rounded-3xl animate-spin" /></div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<Members />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="plans" element={<Plans />} />
              <Route path="claims" element={<Claims />} />
              <Route path="cases" element={<Cases />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="admin" element={<Admin />} />
              <Route path="payments" element={<Payments />} />
              <Route path="vendor-routing" element={<VendorRouting />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
