
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Lazy load components
const Index = React.lazy(() => import("@/pages/Index"));
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Login = React.lazy(() => import("@/pages/Login"));
const Register = React.lazy(() => import("@/pages/Register"));
const FindTechnician = React.lazy(() => import("@/pages/FindTechnician"));
const Store = React.lazy(() => import("@/pages/Store"));
const Services = React.lazy(() => import("@/pages/Services"));
const SellEquipment = React.lazy(() => import("@/pages/SellEquipment"));
const SellEquipmentCreate = React.lazy(() => import("@/pages/SellEquipmentCreate"));
const TechnicianLanding = React.lazy(() => import("@/pages/technician/Landing"));
const TechnicianDashboard = React.lazy(() => import("@/pages/technician/Dashboard"));
const TechnicianServices = React.lazy(() => import("@/pages/technician/Services"));
const TechnicianProfile = React.lazy(() => import("@/pages/technician/Profile"));
const TechnicianParts = React.lazy(() => import("@/pages/technician/Parts"));
const TechnicianSchedule = React.lazy(() => import("@/pages/technician/Schedule"));
const TechnicianChat = React.lazy(() => import("@/pages/technician/Chat"));
const TechnicianServiceOrder = React.lazy(() => import("@/pages/technician/ServiceOrder"));
const CompanyRegister = React.lazy(() => import("@/pages/store/CompanyRegister"));
const CompanyDashboard = React.lazy(() => import("@/pages/store/CompanyDashboard"));
const CompanyProfile = React.lazy(() => import("@/pages/store/CompanyProfile"));
const CompanySettings = React.lazy(() => import("@/pages/store/CompanySettings"));
const CompanyProducts = React.lazy(() => import("@/pages/store/CompanyProducts"));
const CompanyList = React.lazy(() => import("@/pages/store/CompanyList"));
const CategoryPage = React.lazy(() => import("@/pages/store/CategoryPage"));
const CustomerDashboard = React.lazy(() => import("@/pages/customer/Dashboard"));
const CustomerServices = React.lazy(() => import("@/pages/customer/Services"));
const CustomerEquipment = React.lazy(() => import("@/pages/customer/Equipment"));
const CustomerProfile = React.lazy(() => import("@/pages/customer/Profile"));
const CustomerPayments = React.lazy(() => import("@/pages/customer/Payments"));
const CustomerServiceOrders = React.lazy(() => import("@/pages/customer/ServiceOrders"));
const CustomerTracking = React.lazy(() => import("@/pages/customer/Tracking"));
const CustomerSchedule = React.lazy(() => import("@/pages/customer/Schedule"));
const CustomerServiceRequest = React.lazy(() => import("@/pages/customer/ServiceRequest"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Suspense fallback={<div>Carregando...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/find-technician" element={<FindTechnician />} />
                <Route path="/services" element={<Services />} />
                
                {/* Customer routes */}
                <Route path="/cliente/painel" element={<CustomerDashboard />} />
                <Route path="/cliente/dashboard" element={<CustomerDashboard />} />
                <Route path="/cliente/servicos" element={<CustomerServices />} />
                <Route path="/cliente/services" element={<CustomerServices />} />
                <Route path="/cliente/equipamentos" element={<CustomerEquipment />} />
                <Route path="/cliente/equipment" element={<CustomerEquipment />} />
                <Route path="/cliente/perfil" element={<CustomerProfile />} />
                <Route path="/cliente/profile" element={<CustomerProfile />} />
                <Route path="/cliente/pagamentos" element={<CustomerPayments />} />
                <Route path="/cliente/payments" element={<CustomerPayments />} />
                <Route path="/cliente/ordens" element={<CustomerServiceOrders />} />
                <Route path="/cliente/orders" element={<CustomerServiceOrders />} />
                <Route path="/cliente/rastreamento" element={<CustomerTracking />} />
                <Route path="/cliente/tracking" element={<CustomerTracking />} />
                <Route path="/cliente/agenda" element={<CustomerSchedule />} />
                <Route path="/cliente/schedule" element={<CustomerSchedule />} />
                
                {/* Technician routes (English) */}
                <Route path="/technician" element={<TechnicianLanding />} />
                <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
                
                {/* Technician routes (Portuguese) */}
                <Route path="/tecnico" element={<TechnicianLanding />} />
                <Route path="/tecnico/painel" element={<TechnicianDashboard />} />
                <Route path="/tecnico/dashboard" element={<TechnicianDashboard />} />
                <Route path="/tecnico/servicos" element={<TechnicianServices />} />
                <Route path="/tecnico/services" element={<TechnicianServices />} />
                <Route path="/tecnico/perfil" element={<TechnicianProfile />} />
                <Route path="/tecnico/profile" element={<TechnicianProfile />} />
                <Route path="/tecnico/pecas" element={<TechnicianParts />} />
                <Route path="/tecnico/parts" element={<TechnicianParts />} />
                <Route path="/tecnico/agenda" element={<TechnicianSchedule />} />
                <Route path="/tecnico/schedule" element={<TechnicianSchedule />} />
                <Route path="/tecnico/chat" element={<TechnicianChat />} />
                <Route path="/tecnico/servicos/:id/os" element={<TechnicianServiceOrder />} />
                
                {/* Sell Equipment routes */}
                <Route path="/sell-equipment" element={<SellEquipment />} />
                <Route path="/sell-equipment/create" element={<SellEquipmentCreate />} />
                
                {/* Customer routes */}
                <Route path="/customer/service-request" element={<CustomerServiceRequest />} />
                
                {/* Store routes */}
                <Route path="/store" element={<Store />} />
                <Route path="/store/company-register" element={<CompanyRegister />} />
                <Route path="/store/company-dashboard" element={<CompanyDashboard />} />
                <Route path="/store/company-profile" element={<CompanyProfile />} />
                <Route path="/store/company-settings" element={<CompanySettings />} />
                <Route path="/store/company-products" element={<CompanyProducts />} />
                <Route path="/store/companies" element={<CompanyList />} />
                <Route path="/store/category/:categorySlug" element={<CategoryPage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
