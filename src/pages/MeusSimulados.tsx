import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar, FileText, Play, CheckCircle } from 'lucide-react';
import { simulados } from '@/lib/mockData';

export default function MeusSimulados() {
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
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Meus Simulados</h1>
              <p className="text-muted-foreground mt-1">Acompanhe seus simulados e avaliações</p>
            </div>
            
            <Tabs defaultValue="disponiveis">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
                <TabsTrigger value="andamento">Em Andamento</TabsTrigger>
                <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="disponiveis" className="space-y-4 mt-6">
                {simulados.map((simulado) => (
                  <Card key={simulado.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{simulado.nome}</CardTitle>
                          <CardDescription className="mt-2">
                            <Badge>Disponível</Badge>
                          </CardDescription>
                        </div>
                        <Button>
                          <Play className="w-4 h-4 mr-2" />
                          Iniciar Simulado
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span>{simulado.questoesIds.length} questões</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{simulado.duracao} minutos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>Até {new Date(simulado.dataFim).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="andamento" className="mt-6">
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum simulado em andamento</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="concluidos" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg">Simulado ENEM - Matemática</CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-2">
                          <Badge variant="outline">Concluído</Badge>
                          <span className="text-xs">Realizado em 10/01/2025</span>
                        </CardDescription>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-3xl font-bold text-primary">8.5</div>
                        <p className="text-sm text-muted-foreground">Sua nota</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Acertos</p>
                        <p className="font-semibold">17/20</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tempo</p>
                        <p className="font-semibold">145 min</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Posição</p>
                        <p className="font-semibold">3º/40</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" className="w-full">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Ver Gabarito
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}