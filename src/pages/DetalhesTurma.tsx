import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, GraduationCap, Eye, Trash2, Edit } from 'lucide-react';

// Mock de dados para simular o carregamento de uma turma
const mockTurma = {
  id: '3a',
  nome: '3º Ano A - Ensino Médio',
  professor: 'Prof. João Silva',
  alunos: [
    { id: '101', nome: 'João da Silva', matricula: 'ALU101', email: 'joao.silva@escola.com', notaMedia: 8.5 },
    { id: '102', nome: 'Maria Souza', matricula: 'ALU102', email: 'maria.souza@escola.com', notaMedia: 7.9 },
    { id: '103', nome: 'Pedro Almeida', matricula: 'ALU103', email: 'pedro.a@escola.com', notaMedia: 9.1 },
    { id: '104', nome: 'Ana Costa', matricula: 'ALU104', email: 'ana.costa@escola.com', notaMedia: 7.2 },
    { id: '105', nome: 'Lucas Oliveira', matricula: 'ALU105', email: 'lucas.o@escola.com', notaMedia: 8.8 },
  ],
  status: 'Ativa',
};

export default function DetalhesTurma() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { id: turmaId } = useParams(); // Pega o ID da turma da URL

  // Simulação: em uma aplicação real, você usaria o turmaId para buscar os dados
  const turma = mockTurma;
  const userName = 'Prof. João Silva';

  const handleGoBack = () => {
    navigate('/turmas');
  };

  // NOVA FUNÇÃO: Navegar para a página de desempenho do aluno
  const handleVerDesempenho = (alunoId: string) => {
    navigate(`/desempenho/aluno/${alunoId}`);
  };

  const getNotaColor = (nota: number) => {
    if (nota >= 8.5) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (nota >= 7.0) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole="professor" open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header
          userName={userName}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">

            <Button variant="outline" size="sm" onClick={handleGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Turmas
            </Button>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Turma: {turma.nome}</h1>
                <p className="text-muted-foreground mt-1">Detalhes e gerenciamento da turma ID: {turmaId}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Turma
                </Button>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Arquivar
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center space-x-4">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <CardDescription>Total de Alunos</CardDescription>
                    <p className="text-xl font-bold">{turma.alunos.length}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <div>
                    <CardDescription>Professor Responsável</CardDescription>
                    <p className="text-xl font-bold">{turma.professor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Eye className="w-6 h-6 text-primary" />
                  <div>
                    <CardDescription>Status da Turma</CardDescription>
                    <Badge variant="secondary" className="text-lg py-1 px-2 mt-0.5">{turma.status}</Badge>
                  </div>
                </div>

              </CardContent>
            </Card>

            <Tabs defaultValue="alunos">
              <TabsList className="grid w-full grid-cols-2 lg:w-96">
                <TabsTrigger value="alunos">Alunos da Turma</TabsTrigger>
                <TabsTrigger value="estatisticas">Estatísticas Gerais</TabsTrigger>
              </TabsList>

              <TabsContent value="alunos" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lista de Alunos</CardTitle>
                    <CardDescription>Visão geral e acesso rápido ao desempenho individual.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Matrícula</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead className="text-center">Média Simulados</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {turma.alunos.map((aluno) => (
                            <TableRow key={aluno.id}>
                              <TableCell className="font-medium">{aluno.matricula}</TableCell>
                              <TableCell>{aluno.nome}</TableCell>
                              <TableCell>{aluno.email}</TableCell>
                              <TableCell className="text-center">
                                <Badge className={getNotaColor(aluno.notaMedia)} variant="secondary">
                                  {aluno.notaMedia.toFixed(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                {/* BOTÃO ATUALIZADO: Navega para a página de desempenho */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleVerDesempenho(aluno.id)}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver Desempenho
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="estatisticas" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas Consolidadas da Turma</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <p>Gráficos e KPIs da turma serão exibidos aqui.</p>
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
