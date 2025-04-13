
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

          {/* Technician Routes */}
          <Route path="/technician" element={<TechnicianLanding />} />
          <Route
            path="/technician/dashboard"
            element={
              <TechnicianLayout>
                <TechnicianDashboard />
              </TechnicianLayout>
            }
          />
          <Route
            path="/technician/chat"
            element={
              <TechnicianLayout>
                <TechnicianChat />
              </TechnicianLayout>
            }
          />
          <Route
            path="/technician/schedule"
            element={
              <TechnicianLayout>
                <TechnicianSchedule />
              </TechnicianLayout>
            }
          />
          <Route
            path="/technician/services"
            element={
              <TechnicianLayout>
                <TechnicianServices />
              </TechnicianLayout>
            }
          />
          <Route
            path="/technician/parts"
            element={
              <TechnicianLayout>
                <TechnicianParts />
              </TechnicianLayout>
            }
          />
          <Route
            path="/technician/profile"
            element={
              <TechnicianLayout>
                <TechnicianProfile />
              </TechnicianLayout>
            }
          />
          <Route
            path="/technician/service/:id"
            element={
              <TechnicianLayout>
                <TechnicianServiceOrder />
              </TechnicianLayout>
            }
          />

          {/* Customer Routes */}
          <Route
            path="/customer/dashboard"
            element={
              <CustomerLayout>
                <CustomerDashboard />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer/equipment"
            element={
              <CustomerLayout>
                <CustomerEquipment />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer/service-request"
            element={
              <CustomerLayout>
                <CustomerServiceRequest />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer/services"
            element={
              <CustomerLayout>
                <CustomerServices />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer/tracking/:id"
            element={
              <CustomerLayout>
                <CustomerTracking />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer/service-orders"
            element={
              <CustomerLayout>
                <CustomerServiceOrders />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer/service/:id"
            element={
              <CustomerLayout>
                <CustomerServiceDetails />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer/payments"
            element={
              <CustomerLayout>
                <CustomerPayments />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer/payment/:id"
            element={
              <CustomerLayout>
                <CustomerPaymentDetails />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer/profile"
            element={
              <CustomerLayout>
                <CustomerProfile />
              </CustomerLayout>
            }
          />

          {/* Fallback Routes */}
          <Route path="/dashboard" element={<Navigate to="/customer/dashboard" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </AuthProvider>
    </Router>
  );
}

export default App;
