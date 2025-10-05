import { Link } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Users, FolderPlus, UserPlus, TrendingUp } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { mockTurmas, mockUsers } from '../lib/mockData';
import { useState } from 'react';

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chartData = [
    { month: 'Jan', users: 186 },
    { month: 'Fev', users: 305 },
    { month: 'Mar', users: 237 },
    { month: 'Abr', users: 273 },
    { month: 'Mai', users: 209 },
    { month: 'Jun', users: 214 },
  ];

  const chartConfig = {
    users: {
      label: 'Novos Usuários',
      color: 'hsl(var(--chart-1))',
    },
  };

  const totalUsers = mockUsers.length;
  const totalTurmas = mockTurmas.length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar userType="admin" open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header userType="admin" userName="Admin" onMenuClick={() => setSidebarOpen(prev => !prev)} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard do Administrador</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                  <p className="text-xs text-muted-foreground">+10% em relação ao mês passado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Turmas</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTurmas}</div>
                  <p className="text-xs text-muted-foreground">+5 novas turmas este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Simulados Realizados</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+150 em relação à semana passada</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">+5% em relação à semana passada</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Visão Geral de Novos Usuários</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="users" fill={chartConfig.users.color} radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <Button asChild variant="outline" className="h-20 sm:h-24 flex flex-col gap-2 text-sm sm:text-base">
                      <Link to="/usuarios/novo">
                        <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        <span className="text-xs sm:text-sm">Cadastrar Usuário</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-20 sm:h-24 flex flex-col gap-2 text-sm sm:text-base">
                      <Link to="/turmas/novo">
                        <FolderPlus className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                        <span className="text-xs sm:text-sm">Criar Turma</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-20 sm:h-24 flex flex-col gap-2 text-sm sm:text-base">
                      <Link to="/relatorios/admin">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                        <span className="text-xs sm:text-sm">Ver Relatórios</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;

