import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Label } from '../components/ui/label';
import { ArrowLeft, Users, TrendingUp, CheckCircle, Info, User, Mail, Award } from 'lucide-react';
import { mockTurmas, mockAlunos, mockUsers } from '../lib/mockData';
import { UserRole } from '../types';

export default function DetalhesTurma() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const userRole = localStorage.getItem('userRole') as UserRole || 'admin';
  const userName = userRole === 'admin' ? 'Admin Sistema' : 'Prof. Maria Silva';

  const turma = mockTurmas.find(t => t.id === id);
  const professor = mockUsers.find(u => u.id === turma?.professorId);
  const alunos = mockAlunos.filter(a => turma?.alunosIds.includes(a.id));

  if (!turma) {
    return <div>Turma não encontrada</div>;
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 70) return 'bg-green-500';
    if (performance >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole={userRole} open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header
          userName={userName}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Link to="/turmas" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Turmas
            </Link>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{turma.nome}</h1>
              <p className="text-muted-foreground mt-1">Detalhes e desempenho dos alunos</p>
            </div>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-md"><Users className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alunos</p>
                    <p className="font-semibold">{turma.alunosIds.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-secondary/10 rounded-md"><User className="w-5 h-5 text-secondary" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Professor</p>
                    <p className="font-semibold">{professor?.nome || 'Não definido'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-accent/10 rounded-md"><Info className="w-5 h-5 text-accent" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Período/Ano</p>
                    <p className="font-semibold">{turma.periodo} / {turma.ano}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary-light/10 rounded-md"><Award className="w-5 h-5 text-primary-light" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Média da Turma</p>
                    <p className="font-semibold">8.2</p>
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
                    {alunos.map(aluno => {
                        const performance = Math.floor(Math.random() * 61) + 40; // Desempenho aleatório entre 40 e 100
                        return (
                            <Card key={aluno.id} className="hover-lift transition-transform duration-300">
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <Avatar className="w-20 h-20 mb-3 ring-2 ring-offset-2 ring-primary/50">
                                        <AvatarImage src={aluno.foto} alt={aluno.nome} />
                                        <AvatarFallback>{aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <p className="font-semibold text-sm leading-tight">{aluno.nome}</p>
                                    <p className="text-xs text-muted-foreground mb-3">{aluno.matricula}</p>

                                    <div className="w-full space-y-1 text-left mb-4">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor={`progress-${aluno.id}`} className="text-xs">Desempenho</Label>
                                            <span className={`text-xs font-bold ${getPerformanceColor(performance).replace('bg-', 'text-')}`}>{performance}%</span>
                                        </div>
                                        <Progress value={performance} id={`progress-${aluno.id}`} className="h-2 [&>div]:bg-green-500" />
                                    </div>

                                    <Button variant="outline" size="sm" className="w-full">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Ver Desempenho
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
}

