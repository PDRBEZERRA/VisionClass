import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, FileText, Download, TrendingUp, Users } from 'lucide-react';
import { UserRole } from '@/types';

interface RelatoriosProps {
  userRole: UserRole;
}

export default function Relatorios({ userRole = 'professor' }: RelatoriosProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const userName = userRole === 'admin' ? 'Admin Sistema' : 'Prof. João Silva';

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Relatórios</h1>
                <p className="text-muted-foreground mt-1">Análises e estatísticas de desempenho</p>
              </div>
              
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label>Período</Label>
                    <Select defaultValue="mes">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semana">Última Semana</SelectItem>
                        <SelectItem value="mes">Último Mês</SelectItem>
                        <SelectItem value="trimestre">Último Trimestre</SelectItem>
                        <SelectItem value="ano">Último Ano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Turma</Label>
                    <Select defaultValue="todas">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas as Turmas</SelectItem>
                        <SelectItem value="3a">3º Ano A</SelectItem>
                        <SelectItem value="3b">3º Ano B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Data Inicial</Label>
                    <Input type="date" />
                  </div>
                  
                  <div>
                    <Label>Data Final</Label>
                    <Input type="date" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="comportamental">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
                <TabsTrigger value="comportamental">Comportamental</TabsTrigger>
                <TabsTrigger value="simulados">Simulados</TabsTrigger>
                <TabsTrigger value="consolidado">Consolidado</TabsTrigger>
              </TabsList>
              
              <TabsContent value="comportamental" className="space-y-4 mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.2/5.0</div>
                      <p className="text-xs text-muted-foreground">+0.3 vs mês anterior</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Assiduidade</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.5/5.0</div>
                      <p className="text-xs text-muted-foreground">Melhor critério</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Participação</CardTitle>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.0/5.0</div>
                      <p className="text-xs text-muted-foreground">Em alta</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avaliações</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">156</div>
                      <p className="text-xs text-muted-foreground">No período</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução dos Critérios Comportamentais</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <LineChart className="w-16 h-16 mx-auto mb-2" />
                      <p>Gráfico de evolução temporal será exibido aqui</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="simulados" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Desempenho em Simulados</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart className="w-16 h-16 mx-auto mb-2" />
                      <p>Estatísticas de simulados serão exibidas aqui</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="consolidado" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Relatório Consolidado</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-2" />
                      <p>Visão geral de todos os dados será exibida aqui</p>
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