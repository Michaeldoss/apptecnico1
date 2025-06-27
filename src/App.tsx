import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/hooks/useCart';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Services from '@/pages/Services';
import Equipment from '@/pages/Equipment';
import FindTechnician from '@/pages/FindTechnician';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Support from '@/pages/Support';
import HelpCenter from '@/pages/HelpCenter';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Cookies from '@/pages/Cookies';
import NotFound from '@/pages/NotFound';
import SearchPage from '@/pages/SearchPage';
import TechniciansPage from '@/pages/TechniciansPage';
import ServicesMaintenancePage from '@/pages/ServicesMaintenancePage';
import SellEquipment from '@/pages/SellEquipment';
import SellEquipmentCreate from '@/pages/SellEquipmentCreate';
import Store from '@/pages/Store';
import ShopPage from '@/pages/ShopPage';

// Customer Pages
import CustomerDashboard from '@/pages/customer/Dashboard';
import CustomerProfile from '@/pages/customer/Profile';
import CustomerServices from '@/pages/customer/Services';
import CustomerServiceDetails from '@/pages/customer/ServiceDetails';
import CustomerServiceOrders from '@/pages/customer/ServiceOrders';
import CustomerServiceRequest from '@/pages/customer/ServiceRequest';
import CustomerTracking from '@/pages/customer/Tracking';
import CustomerEquipment from '@/pages/customer/Equipment';
import CustomerSchedule from '@/pages/customer/Schedule';
import CustomerPayments from '@/pages/customer/Payments';
import CustomerPaymentDetails from '@/pages/customer/PaymentDetails';
import CustomerClients from '@/pages/customer/Clients';

// Store Pages
import CompanyDashboard from '@/pages/store/CompanyDashboard';
import CompanyList from '@/pages/store/CompanyList';
import CompanyProfile from '@/pages/store/CompanyProfile';
import CompanyProducts from '@/pages/store/CompanyProducts';
import CompanyRegister from '@/pages/store/CompanyRegister';
import CompanySettings from '@/pages/store/CompanySettings';
import CategoryPage from '@/pages/store/CategoryPage';

// Marketplace Pages
import Marketplace from '@/pages/Marketplace';
import ProductDetails from '@/pages/ProductDetails';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import ProductCreate from '@/pages/store/ProductCreate';

