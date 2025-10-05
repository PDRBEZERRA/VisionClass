import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Download, FileText, BarChart, Users, CheckCircle } from 'lucide-react';
import { UserRole } from '@/types';

interface ExportarRelatorioProps {
  userRole: UserRole;
}

// Componente auxiliar para os cards de opções de exportação
const ExportarRelatorioCard = ({ title, description, icon: Icon, format, onExport }: any) => (
  <Card className="hover-lift flex flex-col justify-between">
    <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
      {/* Usando uma div para o ícone para um melhor controle visual */}
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-primary" />
        <CardTitle className="text-lg m-0">{title}</CardTitle>
      </div>
      <Button variant="default" size="sm" className="btn-primary-gradient" onClick={() => onExport(format)}>
        <Download className="w-4 h-4 mr-2" />
        Exportar
      </Button>
    </CardHeader>
    <CardContent className="pt-0 p-4">
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

export default function ExportarRelatorio({ userRole = 'professor' }: ExportarRelatorioProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const userName = userRole === 'admin' ? 'Admin Sistema' : 'Prof. João Silva';

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleExport = (format: string) => {
    // Simulação da lógica de exportação. Em um app real, o back-end faria o processamento.
    console.log(`Exportando relatório como ${format}...`);
    // Usando alert() como substituto temporário para um Toast ou Modal de progresso/sucesso.
    alert(`A solicitação de exportação para ${format} foi enviada! O arquivo será gerado em breve.`);
  };

  const isProfessor = userRole !== 'aluno';

  const [periodo, setPeriodo] = useState('mes');
  const [turma, setTurma] = useState('todas');

  const exportOptions = [
    {
        title: 'Relatório PDF',
        description: 'Ideal para impressão, visualização e compartilhamento em alta fidelidade.',
        icon: FileText,
        format: 'PDF'
    },
    {
        title: 'Dados Brutos CSV',
        description: 'Exportação em formato de texto para importação em outros sistemas.',
        icon: Users,
        format: 'CSV'
    },
    {
        title: 'Planilha Excel',
        description: 'Dados formatados em colunas para análise avançada e edição no Excel.',
        icon: BarChart,
        format: 'XLSX'
    },
  ];

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
              Voltar para Relatórios
            </Button>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Exportar Relatório</h1>
                <p className="text-muted-foreground mt-1">Selecione o formato e configure o escopo da exportação.</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>1. Escopo da Exportação</CardTitle>
                <CardDescription>Defina quais dados serão incluídos no arquivo exportado.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Filtro de Período */}
                  <div>
                    <Label htmlFor="export-periodo">Período</Label>
                    <Select value={periodo} onValueChange={setPeriodo}>
                      <SelectTrigger id="export-periodo" className="h-10">
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

                  {/* Filtro de Turma */}
                  {isProfessor && (
                    <div>
                      <Label htmlFor="export-turma">Turma</Label>
                      <Select value={turma} onValueChange={setTurma}>
                        <SelectTrigger id="export-turma" className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todas">Todas as Turmas</SelectItem>
                          <SelectItem value="3a">3º Ano A - Ensino Médio</SelectItem>
                          <SelectItem value="2b">2º Ano B - Ensino Médio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Data Inicial */}
                  <div>
                    <Label htmlFor="data-inicial">Data Inicial</Label>
                    <Input id="data-inicial" type="date" className="h-10" />
                  </div>

                  {/* Data Final */}
                  <div>
                    <Label htmlFor="data-final">Data Final</Label>
                    <Input id="data-final" type="date" className="h-10" />
                  </div>

                  {/* Tipo de Relatório (Apenas se for professor ou admin) */}
                  {isProfessor && (
                    <div className="sm:col-span-2">
                        <Label htmlFor="tipo-relatorio">Conteúdo do Relatório</Label>
                        <Select defaultValue="consolidado">
                          <SelectTrigger id="tipo-relatorio" className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consolidado">Consolidado (Comportamental + Simulados)</SelectItem>
                            <SelectItem value="comportamental">Apenas Comportamental</SelectItem>
                            <SelectItem value="simulados">Apenas Desempenho em Simulados</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                  )}

                  {/* Botão de Aplicar Filtros/Preparo */}
                  <div className="flex items-end lg:col-span-1 sm:col-span-1">
                    <Button variant="secondary" className="w-full h-10">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Preparar Dados
                    </Button>
                  </div>

                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Formato de Saída</CardTitle>
                <CardDescription>Escolha o formato ideal para o seu uso.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {exportOptions.map((option) => (
                  <ExportarRelatorioCard
                    key={option.format}
                    title={option.title}
                    description={option.description}
                    icon={option.icon}
                    format={option.format}
                    onExport={handleExport}
                  />
                ))}
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
}
