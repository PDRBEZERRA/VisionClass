import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, FileText, Plus, AlertCircle } from 'lucide-react';
import { mockTurmas } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

export default function DashboardProfessor() {
  const navigate = useNavigate();
  const turmas = mockTurmas;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole="professor" />
      
      <div className="flex-1 flex flex-col">
        <Header userName="Prof. Maria Silva" />
        
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Bem-vinda, Professora!</h1>
              <p className="text-muted-foreground">Gerencie suas turmas e atividades</p>
            </div>
          </div>

          {/* Notifications */}
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Pendências</p>
                  <p className="text-sm text-muted-foreground">
                    Você tem 3 simulados pendentes de correção e 2 turmas sem avaliação esta semana
                  </p>
                </div>
                <Button size="sm" variant="outline">Ver tudo</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate('/carometro')}
              className="h-32 flex flex-col gap-3 bg-gradient-primary hover:opacity-90"
            >
              <Users className="w-8 h-8" />
              <div className="text-center">
                <p className="font-semibold">Avaliar Turma</p>
                <p className="text-xs opacity-90">Carômetro comportamental</p>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/questoes')}
              variant="outline"
              className="h-32 flex flex-col gap-3 border-secondary text-secondary hover:bg-secondary/10"
            >
              <BookOpen className="w-8 h-8" />
              <div className="text-center">
                <p className="font-semibold">Criar Questão</p>
                <p className="text-xs opacity-70">Banco de questões</p>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/simulados')}
              variant="outline"
              className="h-32 flex flex-col gap-3 border-accent text-accent hover:bg-accent/10"
            >
              <FileText className="w-8 h-8" />
              <div className="text-center">
                <p className="font-semibold">Gerar Simulado</p>
                <p className="text-xs opacity-70">Criar nova avaliação</p>
              </div>
            </Button>
          </div>

          {/* Minhas Turmas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Minhas Turmas</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nova Turma
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {turmas.map((turma) => (
                  <Card key={turma.id} className="hover-lift cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{turma.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {turma.periodo} • {turma.ano}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {turma.alunosIds.length} alunos
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => navigate('/carometro')}>
                          Carômetro
                        </Button>
                        <Button size="sm" variant="outline">
                          Relatório
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Questões Cadastradas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +8 esta semana
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Simulados Criados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground mt-1">
                  5 ativos no momento
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avaliações Feitas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.284</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Este ano letivo
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
