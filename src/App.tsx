import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { CartProvider } from '@/hooks/useCart';
import TestRunner from '@/pages/TestRunner';

// Pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import NewRegister from '@/pages/NewRegister';
import UnifiedLogin from '@/pages/UnifiedLogin';
import UnifiedRegister from '@/pages/UnifiedRegister';
import ProfileComplete from '@/pages/customer/ProfileComplete';
import CustomerAffiliates from '@/pages/customer/Affiliates';
import TechnicianAffiliates from '@/pages/technician/Affiliates';
import CompanyAffiliates from '@/pages/store/CompanyAffiliates';
import FindTechnician from '@/pages/FindTechnician';
import Store from '@/pages/Store';
import Marketplace from '@/pages/Marketplace';
import CategoryPage from '@/pages/store/CategoryPage';
import SellEquipment from '@/pages/SellEquipment';
import SellEquipmentCreate from '@/pages/SellEquipmentCreate';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Support from '@/pages/Support';
import FAQ from '@/pages/FAQ';

// Customer pages
import CustomerDashboard from '@/pages/customer/Dashboard';
import CustomerProfile from '@/pages/customer/Profile';
import CustomerServices from '@/pages/customer/Services';
import CustomerServiceDetails from '@/pages/customer/ServiceDetails';
import CustomerEquipment from '@/pages/customer/Equipment';
import CustomerPayments from '@/pages/customer/Payments';
import CustomerPaymentDetails from '@/pages/customer/PaymentDetails';
import CustomerServiceOrders from '@/pages/customer/ServiceOrders';
import CustomerTracking from '@/pages/customer/Tracking';
import CustomerClients from '@/pages/customer/Clients';
import CustomerSchedule from '@/pages/customer/Schedule';
import CustomerServiceRequest from '@/pages/customer/ServiceRequest';
import CustomerEmergency from '@/pages/customer/Emergency';
import CustomerPreventiveMaintenance from '@/pages/customer/PreventiveMaintenance';
import CustomerBusinessReports from '@/pages/customer/BusinessReports';

// Technician pages
import TechnicianDashboard from '@/pages/technician/Dashboard';
import TechnicianProfile from '@/pages/technician/Profile';
import TechnicianServices from '@/pages/technician/Services';
import TechnicianServiceOrders from '@/pages/technician/ServiceOrders';
import TechnicianCustomers from '@/pages/technician/Customers';
import TechnicianEquipments from '@/pages/technician/Equipments';
import TechnicianSettings from '@/pages/technician/Settings';
import TechnicianChat from '@/pages/technician/Chat';
import TechnicianParts from '@/pages/technician/Parts';
import TechnicianPayments from '@/pages/technician/Payments';
import TechnicianSubscription from '@/pages/technician/Subscription';
import TechnicianSchedule from '@/pages/technician/Schedule';
import TechnicianRegister from '@/pages/technician/Register';
import ClientRegister from '@/pages/ClientRegister';
import StoreRegister from '@/pages/StoreRegister';

