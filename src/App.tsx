import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardProfessor from "./pages/DashboardProfessor";
import DashboardAluno from "./pages/DashboardAluno";
import Carometro from "./pages/Carometro";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/VisionClass">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/dashboard/professor" element={<DashboardProfessor />} />
          <Route path="/dashboard/aluno" element={<DashboardAluno />} />
          <Route path="/carometro" element={<Carometro />} />
          <Route path="/turmas" element={<Navigate to="/dashboard/professor" />} />
          <Route path="/questoes" element={<Navigate to="/dashboard/professor" />} />
          <Route path="/simulados" element={<Navigate to="/dashboard/professor" />} />
          <Route path="/usuarios" element={<Navigate to="/dashboard/admin" />} />
          <Route path="/relatorios" element={<Navigate to="/dashboard/admin" />} />
          <Route path="/configuracoes" element={<Navigate to="/dashboard/admin" />} />
          <Route path="/meus-simulados" element={<Navigate to="/dashboard/aluno" />} />
          <Route path="/desempenho" element={<Navigate to="/dashboard/aluno" />} />
          <Route path="/perfil" element={<Navigate to="/dashboard/aluno" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
