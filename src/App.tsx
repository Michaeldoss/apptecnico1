
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FindTechnician from "./pages/FindTechnician";
import CustomerDashboard from "./pages/customer/Dashboard";
import TechnicianDashboard from "./pages/technician/Dashboard";
import TechnicianLanding from "./pages/technician/Landing";
import TechnicianChat from "./pages/technician/Chat";
import TechnicianSchedule from "./pages/technician/Schedule";
import TechnicianServices from "./pages/technician/Services";
import TechnicianParts from "./pages/technician/Parts";
import TechnicianProfile from "./pages/technician/Profile";
import TechnicianServiceOrder from "./pages/technician/ServiceOrder";
import CustomerLayout from "./components/layout/CustomerLayout";
import TechnicianLayout from "./components/layout/TechnicianLayout";
import CustomerEquipment from "./pages/customer/Equipment";
import CustomerServiceRequest from "./pages/customer/ServiceRequest";
import CustomerServices from "./pages/customer/Services";
import CustomerTracking from "./pages/customer/Tracking";
import CustomerServiceOrders from "./pages/customer/ServiceOrders";
import CustomerServiceDetails from "./pages/customer/ServiceDetails";
import CustomerPaymentDetails from "./pages/customer/PaymentDetails";
import CustomerPayments from "./pages/customer/Payments";
import CustomerProfile from "./pages/customer/Profile";
import Store from "./pages/Store";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import CategoryPage from "./pages/store/CategoryPage";
import CompanyList from "./pages/store/CompanyList";
import CompanyRegister from "./pages/store/CompanyRegister";
import CompanyDashboard from "./pages/store/CompanyDashboard";
import CompanyProfile from "./pages/store/CompanyProfile";
import CompanyProducts from "./pages/store/CompanyProducts";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/find-technician" element={<FindTechnician />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/category/:slug" element={<CategoryPage />} />
          <Route path="/store/companies" element={<CompanyList />} />
          <Route path="/store/company-register" element={<CompanyRegister />} />
          <Route path="/store/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/store/company-profile" element={<CompanyProfile />} />
          <Route path="/store/company-products" element={<CompanyProducts />} />

          {/* Technician Routes - Using only /tecnico/ for consistency */}
          <Route path="/technician" element={<Navigate to="/tecnico" replace />} />
          <Route path="/tecnico" element={<TechnicianLanding />} />
          
          <Route
            path="/tecnico/painel"
            element={
              <TechnicianLayout title="Dashboard">
                <TechnicianDashboard />
              </TechnicianLayout>
            }
          />
          
          <Route
            path="/tecnico/chat"
            element={
              <TechnicianLayout title="Chat">
                <TechnicianChat />
              </TechnicianLayout>
            }
          />
          
          <Route
            path="/tecnico/agenda"
            element={
              <TechnicianLayout title="Agenda">
                <TechnicianSchedule />
              </TechnicianLayout>
            }
          />
          
          <Route
            path="/tecnico/servicos"
            element={
              <TechnicianLayout title="Serviços">
                <TechnicianServices />
              </TechnicianLayout>
            }
          />
          
          <Route
            path="/tecnico/pecas"
            element={
              <TechnicianLayout title="Peças">
                <TechnicianParts />
              </TechnicianLayout>
            }
          />
          
          <Route
            path="/tecnico/perfil"
            element={
              <TechnicianLayout title="Perfil">
                <TechnicianProfile />
              </TechnicianLayout>
            }
          />
          
          <Route
            path="/tecnico/servico/:id"
            element={
              <TechnicianLayout title="Ordem de Serviço">
                <TechnicianServiceOrder />
              </TechnicianLayout>
            }
          />

          {/* Redirect old English routes to Portuguese routes */}
          <Route path="/technician/dashboard" element={<Navigate to="/tecnico/painel" replace />} />
          <Route path="/technician/chat" element={<Navigate to="/tecnico/chat" replace />} />
          <Route path="/technician/schedule" element={<Navigate to="/tecnico/agenda" replace />} />
          <Route path="/technician/services" element={<Navigate to="/tecnico/servicos" replace />} />
          <Route path="/technician/parts" element={<Navigate to="/tecnico/pecas" replace />} />
          <Route path="/technician/profile" element={<Navigate to="/tecnico/perfil" replace />} />
          <Route path="/technician/service/:id" element={<Navigate to="/tecnico/servico/:id" replace />} />

          {/* Customer Routes - Updated to use "/cliente/" path prefix */}
          <Route
            path="/cliente/painel"
            element={
              <CustomerLayout title="Dashboard">
                <CustomerDashboard />
              </CustomerLayout>
            }
          />
          <Route
            path="/cliente/equipamentos"
            element={
              <CustomerLayout title="Equipamentos">
                <CustomerEquipment />
              </CustomerLayout>
            }
          />
          <Route
            path="/cliente/servico"
            element={
              <CustomerLayout title="Solicitar Serviço">
                <CustomerServiceRequest />
              </CustomerLayout>
            }
          />
          <Route
            path="/cliente/servicos"
            element={
              <CustomerLayout title="Serviços">
                <CustomerServices />
              </CustomerLayout>
            }
          />
          <Route
            path="/cliente/rastreamento/:id"
            element={
              <CustomerLayout title="Acompanhamento">
                <CustomerTracking />
              </CustomerLayout>
            }
          />
          <Route
            path="/cliente/ordens"
            element={
              <CustomerLayout title="Ordens de Serviço">
                <CustomerServiceOrders />
              </CustomerLayout>
            }
          />
          <Route
            path="/cliente/servico/:id"
            element={
              <CustomerLayout title="Detalhes do Serviço">
                <CustomerServiceDetails />
              </CustomerLayout>
            }
          />
          <Route
            path="/cliente/pagamentos"
            element={
              <CustomerLayout title="Pagamentos">
                <CustomerPayments />
              </CustomerLayout>
            }
          />
          <Route
            path="/cliente/pagamento/:id"
            element={
              <CustomerLayout title="Detalhes do Pagamento">
                <CustomerPaymentDetails />
              </CustomerLayout>
            }
          />
          <Route
            path="/cliente/perfil"
            element={
              <CustomerLayout title="Perfil">
                <CustomerProfile />
              </CustomerLayout>
            }
          />

          {/* Fallback Routes */}
          <Route path="/dashboard" element={<Navigate to="/cliente/painel" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </AuthProvider>
    </Router>
  );
}

export default App;