// Store pages
import CompanyDashboard from '@/pages/store/CompanyDashboard';
import CompanyRegister from '@/pages/store/CompanyRegister';
import CompanyProducts from '@/pages/store/CompanyProducts';
import CompanyOrders from '@/pages/store/CompanyOrders';
import CompanyFinancial from '@/pages/store/CompanyFinancial';
import CompanyReviews from '@/pages/store/CompanyReviews';
import CompanyInventory from '@/pages/store/CompanyInventory';
import CompanyProfile from '@/pages/store/CompanyProfile';
import CompanySettings from '@/pages/store/CompanySettings';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminPayments from '@/pages/admin/AdminPayments';
import AdminServices from '@/pages/admin/AdminServices';
import AdminReports from '@/pages/admin/AdminReports';
import AdminRoles from '@/pages/admin/Roles';
import AdminSettings from '@/pages/admin/Settings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<UnifiedLogin />} />
              <Route path="/register" element={<UnifiedRegister />} />
              {/* Legacy routes - redirecting to new unified system */}
              <Route path="/old-login" element={<Login />} />
              <Route path="/old-register" element={<NewRegister />} />
              <Route path="/cliente/register" element={<ClientRegister />} />
              <Route path="/technician" element={<TechnicianRegister />} />
              <Route path="/tecnico/register" element={<TechnicianRegister />} />
              <Route path="/loja/register" element={<StoreRegister />} />
              <Route path="/find-technician" element={<FindTechnician />} />
              <Route path="/store" element={<Store />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/store/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/sell-equipment" element={<SellEquipment />} />
              <Route path="/sell-equipment/create" element={<SellEquipmentCreate />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Support />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/test-runner" element={<TestRunner />} />
               
               {/* Store routes */}
               <Route path="/loja/register" element={<CompanyRegister />} />
               <Route path="/loja/dashboard" element={
                 <ProtectedRoute userType="company">
                   <CompanyDashboard />
                 </ProtectedRoute>
               } />
               <Route path="/loja/products" element={
                 <ProtectedRoute userType="company">
                   <CompanyProducts />
                 </ProtectedRoute>
               } />
               <Route path="/loja/orders" element={
                 <ProtectedRoute userType="company">
                   <CompanyOrders />
                 </ProtectedRoute>
               } />
               <Route path="/loja/financeiro" element={
                 <ProtectedRoute userType="company">
                   <CompanyFinancial />
                 </ProtectedRoute>
               } />
               <Route path="/loja/avaliacoes" element={
                 <ProtectedRoute userType="company">
                   <CompanyReviews />
                 </ProtectedRoute>
               } />
                <Route path="/loja/estoque" element={
                  <ProtectedRoute userType="company">
                    <CompanyInventory />
                  </ProtectedRoute>
                } />
                 <Route path="/loja/afiliados" element={
                   <ProtectedRoute userType="company">
                     <CompanyAffiliates />
                   </ProtectedRoute>
                 } />
                 <Route path="/loja/profile" element={
                   <ProtectedRoute userType="company">
                     <CompanyProfile />
                  </ProtectedRoute>
                } />
                <Route path="/loja/configuracoes" element={
                  <ProtectedRoute userType="company">
                    <CompanySettings />
                  </ProtectedRoute>
                } />
                  <Route path="/store/profile" element={
                   <ProtectedRoute userType="company">
                     <CompanyProfile />
                   </ProtectedRoute>
                 } />
               
               {/* Customer routes */}
              <Route path="/cliente/painel" element={
                <ProtectedRoute userType="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/cliente/dashboard" element={
                <ProtectedRoute userType="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
               <Route path="/cliente/perfil" element={
                 <ProtectedRoute userType="customer">
                   <CustomerProfile />
                 </ProtectedRoute>
               } />
                <Route path="/cliente/completar-perfil" element={
                  <ProtectedRoute userType="customer">
                    <ProfileComplete />
                  </ProtectedRoute>
                } />
                <Route path="/cliente/afiliados" element={
                  <ProtectedRoute userType="customer">
                    <CustomerAffiliates />
                  </ProtectedRoute>
                } />
              <Route path="/cliente/profile" element={
                <ProtectedRoute userType="customer">
                  <CustomerProfile />
                </ProtectedRoute>
              } />
              <Route path="/cliente/servicos" element={
                <ProtectedRoute userType="customer">
                  <CustomerServices />
                </ProtectedRoute>
              } />
              <Route path="/cliente/services" element={
                <ProtectedRoute userType="customer">
                  <CustomerServices />
                </ProtectedRoute>
              } />
              <Route path="/cliente/servicos/:id" element={
                <ProtectedRoute userType="customer">
                  <CustomerServiceDetails />
                </ProtectedRoute>
              } />
              <Route path="/cliente/services/:id" element={
                <ProtectedRoute userType="customer">
                  <CustomerServiceDetails />
                </ProtectedRoute>
              } />
              <Route path="/cliente/equipamentos" element={
                <ProtectedRoute userType="customer">
                  <CustomerEquipment />
                </ProtectedRoute>
              } />
              <Route path="/cliente/equipment" element={
                <ProtectedRoute userType="customer">
                  <CustomerEquipment />
                </ProtectedRoute>
              } />
              <Route path="/cliente/ordens" element={
                <ProtectedRoute userType="customer">
                  <CustomerServiceOrders />
                </ProtectedRoute>
              } />
              <Route path="/cliente/orders" element={
                <ProtectedRoute userType="customer">
                  <CustomerServiceOrders />
                </ProtectedRoute>
              } />
              <Route path="/cliente/pagamentos" element={
                <ProtectedRoute userType="customer">
                  <CustomerPayments />
                </ProtectedRoute>
              } />
              <Route path="/cliente/payments" element={
                <ProtectedRoute userType="customer">
                  <CustomerPayments />
                </ProtectedRoute>
              } />
              <Route path="/cliente/pagamentos/:id" element={
                <ProtectedRoute userType="customer">
                  <CustomerPaymentDetails />
                </ProtectedRoute>
              } />
              <Route path="/cliente/payments/:id" element={
                <ProtectedRoute userType="customer">
                  <CustomerPaymentDetails />
                </ProtectedRoute>
              } />
              <Route path="/cliente/rastreamento" element={
                <ProtectedRoute userType="customer">
                  <CustomerTracking />
                </ProtectedRoute>
              } />
              <Route path="/cliente/tracking" element={
                <ProtectedRoute userType="customer">
                  <CustomerTracking />
                </ProtectedRoute>
              } />
              <Route path="/cliente/clientes" element={
                <ProtectedRoute userType="customer">
                  <CustomerClients />
                </ProtectedRoute>
              } />
              <Route path="/cliente/agenda" element={
                <ProtectedRoute userType="customer">
                  <CustomerSchedule />
                </ProtectedRoute>
              } />
              <Route path="/cliente/schedule" element={
                <ProtectedRoute userType="customer">
                  <CustomerSchedule />
                </ProtectedRoute>
              } />
              <Route path="/cliente/solicitar-servico" element={
                <ProtectedRoute userType="customer">
                  <CustomerServiceRequest />
                </ProtectedRoute>
              } />
              <Route path="/cliente/emergencia" element={
                <ProtectedRoute userType="customer">
                  <CustomerEmergency />
                </ProtectedRoute>
              } />
              <Route path="/cliente/manutencao-preventiva" element={
                <ProtectedRoute userType="customer">
                  <CustomerPreventiveMaintenance />
                </ProtectedRoute>
              } />
              <Route path="/cliente/relatorios" element={
                <ProtectedRoute userType="customer">
                  <CustomerBusinessReports />
                </ProtectedRoute>
              } />

              {/* Technician routes */}
              <Route path="/tecnico/painel" element={
                <ProtectedRoute userType="technician">
                  <TechnicianDashboard />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/dashboard" element={
                <ProtectedRoute userType="technician">
                  <TechnicianDashboard />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/perfil" element={
                <ProtectedRoute userType="technician">
                  <TechnicianProfile />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/profile" element={
                <ProtectedRoute userType="technician">
                  <TechnicianProfile />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/servicos" element={
                <ProtectedRoute userType="technician">
                  <TechnicianServices />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/ordens-servico" element={
                <ProtectedRoute userType="technician">
                  <TechnicianServiceOrders />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/service-orders" element={
                <ProtectedRoute userType="technician">
                  <TechnicianServiceOrders />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/mensagens" element={
                <ProtectedRoute userType="technician">
                  <TechnicianChat />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/chat" element={
                <ProtectedRoute userType="technician">
                  <TechnicianChat />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/pecas" element={
                <ProtectedRoute userType="technician">
                  <TechnicianParts />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/parts" element={
                <ProtectedRoute userType="technician">
                  <TechnicianParts />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/pagamentos" element={
                <ProtectedRoute userType="technician">
                  <TechnicianPayments />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/payments" element={
                <ProtectedRoute userType="technician">
                  <TechnicianPayments />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/planos" element={
                <ProtectedRoute userType="technician">
                  <TechnicianSubscription />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/subscription" element={
                <ProtectedRoute userType="technician">
                  <TechnicianSubscription />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/agenda" element={
                <ProtectedRoute userType="technician">
                  <TechnicianSchedule />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/schedule" element={
                <ProtectedRoute userType="technician">
                  <TechnicianSchedule />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/clientes" element={
                <ProtectedRoute userType="technician">
                  <TechnicianCustomers />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/customers" element={
                <ProtectedRoute userType="technician">
                  <TechnicianCustomers />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/equipamentos" element={
                <ProtectedRoute userType="technician">
                  <TechnicianEquipments />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/equipment" element={
                <ProtectedRoute userType="technician">
                  <TechnicianEquipments />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/configuracoes" element={
                <ProtectedRoute userType="technician">
                  <TechnicianSettings />
                </ProtectedRoute>
              } />
               <Route path="/tecnico/settings" element={
                 <ProtectedRoute userType="technician">
                   <TechnicianSettings />
                 </ProtectedRoute>
               } />
               <Route path="/tecnico/afiliados" element={
                 <ProtectedRoute userType="technician">
                   <TechnicianAffiliates />
                 </ProtectedRoute>
               } />

              {/* Admin routes */}
              <Route path="/admin/painel" element={
                <ProtectedRoute userType="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute userType="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/usuarios" element={
                <ProtectedRoute userType="admin">
                  <AdminUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute userType="admin">
                  <AdminUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/payments" element={
                <ProtectedRoute userType="admin">
                  <AdminPayments />
                </ProtectedRoute>
              } />
              <Route path="/admin/services" element={
                <ProtectedRoute userType="admin">
                  <AdminServices />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute userType="admin">
                  <AdminReports />
                </ProtectedRoute>
              } />
              <Route path="/admin/roles" element={
                <ProtectedRoute userType="admin">
                  <AdminRoles />
                </ProtectedRoute>
              } />
              <Route path="/admin/configuracoes" element={
                <ProtectedRoute userType="admin">
                  <AdminSettings />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute userType="admin">
                  <AdminSettings />
                </ProtectedRoute>
              } />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
