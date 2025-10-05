import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Book, CheckSquare, BarChart } from 'lucide-react';
import { mockDashboardStats } from '../lib/mockData';

export default function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = mockDashboardStats;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole="admin" open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header
          userName="Admin Sistema"
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Painel do Administrador</h1>
                <p className="text-muted-foreground">Visão geral do sistema.</p>
              </div>
              <Button asChild>
                <Link to="/usuarios/novo">Cadastrar Usuário</Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsuarios}</div>
                  <p className="text-xs text-muted-foreground">{stats.usuariosHoje > 0 ? `+${stats.usuariosHoje}` : `${stats.usuariosHoje}`} hoje</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Questões Cadastradas</CardTitle>
                  <Book className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.questoesCadastradas}</div>
                   <p className="text-xs text-muted-foreground">{stats.questoesHoje > 0 ? `+${stats.questoesHoje}` : `${stats.questoesHoje}`} hoje</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Simulados Realizados</CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.simuladosRealizados}</div>
                   <p className="text-xs text-muted-foreground">{stats.simuladosHoje > 0 ? `+${stats.simuladosHoje}` : `${stats.simuladosHoje}`} hoje</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Relatórios Gerados</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.relatoriosGerados}</div>
                   <p className="text-xs text-muted-foreground">{stats.relatoriosHoje > 0 ? `+${stats.relatoriosHoje}` : `${stats.relatoriosHoje}`} hoje</p>
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

