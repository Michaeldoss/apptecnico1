import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Lazy load components
const Index = React.lazy(() => import("@/pages/Index"));
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Login = React.lazy(() => import("@/pages/Login"));
const Register = React.lazy(() => import("@/pages/Register"));
const FindTechnician = React.lazy(() => import("@/pages/FindTechnician"));
const Store = React.lazy(() => import("@/pages/Store"));
const Services = React.lazy(() => import("@/pages/Services"));
const Terms = React.lazy(() => import("@/pages/Terms"));
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
                <Route path="/terms" element={<Terms />} />
                
                {/* Customer routes */}
                <Route path="/cliente/painel" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/dashboard" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/servicos" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerServices />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/services" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerServices />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/equipamentos" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerEquipment />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/equipment" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerEquipment />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/perfil" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerProfile />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/profile" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerProfile />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/pagamentos" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerPayments />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/payments" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerPayments />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/ordens" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerServiceOrders />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/orders" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerServiceOrders />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/rastreamento" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerTracking />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/tracking" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerTracking />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/agenda" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerSchedule />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/schedule" element={
                  <ProtectedRoute allowedUserTypes={['customer']}>
                    <CustomerSchedule />
                  </ProtectedRoute>
                } />
                
                {/* Technician routes (English) */}
                <Route path="/technician" element={<TechnicianLanding />} />
                <Route path="/technician/dashboard" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Technician routes (Portuguese) */}
                <Route path="/tecnico" element={<TechnicianLanding />} />
                <Route path="/tecnico/painel" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/dashboard" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/servicos" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianServices />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/services" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianServices />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/perfil" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianProfile />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/profile" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianProfile />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/pecas" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianParts />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/parts" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianParts />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/agenda" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianSchedule />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/schedule" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianSchedule />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/chat" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianChat />
                  </ProtectedRoute>
                } />
                <Route path="/tecnico/servicos/:id/os" element={
                  <ProtectedRoute allowedUserTypes={['technician']}>
                    <TechnicianServiceOrder />
                  </ProtectedRoute>
                } />
                
                {/* Sell Equipment routes */}
                <Route path="/sell-equipment" element={<SellEquipment />} />
                <Route path="/sell-equipment/create" element={<SellEquipmentCreate />} />
                
                {/* Customer routes */}
                <Route path="/customer/service-request" element={<CustomerServiceRequest />} />
                
                {/* Store routes */}
                <Route path="/store" element={<Store />} />
                <Route path="/store/company-register" element={<CompanyRegister />} />
                <Route path="/store/company-dashboard" element={
                  <ProtectedRoute allowedUserTypes={['company']}>
                    <CompanyDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Loja routes - Nova rota para empresas */}
                <Route path="/loja/dashboard" element={
                  <ProtectedRoute allowedUserTypes={['company']}>
                    <CompanyDashboard />
                  </ProtectedRoute>
                } />
                
                {/* ... keep existing code (remaining store routes) */}
                <Route path="/store/company-profile" element={
                  <ProtectedRoute allowedUserTypes={['company']}>
                    <CompanyProfile />
                  </ProtectedRoute>
                } />
                <Route path="/store/company-settings" element={
                  <ProtectedRoute allowedUserTypes={['company']}>
                    <CompanySettings />
                  </ProtectedRoute>
                } />
                <Route path="/store/company-products" element={
                  <ProtectedRoute allowedUserTypes={['company']}>
                    <CompanyProducts />
                  </ProtectedRoute>
                } />
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
