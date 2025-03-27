
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
import Store from "./pages/Store";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rotas de Técnico */}
          <Route path="/tecnico/painel" element={<TechnicianDashboard />} />
          <Route path="/tecnico/perfil" element={<TechnicianProfile />} />
          <Route path="/tecnico/servicos" element={<TechnicianServices />} />
          <Route path="/tecnico/pecas" element={<TechnicianParts />} />
          <Route path="/tecnico/agenda" element={<TechnicianSchedule />} />
          
          {/* Páginas Públicas */}
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Rotas de redirecionamento */}
          <Route path="/services" element={<Navigate to="/tecnico/servicos" replace />} />
          
          {/* ADICIONE TODAS AS ROTAS PERSONALIZADAS ACIMA DA ROTA GENÉRICA "*" */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
