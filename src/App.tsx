
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Lazy load components
const Index = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const FindTechnician = lazy(() => import('@/pages/FindTechnician'));
const Store = lazy(() => import('@/pages/Store'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// New pages
const ServicesMaintenancePage = lazy(() => import('@/pages/ServicesMaintenancePage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const TechniciansPage = lazy(() => import('@/pages/TechniciansPage'));
const ShopPage = lazy(() => import('@/pages/ShopPage'));

// Customer pages
const CustomerDashboard = lazy(() => import('@/pages/customer/Dashboard'));
const CustomerProfile = lazy(() => import('@/pages/customer/Profile'));
const CustomerServices = lazy(() => import('@/pages/customer/Services'));
const CustomerServiceRequest = lazy(() => import('@/pages/customer/ServiceRequest'));
const CustomerServiceDetails = lazy(() => import('@/pages/customer/ServiceDetails'));
const CustomerServiceOrders = lazy(() => import('@/pages/customer/ServiceOrders'));
const CustomerPayments = lazy(() => import('@/pages/customer/Payments'));
const CustomerPaymentDetails = lazy(() => import('@/pages/customer/PaymentDetails'));
const CustomerEquipment = lazy(() => import('@/pages/customer/Equipment'));
const CustomerSchedule = lazy(() => import('@/pages/customer/Schedule'));
const CustomerTracking = lazy(() => import('@/pages/customer/Tracking'));

// Technician pages
const TechnicianLanding = lazy(() => import('@/pages/technician/Landing'));
const TechnicianDashboard = lazy(() => import('@/pages/technician/Dashboard'));
const TechnicianProfile = lazy(() => import('@/pages/technician/Profile'));
const TechnicianServices = lazy(() => import('@/pages/technician/Services'));
const TechnicianServiceOrder = lazy(() => import('@/pages/technician/ServiceOrder'));
const TechnicianParts = lazy(() => import('@/pages/technician/Parts'));
const TechnicianSchedule = lazy(() => import('@/pages/technician/Schedule'));
const TechnicianChat = lazy(() => import('@/pages/technician/Chat'));

// Store pages
const CategoryPage = lazy(() => import('@/pages/store/CategoryPage'));
const CompanyRegister = lazy(() => import('@/pages/store/CompanyRegister'));
const CompanyList = lazy(() => import('@/pages/store/CompanyList'));
const CompanyProducts = lazy(() => import('@/pages/store/CompanyProducts'));
const CompanyProfile = lazy(() => import('@/pages/store/CompanyProfile'));
const CompanyDashboard = lazy(() => import('@/pages/store/CompanyDashboard'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              </div>
            }>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/find-technician" element={<FindTechnician />} />
                <Route path="/store" element={<Store />} />
                
                {/* New temporary pages */}
                <Route path="/servicos/manutencao" element={<ServicesMaintenancePage />} />
                <Route path="/busca" element={<SearchPage />} />
                <Route path="/tecnicos" element={<TechniciansPage />} />
                <Route path="/loja" element={<ShopPage />} />

                {/* Technician public route */}
                <Route path="/technician" element={<TechnicianLanding />} />

                {/* Protected Customer routes */}
                <Route path="/cliente/*" element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="painel" element={<CustomerDashboard />} />
                      <Route path="perfil" element={<CustomerProfile />} />
                      <Route path="servicos" element={<CustomerServices />} />
                      <Route path="solicitar" element={<CustomerServiceRequest />} />
                      <Route path="servicos/:id" element={<CustomerServiceDetails />} />
                      <Route path="ordens" element={<CustomerServiceOrders />} />
                      <Route path="pagamentos" element={<CustomerPayments />} />
                      <Route path="pagamentos/:id" element={<CustomerPaymentDetails />} />
                      <Route path="equipamentos" element={<CustomerEquipment />} />
                      <Route path="agenda" element={<CustomerSchedule />} />
                      <Route path="acompanhamento" element={<CustomerTracking />} />
                    </Routes>
                  </ProtectedRoute>
                } />

                {/* Protected Technician routes */}
                <Route path="/tecnico/*" element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="painel" element={<TechnicianDashboard />} />
                      <Route path="dashboard" element={<TechnicianDashboard />} />
                      <Route path="perfil" element={<TechnicianProfile />} />
                      <Route path="profile" element={<TechnicianProfile />} />
                      <Route path="servicos" element={<TechnicianServices />} />
                      <Route path="services" element={<TechnicianServices />} />
                      <Route path="servicos/:id" element={<TechnicianServiceOrder />} />
                      <Route path="services/:id" element={<TechnicianServiceOrder />} />
                      <Route path="pecas" element={<TechnicianParts />} />
                      <Route path="parts" element={<TechnicianParts />} />
                      <Route path="agenda" element={<TechnicianSchedule />} />
                      <Route path="schedule" element={<TechnicianSchedule />} />
                      <Route path="chat" element={<TechnicianChat />} />
                    </Routes>
                  </ProtectedRoute>
                } />

                {/* Store routes */}
                <Route path="/store/category/:categoryId" element={<CategoryPage />} />
                <Route path="/store/company-register" element={<CompanyRegister />} />
                <Route path="/store/companies" element={<CompanyList />} />
                <Route path="/store/company/:companyId" element={<CompanyProducts />} />
                <Route path="/store/company/:companyId/profile" element={<CompanyProfile />} />

                {/* Protected Store Company routes */}
                <Route path="/store/dashboard" element={
                  <ProtectedRoute>
                    <CompanyDashboard />
                  </ProtectedRoute>
                } />

                {/* 404 route */}
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
