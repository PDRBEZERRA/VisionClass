import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, Calendar, BookOpen } from 'lucide-react';
import { mockTurmas } from '../lib/mockData';
import { UserRole } from '../types';
import { Progress } from '../components/ui/progress';

export default function Turmas() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole') as UserRole || 'professor';
  const userName = userRole === 'admin' ? 'Admin Sistema' : 'Prof. João Silva';

  const getPerformanceColor = (value: number | undefined) => {
    if (value === undefined) return "bg-primary";
    if (value < 60) return "bg-destructive"; // Vermelho
    if (value < 80) return "bg-accent"; // Laranja
    return "bg-secondary"; // Verde
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole={userRole} open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header userName={userName} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {userRole === 'admin' ? 'Todas as Turmas' : 'Minhas Turmas'}
            </h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockTurmas.map((turma) => (
                <Card key={turma.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{turma.nome}</CardTitle>
                      <Badge variant="outline">{turma.periodo}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between space-y-4 pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{turma.alunosIds.length} alunos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{turma.ano}</span>
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-sm font-medium">Desempenho da Turma</p>
                          <span className="text-sm font-bold text-primary">{turma.desempenho || 0}%</span>
                        </div>
                        <Progress value={turma.desempenho || 0} className="h-2" indicatorClassName={getPerformanceColor(turma.desempenho)} />
                      </div>
                    </div>

                    <Button className="w-full" onClick={() => navigate(`/turma/${turma.id}`)}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ver Turma
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