// Technician Pages
import TechnicianDashboard from '@/pages/technician/Dashboard';
import TechnicianProfile from '@/pages/technician/Profile';
import TechnicianServices from '@/pages/technician/Services';
import TechnicianServiceOrder from '@/pages/technician/ServiceOrder';
import TechnicianServiceOrders from '@/pages/technician/ServiceOrders';
import TechnicianParts from '@/pages/technician/Parts';
import TechnicianSchedule from '@/pages/technician/Schedule';
import TechnicianPayments from '@/pages/technician/Payments';
import TechnicianChat from '@/pages/technician/Chat';
import TechnicianLanding from '@/pages/technician/Landing';
import TechnicianSubscription from './pages/technician/Subscription';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Toaster />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/find-technician" element={<FindTechnician />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/support" element={<Support />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/technicians" element={<TechniciansPage />} />
              <Route path="/services/maintenance" element={<ServicesMaintenancePage />} />
              <Route path="/sell-equipment" element={<SellEquipment />} />
              <Route path="/sell-equipment/create" element={<SellEquipmentCreate />} />
              <Route path="/store" element={<Store />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />

              {/* Marketplace Routes */}
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/produto/:id" element={<ProductDetails />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Customer Routes - seguindo o padrão do técnico */}
              <Route path="/cliente/dashboard" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/cliente/painel" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/cliente/perfil" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerProfile />
                </ProtectedRoute>
              } />
              <Route path="/cliente/clientes" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerClients />
                </ProtectedRoute>
              } />
              <Route path="/cliente/servicos" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerServices />
                </ProtectedRoute>
              } />
              <Route path="/cliente/servicos/:id" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerServiceDetails />
                </ProtectedRoute>
              } />
              <Route path="/cliente/ordens-servico" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerServiceOrders />
                </ProtectedRoute>
              } />
              <Route path="/cliente/solicitacao-servico" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerServiceRequest />
                </ProtectedRoute>
              } />
              <Route path="/cliente/rastreamento" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerTracking />
                </ProtectedRoute>
              } />
              <Route path="/cliente/equipamentos" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerEquipment />
                </ProtectedRoute>
              } />
              <Route path="/cliente/agenda" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerSchedule />
                </ProtectedRoute>
              } />
              <Route path="/cliente/pagamentos" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerPayments />
                </ProtectedRoute>
              } />
              <Route path="/cliente/pagamentos/:id" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerPaymentDetails />
                </ProtectedRoute>
              } />

              {/* Customer Routes - English versions for backward compatibility */}
              <Route path="/customer/dashboard" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/customer/profile" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerProfile />
                </ProtectedRoute>
              } />
              <Route path="/customer/services" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerServices />
                </ProtectedRoute>
              } />
              <Route path="/customer/services/:id" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerServiceDetails />
                </ProtectedRoute>
              } />
              <Route path="/customer/service-orders" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerServiceOrders />
                </ProtectedRoute>
              } />
              <Route path="/customer/service-request" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerServiceRequest />
                </ProtectedRoute>
              } />
              <Route path="/customer/tracking" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerTracking />
                </ProtectedRoute>
              } />
              <Route path="/customer/equipment" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerEquipment />
                </ProtectedRoute>
              } />
              <Route path="/customer/schedule" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerSchedule />
                </ProtectedRoute>
              } />
              <Route path="/customer/payments" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerPayments />
                </ProtectedRoute>
              } />
              <Route path="/customer/payments/:id" element={
                <ProtectedRoute allowedUserTypes={['customer']}>
                  <CustomerPaymentDetails />
                </ProtectedRoute>
              } />

              {/* Store Routes - Updated to use /loja/ prefix */}
              <Route path="/loja/dashboard" element={
                <ProtectedRoute allowedUserTypes={['company']}>
                  <CompanyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/loja/companies" element={<CompanyList />} />
              <Route path="/loja/profile" element={
                <ProtectedRoute allowedUserTypes={['company']}>
                  <CompanyProfile />
                </ProtectedRoute>
              } />
              <Route path="/loja/products" element={
                <ProtectedRoute allowedUserTypes={['company']}>
                  <CompanyProducts />
                </ProtectedRoute>
              } />
              <Route path="/loja/products/create" element={
                <ProtectedRoute allowedUserTypes={['company']}>
                  <ProductCreate />
                </ProtectedRoute>
              } />
              <Route path="/loja/register" element={<CompanyRegister />} />
              <Route path="/loja/settings" element={
                <ProtectedRoute allowedUserTypes={['company']}>
                  <CompanySettings />
                </ProtectedRoute>
              } />

              {/* Keep existing store routes for backward compatibility */}
              <Route path="/store/dashboard" element={
                <ProtectedRoute allowedUserTypes={['company']}>
                  <CompanyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/store/companies" element={<CompanyList />} />
              <Route path="/store/profile" element={
                <ProtectedRoute allowedUserTypes={['company']}>
                  <CompanyProfile />
                </ProtectedRoute>
              } />
              <Route path="/store/products" element={
                <ProtectedRoute allowedUserTypes={['company']}>
                  <CompanyProducts />
                </ProtectedRoute>
              } />
              <Route path="/store/register" element={<CompanyRegister />} />
              <Route path="/store/settings" element={
                <ProtectedRoute allowedUserTypes={['company']}>
                  <CompanySettings />
                </ProtectedRoute>
              } />

              {/* Technician Public Routes */}
              <Route path="/tecnico" element={<TechnicianLanding />} />

              {/* Technician Protected Routes */}
              <Route path="/tecnico/dashboard" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianDashboard />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/painel" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianDashboard />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/perfil" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianProfile />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/servicos" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianServices />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/ordem-servico/:id" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianServiceOrder />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/ordens-servico" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianServiceOrders />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/pecas" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianParts />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/agenda" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianSchedule />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/pagamentos" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianPayments />
                </ProtectedRoute>
              } />
              <Route path="/tecnico/chat" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianChat />
                </ProtectedRoute>
              } />

              {/* Add new route for technician subscription */}
              <Route path="/tecnico/planos" element={
                <ProtectedRoute allowedUserTypes={['technician']}>
                  <TechnicianSubscription />
                </ProtectedRoute>
              } />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
