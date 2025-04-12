import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import TechnicianDashboard from "./pages/technician/Dashboard";
import TechnicianProfile from "./pages/technician/Profile";
import TechnicianServices from "./pages/technician/Services";
import TechnicianParts from "./pages/technician/Parts";
import TechnicianSchedule from "./pages/technician/Schedule";
import TechnicianLanding from "./pages/technician/Landing";
import TechnicianServiceOrder from "./pages/technician/ServiceOrder";
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerServices from "./pages/customer/Services";
import CustomerServiceDetails from "./pages/customer/ServiceDetails";
import CustomerServiceRequest from "./pages/customer/ServiceRequest";
import CustomerPayments from "./pages/customer/Payments";
import CustomerPaymentDetails from "./pages/customer/PaymentDetails";
import CustomerTracking from "./pages/customer/Tracking";
import CustomerServiceOrders from "./pages/customer/ServiceOrders";
import CustomerEquipment from "./pages/customer/Equipment";
import CustomerProfile from "./pages/customer/Profile";
import Store from "./pages/Store";
import CompanyRegister from "./pages/store/CompanyRegister";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FindTechnician from "./pages/FindTechnician";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requiredUserType }: { 
  children: React.ReactNode, 
  requiredUserType?: 'technician' | 'customer' 
}) => {
  const { isAuthenticated, userType } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/technician" element={<TechnicianLanding />} />
            <Route path="/find-technician" element={<FindTechnician />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/company-register" element={<CompanyRegister />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Navigate to="/technician" replace />} />
            
            {/* Technician Protected Routes */}
            <Route 
              path="/tecnico/painel" 
              element={
                <ProtectedRoute requiredUserType="technician">
                  <TechnicianDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tecnico/perfil" 
              element={
                <ProtectedRoute requiredUserType="technician">
                  <TechnicianProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tecnico/servicos" 
              element={
                <ProtectedRoute requiredUserType="technician">
                  <TechnicianServices />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tecnico/servicos/:id/os" 
              element={
                <ProtectedRoute requiredUserType="technician">
                  <TechnicianServiceOrder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tecnico/pecas" 
              element={
                <ProtectedRoute requiredUserType="technician">
                  <TechnicianParts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tecnico/agenda" 
              element={
                <ProtectedRoute requiredUserType="technician">
                  <TechnicianSchedule />
                </ProtectedRoute>
              } 
            />
            
            {/* Customer Protected Routes */}
            <Route 
              path="/cliente/painel" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/servicos" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerServices />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/servicos/:id" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerServiceDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/solicitar" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerServiceRequest />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/equipamentos" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerEquipment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/perfil" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/rastreamento" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerTracking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/rastreamento/:id" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerTracking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/pagamentos" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerPayments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/pagamentos/:id" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerPaymentDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/ordens" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerServiceOrders />
                </ProtectedRoute>
              } 
            />
            
            {/* Logout Route */}
            <Route 
              path="/logout" 
              element={
                <LogoutRoute />
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

const LogoutRoute = () => {
  const { logout } = useAuth();
  
  React.useEffect(() => {
    logout();
  }, [logout]);
  
  return <Navigate to="/" replace />;
};

export default App;
