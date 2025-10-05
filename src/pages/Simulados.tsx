import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar, Clock, Users, FileText, BarChart } from 'lucide-react';
import { simulados } from '@/lib/mockData';

export default function Simulados() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);

  const getStatusBadge = (status: string) => {
    const variants = {
      'rascunho': 'secondary',
      'publicado': 'default',
      'finalizado': 'outline'
    } as const;
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole="professor" open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          userName="Prof. João Silva" 
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Simulados</h1>
                <p className="text-muted-foreground mt-1">Crie e gerencie simulados para suas turmas</p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Simulado
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Simulado</DialogTitle>
                  </DialogHeader>
                  
                  <Tabs value={`step${step}`} onValueChange={(v) => setStep(Number(v.replace('step', '')))}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="step1">1. Configuração</TabsTrigger>
                      <TabsTrigger value="step2">2. Questões</TabsTrigger>
                      <TabsTrigger value="step3">3. Revisão</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="step1" className="space-y-4">
                      <div>
                        <Label>Nome do Simulado</Label>
                        <Input placeholder="Ex: Simulado ENEM - 1ª Aplicação" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Turma(s) Destinatária(s)</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3a">3º Ano A</SelectItem>
                              <SelectItem value="3b">3º Ano B</SelectItem>
                              <SelectItem value="todas">Todas as Turmas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Duração (minutos)</Label>
                          <Input type="number" placeholder="180" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Data de Disponibilização</Label>
                          <Input type="date" />
                        </div>
                        
                        <div>
                          <Label>Data de Encerramento</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      
                      <Button onClick={() => setStep(2)} className="w-full">
                        Próximo: Selecionar Questões
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="step2" className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label>Disciplina</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Todas" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todas">Todas</SelectItem>
                              <SelectItem value="matematica">Matemática</SelectItem>
                              <SelectItem value="portugues">Português</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Dificuldade</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Todas" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todas">Todas</SelectItem>
                              <SelectItem value="facil">Fácil</SelectItem>
                              <SelectItem value="medio">Médio</SelectItem>
                              <SelectItem value="dificil">Difícil</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Quantidade</Label>
                          <Input type="number" placeholder="20" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Modo de Seleção</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">Automática</Button>
                          <Button variant="outline" className="flex-1">Manual</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-2">Questões selecionadas: 0</p>
                        <div className="text-sm text-center py-8 text-muted-foreground">
                          Configure os filtros e selecione as questões
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                          Voltar
                        </Button>
                        <Button onClick={() => setStep(3)} className="flex-1">
                          Próximo: Revisar
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="step3" className="space-y-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold">Resumo da Configuração</h3>
                        <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                          <p><span className="font-medium">Nome:</span> Simulado ENEM - 1ª Aplicação</p>
                          <p><span className="font-medium">Turmas:</span> 3º Ano A, 3º Ano B</p>
                          <p><span className="font-medium">Questões:</span> 20 questões</p>
                          <p><span className="font-medium">Duração:</span> 180 minutos</p>
                          <p><span className="font-medium">Período:</span> 15/04/2025 a 20/04/2025</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                          Voltar
                        </Button>
                        <Button className="flex-1">
                          Publicar Simulado
                        </Button>
                        <Button variant="secondary" className="flex-1">
                          Salvar Rascunho
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
            
            <Tabs defaultValue="ativos">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ativos">Ativos</TabsTrigger>
                <TabsTrigger value="rascunhos">Rascunhos</TabsTrigger>
                <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ativos" className="space-y-4 mt-6">
                {simulados.filter(s => s.status === 'publicado').map((simulado) => (
                  <Card key={simulado.id}>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle>{simulado.nome}</CardTitle>
                          <CardDescription className="mt-2">
                            {getStatusBadge(simulado.status)}
                          </CardDescription>
                        </div>
                        <Button variant="outline">
                          <BarChart className="w-4 h-4 mr-2" />
                          Ver Resultados
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span>{simulado.questoesIds.length} questões</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{simulado.duracao} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{simulado.turmasIds.length} turmas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(simulado.dataFim).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="rascunhos" className="mt-6">
                <p className="text-center text-muted-foreground py-8">
                  Nenhum rascunho encontrado
                </p>
              </TabsContent>
              
              <TabsContent value="finalizados" className="mt-6">
                <p className="text-center text-muted-foreground py-8">
                  Nenhum simulado finalizado
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}