import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardAluno() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole="aluno" />
      
      <div className="flex-1 flex flex-col">
        <Header userName="João Santos" userPhoto="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
        
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Olá, João!</h1>
            <p className="text-muted-foreground">Acompanhe seu desempenho e simulados</p>
          </div>

          {/* Performance Card */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Meu Desempenho Comportamental</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Assiduidade', value: 90, emoji: '📅' },
                  { label: 'Participação', value: 85, emoji: '🙋' },
                  { label: 'Responsabilidade', value: 88, emoji: '📝' },
                  { label: 'Sociabilidade', value: 92, emoji: '🤝' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-2xl font-bold text-primary">{item.value}%</span>
                    </div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Simulados */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Simulados Disponíveis</CardTitle>
              <Button variant="outline" size="sm">Ver todos</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="border-secondary/30 hover-lift cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-secondary">Aguardando</Badge>
                          <Badge variant="outline">Matemática</Badge>
                        </div>
                        <h4 className="font-semibold mb-1">Simulado ENEM - Matemática e Português</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            180 minutos
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            45 questões
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Disponível até: 22/01/2025
                        </p>
                      </div>
                      <Button className="btn-primary-gradient">
                        Iniciar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-accent/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-accent text-accent">Em andamento</Badge>
                          <Badge variant="outline">Física</Badge>
                        </div>
                        <h4 className="font-semibold mb-1">Revisão - Cinemática</h4>
                        <Progress value={60} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">18 de 30 questões respondidas</p>
                      </div>
                      <Button variant="outline">
                        Continuar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-primary">Finalizado</Badge>
                          <Badge variant="outline">Português</Badge>
                        </div>
                        <h4 className="font-semibold mb-1">Interpretação de Textos</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <div>
                            <p className="text-2xl font-bold text-primary">8.5</p>
                            <p className="text-xs text-muted-foreground">Nota final</p>
                          </div>
                          <div className="h-10 w-px bg-border" />
                          <div>
                            <p className="text-2xl font-bold text-secondary">85%</p>
                            <p className="text-xs text-muted-foreground">Acertos</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">
                        Ver resultado
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Simulados Realizados
                </CardTitle>
                <CheckCircle className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-muted-foreground mt-1">Este semestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Média Geral
                </CardTitle>
                <TrendingUp className="w-5 h-5 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8.2</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-secondary">+0.5</span> vs. bimestre anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Posição na Turma
                </CardTitle>
                <span className="text-2xl">🏆</span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5º</div>
                <p className="text-xs text-muted-foreground mt-1">De 40 alunos</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
