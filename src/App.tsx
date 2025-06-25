
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
const Equipment = React.lazy(() => import("@/pages/Equipment"));
const Services = React.lazy(() => import("@/pages/Services"));
const Machines = React.lazy(() => import("@/pages/Machines"));
const SellEquipment = React.lazy(() => import("@/pages/SellEquipment"));
const SellEquipmentCreate = React.lazy(() => import("@/pages/SellEquipmentCreate"));
const CompanyRegister = React.lazy(() => import("@/pages/store/CompanyRegister"));
const CompanyDashboard = React.lazy(() => import("@/pages/store/CompanyDashboard"));
const CompanyProfile = React.lazy(() => import("@/pages/store/CompanyProfile"));
const CompanyProducts = React.lazy(() => import("@/pages/store/CompanyProducts"));
const CompanyList = React.lazy(() => import("@/pages/store/CompanyList"));
const CategoryPage = React.lazy(() => import("@/pages/store/CategoryPage"));
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
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/services" element={<Services />} />
                <Route path="/machines" element={<Machines />} />
                
                {/* Sell Equipment routes */}
                <Route path="/sell-equipment" element={<SellEquipment />} />
                <Route path="/sell-equipment/create" element={<SellEquipmentCreate />} />
                
                {/* Store routes */}
                <Route path="/store" element={<Store />} />
                <Route path="/store/company-register" element={<CompanyRegister />} />
                <Route path="/store/company-dashboard" element={<CompanyDashboard />} />
                <Route path="/store/company-profile" element={<CompanyProfile />} />
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
