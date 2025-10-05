import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardProfessor from "./pages/DashboardProfessor";
import DashboardAluno from "./pages/DashboardAluno";
import Carometro from "./pages/Carometro";
import BancoQuestoes from "./pages/BancoQuestoes";
import Simulados from "./pages/Simulados";
import Usuarios from "./pages/Usuarios";
import NovoUsuario from "./pages/NovoUsuario";
import NovaTurma from "./pages/NovaTurma";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import MeusSimulados from "./pages/MeusSimulados";
import Desempenho from "./pages/Desempenho";
import Perfil from "./pages/Perfil";
import Turmas from "./pages/Turmas";
import DetalhesTurma from "./pages/DetalhesTurma";
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
          <Route path="/turmas" element={<Turmas />} />
          <Route path="/turmas/novo" element={<NovaTurma />} />
          <Route path="/turma/:id" element={<DetalhesTurma />} />
          <Route path="/questoes" element={<BancoQuestoes />} />
          <Route path="/simulados" element={<Simulados />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/novo" element={<NovoUsuario />} />
          <Route path="/relatorios" element={<Relatorios userRole="professor" />} />
          <Route path="/relatorios/admin" element={<Relatorios userRole="admin" />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/meus-simulados" element={<MeusSimulados />} />
          <Route path="/desempenho" element={<Desempenho />} />
          {/* Rotas de perfil específicas para cada tipo de usuário */}
          <Route path="/perfil/aluno" element={<Perfil userRole="aluno" />} />
          <Route path="/perfil/professor" element={<Perfil userRole="professor" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

