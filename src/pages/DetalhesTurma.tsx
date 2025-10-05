import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { ArrowLeft, Users, User, Calendar, BarChart2 } from 'lucide-react';
import { mockTurmas, mockAlunos, mockUsers } from '../lib/mockData';
import { UserRole, Turma, Aluno as AlunoType } from '../types';

export default function DetalhesTurma() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const turma = mockTurmas.find(t => t.id === id) as Turma;
  const alunos = mockAlunos.filter(a => a.turmaId === id);
  const professor = mockUsers.find(u => u.id === turma?.professorId);

  const userRole: UserRole = localStorage.getItem('userRole') as UserRole || 'admin';
  const userName = userRole === 'admin' ? 'Admin Sistema' : professor?.nome || 'Professor';

  const getPerformanceColor = (value: number | undefined) => {
    if (value === undefined) return "bg-primary";
    if (value < 60) return "bg-destructive"; // Vermelho
    if (value < 80) return "bg-accent"; // Laranja
    return "bg-secondary"; // Verde
  };

  if (!turma) {
    return <div>Turma não encontrada</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole={userRole} open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header userName={userName} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Button variant="outline" size="sm" onClick={() => navigate('/turmas')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Turmas
            </Button>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{turma.nome}</h1>
              <p className="text-muted-foreground mt-1">Detalhes e desempenho dos alunos</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Alunos</p>
                    <p className="font-bold">{turma.alunosIds.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <User className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Professor</p>
                    <p className="font-bold">{professor?.nome}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Período/Ano</p>
                    <p className="font-bold">{turma.periodo} / {turma.ano}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <BarChart2 className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Média da Turma</p>
                    <p className="font-bold">{turma.desempenho || 0}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alunos da Turma</CardTitle>
                <CardDescription>Visualize o desempenho individual de cada aluno.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {alunos.map((aluno: AlunoType) => (
                  <Card key={aluno.id} className="text-center p-4 hover:shadow-md transition-shadow">
                    <Avatar className="w-20 h-20 mx-auto mb-3 ring-2 ring-primary/20">
                      <AvatarImage src={aluno.foto} />
                      <AvatarFallback>{aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{aluno.nome}</p>
                    <p className="text-xs text-muted-foreground mb-3">{aluno.matricula}</p>

                    <div className="space-y-2 text-left">
                      <div className="mb-2 flex items-center justify-between">
                          <p className="text-sm font-medium">Desempenho</p>
                          <span className="text-sm font-bold text-primary">{aluno.desempenho || 0}%</span>
                      </div>
                      <Progress value={aluno.desempenho || 0} className="h-2" indicatorClassName={getPerformanceColor(aluno.desempenho)} />
                    </div>

                    <Button variant="outline" size="sm" className="w-full mt-4">
                        Ver Desempenho
                    </Button>
                  </Card>
                ))}
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
}

