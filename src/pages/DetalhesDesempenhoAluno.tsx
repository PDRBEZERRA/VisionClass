import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/types';
import { ArrowLeft, Star, TrendingUp, BookOpen, Clock, AlertTriangle, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface DetalhesDesempenhoAlunoProps {
  userRole: UserRole;
}

// Mock Data para simular a informação de um aluno específico
const mockAlunoData = {
  id: 'alu101',
  nome: 'João da Silva',
  matricula: '20230101',
  turma: '3º Ano A - Ensino Médio',
  avatarInitials: 'JS',
  notas: {
    mediaGeral: 8.5,
    mediaComportamental: 4.2,
    ultimaNotaSimulado: 7.8,
  },
  comportamento: {
    assiduidade: 'Excelente (4.8/5)',
    participacao: 'Boa (4.0/5)',
    pontosMelhoria: ['Organização de material', 'Entrega de tarefas'],
  },
  simulados: {
    totalRealizados: 12,
    acertosMedios: '75%',
    areasCriticas: ['Matemática Básica', 'Interpretação de Texto'],
  }
};

// Componente para exibir um Card de Métrica
const MetricCard = ({ title, value, change, icon: Icon, colorClass = 'text-primary' }: any) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${colorClass}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);


export default function DetalhesDesempenhoAluno({ userRole = 'professor' }: DetalhesDesempenhoAlunoProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { alunoId } = useParams(); // Pega o ID da rota

  // Usei o mockData para simular o carregamento do aluno
  const aluno = mockAlunoData;
  const userName = userRole === 'admin' ? 'Admin Sistema' : 'Prof. João Silva';

  const handleGoBack = () => {
    navigate(-1);
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

            <Button variant="outline" size="sm" onClick={handleGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Lista de Alunos
            </Button>

            {/* Informações Principais do Aluno */}
            <Card className="p-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 text-xl">
                        <AvatarFallback>{aluno.avatarInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold">{aluno.nome}</h1>
                        <p className="text-lg text-muted-foreground">{aluno.turma} | Matrícula: {aluno.matricula}</p>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <MetricCard
                        title="Média Geral (Simulados)"
                        value={`${aluno.notas.mediaGeral.toFixed(1)}`}
                        change="+0.5 pontos este mês"
                        icon={Star}
                    />
                    <MetricCard
                        title="Nota Comportamental"
                        value={`${aluno.notas.mediaComportamental.toFixed(1)}/5.0`}
                        change="Manutenção"
                        icon={TrendingUp}
                        colorClass="text-green-500"
                    />
                     <MetricCard
                        title="Simulados Realizados"
                        value={`${aluno.simulados.totalRealizados}`}
                        change="Total no ano letivo"
                        icon={BookOpen}
                        colorClass="text-indigo-500"
                    />
                    <MetricCard
                        title="Média de Faltas"
                        value="1.5 Faltas/Mês"
                        change="Acima da média da turma"
                        icon={Clock}
                        colorClass="text-red-500"
                    />
                </div>
            </Card>

            {/* Conteúdo Detalhado por Abas */}
            <Tabs defaultValue="simulados">
              <TabsList className="grid w-full grid-cols-2 lg:w-96">
                <TabsTrigger value="simulados">Desempenho em Simulados</TabsTrigger>
                <TabsTrigger value="comportamento">Aspectos Comportamentais</TabsTrigger>
              </TabsList>

              {/* Tab: Simulados */}
              <TabsContent value="simulados" className="space-y-6 mt-6">
                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Evolução da Nota nos Últimos Simulados</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                                <Users className="w-16 h-16 mx-auto mb-2" />
                                <p>Gráfico de Linha de Desempenho (Média vs Aluno)</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Áreas de Maior Dificuldade</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {aluno.simulados.areasCriticas.map((area, index) => (
                                    <li key={index} className="flex items-center text-sm font-medium text-red-600 dark:text-red-400">
                                        <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                                        {area}
                                    </li>
                                ))}
                            </ul>
                            <CardDescription className="mt-4">
                                Média de acertos em todas as disciplinas: <strong className="text-primary">{aluno.simulados.acertosMedios}</strong>
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
              </TabsContent>

              {/* Tab: Comportamento */}
              <TabsContent value="comportamento" className="space-y-6 mt-6">
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Avaliação dos Critérios Comportamentais</CardTitle>
                            <CardDescription>Notas médias atribuídas pelos professores no último trimestre.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center text-lg font-semibold border-b pb-2">
                                <span>Assiduidade:</span> <span className="text-green-600">{aluno.comportamento.assiduidade}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-semibold border-b pb-2">
                                <span>Participação:</span> <span className="text-yellow-600">{aluno.comportamento.participacao}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Organização:</span> <span className="text-gray-600">Regular (3.2/5)</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle>Pontos de Melhoria e Observações</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ul className="space-y-2">
                                {aluno.comportamento.pontosMelhoria.map((ponto, index) => (
                                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                                        <AlertTriangle className="w-4 h-4 mr-2 mt-1 text-orange-500 flex-shrink-0" />
                                        {ponto}
                                    </li>
                                ))}
                            </ul>
                            <CardDescription className="mt-4 border-t pt-4">
                                Última observação (Prof. História): Necessita de maior atenção nos debates em grupo.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
