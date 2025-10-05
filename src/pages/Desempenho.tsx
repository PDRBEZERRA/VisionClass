import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Award, Target, BarChart } from 'lucide-react';

export default function Desempenho() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole="aluno" open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          userName="João Santos"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Meu Desempenho</h1>
                <p className="text-muted-foreground mt-1">Acompanhe sua evolução e resultados</p>
              </div>
              
              <Select defaultValue="mes">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semana">Última Semana</SelectItem>
                  <SelectItem value="mes">Último Mês</SelectItem>
                  <SelectItem value="trimestre">Último Trimestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.5</div>
                  <p className="text-xs text-muted-foreground">+0.5 vs mês anterior</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Simulados Feitos</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Acerto</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">Em média</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Posição Turma</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3º</div>
                  <p className="text-xs text-muted-foreground">De 40 alunos</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Desempenho Comportamental</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-4xl mb-2">😊</div>
                    <p className="font-semibold">Assiduidade</p>
                    <p className="text-2xl font-bold text-primary">4.5/5</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-4xl mb-2">😃</div>
                    <p className="font-semibold">Participação</p>
                    <p className="text-2xl font-bold text-primary">4.0/5</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-4xl mb-2">😊</div>
                    <p className="font-semibold">Responsabilidade</p>
                    <p className="text-2xl font-bold text-primary">4.2/5</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-4xl mb-2">😃</div>
                    <p className="font-semibold">Sociabilidade</p>
                    <p className="text-2xl font-bold text-primary">4.8/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Disciplina</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { nome: 'Matemática', nota: 9.0, cor: 'bg-blue-500' },
                    { nome: 'Português', nota: 8.5, cor: 'bg-green-500' },
                    { nome: 'Física', nota: 7.8, cor: 'bg-yellow-500' },
                    { nome: 'Química', nota: 8.2, cor: 'bg-purple-500' },
                  ].map((disciplina) => (
                    <div key={disciplina.nome}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{disciplina.nome}</span>
                        <span className="text-sm font-bold">{disciplina.nota}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`${disciplina.cor} h-2 rounded-full transition-all`}
                          style={{ width: `${(disciplina.nota / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}