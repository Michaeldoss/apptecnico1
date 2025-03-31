
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
import Store from "./pages/Store";
import CompanyRegister from "./pages/store/CompanyRegister";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Componente de proteção para rotas que requerem autenticação de técnico
const ProtectedTechnicianRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, userType } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType !== 'technician') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Componente de proteção para rotas que requerem autenticação de cliente
const ProtectedCustomerRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, userType } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType !== 'customer') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Rota pública de informações sobre serviços técnicos */}
    <Route path="/technician" element={<TechnicianLanding />} />
    
    {/* Rotas protegidas de Técnico */}
    <Route path="/tecnico/painel" element={
      <ProtectedTechnicianRoute>
        <TechnicianDashboard />
      </ProtectedTechnicianRoute>
    } />
    <Route path="/tecnico/perfil" element={
      <ProtectedTechnicianRoute>
        <TechnicianProfile />
      </ProtectedTechnicianRoute>
    } />
    <Route path="/tecnico/servicos" element={
      <ProtectedTechnicianRoute>
        <TechnicianServices />
      </ProtectedTechnicianRoute>
    } />
    <Route path="/tecnico/servicos/:id/os" element={
      <ProtectedTechnicianRoute>
        <TechnicianServiceOrder />
      </ProtectedTechnicianRoute>
    } />
    <Route path="/tecnico/pecas" element={
      <ProtectedTechnicianRoute>
        <TechnicianParts />
      </ProtectedTechnicianRoute>
    } />
    <Route path="/tecnico/agenda" element={
      <ProtectedTechnicianRoute>
        <TechnicianSchedule />
      </ProtectedTechnicianRoute>
    } />
    
    {/* Rotas protegidas de Cliente */}
    <Route path="/cliente/painel" element={
      <ProtectedCustomerRoute>
        <CustomerDashboard />
      </ProtectedCustomerRoute>
    } />
    <Route path="/cliente/servicos" element={
      <ProtectedCustomerRoute>
        <CustomerServices />
      </ProtectedCustomerRoute>
    } />
    <Route path="/cliente/servicos/:id" element={
      <ProtectedCustomerRoute>
        <CustomerServiceDetails />
      </ProtectedCustomerRoute>
    } />
    <Route path="/cliente/solicitar" element={
      <ProtectedCustomerRoute>
        <CustomerServiceRequest />
      </ProtectedCustomerRoute>
    } />
    <Route path="/cliente/equipamentos" element={
      <ProtectedCustomerRoute>
        <CustomerEquipment />
      </ProtectedCustomerRoute>
    } />
    <Route path="/cliente/rastreamento" element={
      <ProtectedCustomerRoute>
        <CustomerTracking />
      </ProtectedCustomerRoute>
    } />
    <Route path="/cliente/rastreamento/:id" element={
      <ProtectedCustomerRoute>
        <CustomerTracking />
      </ProtectedCustomerRoute>
    } />
    <Route path="/cliente/pagamentos" element={
      <ProtectedCustomerRoute>
        <CustomerPayments />
      </ProtectedCustomerRoute>
    } />
    <Route path="/cliente/pagamentos/:id" element={
      <ProtectedCustomerRoute>
        <CustomerPaymentDetails />
      </ProtectedCustomerRoute>
    } />
    <Route path="/cliente/ordens" element={
      <ProtectedCustomerRoute>
        <CustomerServiceOrders />
      </ProtectedCustomerRoute>
    } />
    
    {/* Páginas Públicas */}
    <Route path="/store" element={<Store />} />
    <Route path="/store/company-register" element={<CompanyRegister />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    
    {/* Rotas de redirecionamento */}
    <Route path="/services" element={<Navigate to="/technician" replace />} />
    <Route path="/logout" element={<Navigate to="/" replace />} />
    
    {/* Rota genérica "*" */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
