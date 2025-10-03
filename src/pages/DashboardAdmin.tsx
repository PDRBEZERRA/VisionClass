import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, FileText, TrendingUp, UserPlus, FolderPlus, Database } from 'lucide-react';
import { mockDashboardStats } from '@/lib/mockData';

export default function DashboardAdmin() {
  const stats = mockDashboardStats;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole="admin" />
      
      <div className="flex-1 flex flex-col">
        <Header userName="Admin Sistema" />
        
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
              <p className="text-muted-foreground">Visão geral do sistema</p>
            </div>
            <Button className="btn-primary-gradient">
              <Database className="w-4 h-4 mr-2" />
              Backup de Dados
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-lift cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Alunos
                </CardTitle>
                <Users className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalAlunos}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-secondary font-medium">+12%</span> vs. ano passado
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Professores
                </CardTitle>
                <GraduationCap className="w-5 h-5 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalProfessores}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-secondary font-medium">+3</span> este mês
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Turmas Ativas
                </CardTitle>
                <FolderPlus className="w-5 h-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.turmasAtivas}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Ano letivo 2025
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Simulados Ativos
                </CardTitle>
                <FileText className="w-5 h-5 text-primary-light" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.simuladosAtivos}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Em andamento
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <UserPlus className="w-6 h-6 text-primary" />
                  <span>Cadastrar Usuário</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <FolderPlus className="w-6 h-6 text-secondary" />
                  <span>Criar Turma</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <TrendingUp className="w-6 h-6 text-accent" />
                  <span>Ver Relatórios</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Novo professor cadastrado', time: 'Há 2 horas', user: 'Prof. João Silva' },
                  { action: 'Turma 3º A criada', time: 'Há 3 horas', user: 'Admin Sistema' },
                  { action: 'Simulado ENEM publicado', time: 'Há 5 horas', user: 'Prof. Maria Santos' },
                  { action: 'Backup realizado com sucesso', time: 'Há 1 dia', user: 'Sistema' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{item.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
