import { useState, useMemo } from 'react'; // Adicionado useMemo
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Download, FileText, BarChart, Users, CheckCircle, Search, UserCircle } from 'lucide-react'; // Adicionado Search e UserCircle
import { UserRole } from '@/types';

interface ExportarRelatorioProps {
  userRole: UserRole;
}

// Dados de Alunos mockados para a busca
const mockAlunos = [
    { id: '1', nome: 'Todos os Alunos', matricula: '0000', default: true },
    { id: '101', nome: 'João da Silva', matricula: 'ALU101' },
    { id: '102', nome: 'Maria Souza', matricula: 'ALU102' },
    { id: '103', nome: 'Pedro Almeida', matricula: 'ALU103' },
    { id: '104', nome: 'Ana Costa', matricula: 'ALU104' },
    { id: '105', nome: 'Lucas Oliveira', matricula: 'ALU105' },
    { id: '106', nome: 'Mariana Santos', matricula: 'ALU106' },
];

// Componente auxiliar para os cards de opções de exportação
const ExportarRelatorioCard = ({ title, description, icon: Icon, format, onExport }: any) => (
  <Card className="hover-lift flex flex-col justify-between">
    <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
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
    alert(`A solicitação de exportação para ${format} foi enviada! O arquivo será gerado em breve.`);
  };

  const isProfessor = userRole !== 'aluno';

  const [periodo, setPeriodo] = useState('mes');
  const [turma, setTurma] = useState('todas');
  const [alunoSelecionado, setAlunoSelecionado] = useState(mockAlunos[0]); // Padrão: Todos os Alunos
  const [termoBusca, setTermoBusca] = useState('');
  const [isSearching, setIsSearching] = useState(false); // Estado para controlar o Popover (janela de busca)

  // Lógica de filtro para a busca de alunos
  const alunosFiltrados = useMemo(() => {
    if (!termoBusca) {
        // Exibe uma pequena lista de sugestões ou todos
        return mockAlunos.slice(0, 5);
    }

    const busca = termoBusca.toLowerCase();
    return mockAlunos.filter(a =>
        a.nome.toLowerCase().includes(busca) && !a.default
    ).slice(0, 10); // Limita os resultados para melhor UX
  }, [termoBusca]);

  const handleSelectAluno = (aluno: typeof mockAlunos[0]) => {
    setAlunoSelecionado(aluno);
    setTermoBusca('');
    setIsSearching(false);
  };

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
                  {/* Filtro de Período - SEMPRE PRESENTE */}
                  <div className="col-span-1">
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

                  {/* Filtro de Turma - APENAS PROFESSOR/ADMIN */}
                  {isProfessor && (
                    <div className="col-span-1">
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

                  {/* NOVO FILTRO: Aluno Específico com busca (Input + Popover de sugestões) */}
                  {isProfessor && (
                    <div className="col-span-1 relative">
                        <Label htmlFor="export-aluno-busca">Aluno Específico</Label>

                        {/* Campo de Input que simula a busca */}
                        <div className="relative">
                            <Input
                                id="export-aluno-busca"
                                placeholder="Buscar aluno por nome ou matrícula..."
                                className="h-10 pl-10"
                                value={alunoSelecionado.default ? '' : alunoSelecionado.nome}
                                onChange={(e) => {
                                    setTermoBusca(e.target.value);
                                    setAlunoSelecionado(mockAlunos[0]); // Desseleciona ao digitar
                                    setIsSearching(true);
                                }}
                                onFocus={() => setIsSearching(true)}
                                onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>

                        {/* Exibe o aluno selecionado ou "Todos os Alunos" */}
                        <div
                            className="mt-1 flex items-center gap-2 text-sm text-primary/80 font-medium cursor-pointer hover:underline w-fit"
                            onClick={() => {
                                // Se um aluno específico estiver selecionado, volta para "Todos os Alunos"
                                if (!alunoSelecionado.default) {
                                    setAlunoSelecionado(mockAlunos[0]);
                                    setTermoBusca('');
                                }
                            }}
                        >
                            <UserCircle className="w-4 h-4 text-primary" />
                            {alunoSelecionado.nome}
                        </div>

                        {/* Sugestões de Busca (Simulação de Popover/Dropdown) */}
                        {isSearching && termoBusca.length > 1 && (
                            <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
                                <CardContent className="p-1">
                                    {alunosFiltrados.length > 0 ? (
                                        alunosFiltrados.map((aluno) => (
                                            <div
                                                key={aluno.id}
                                                className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                                                onMouseDown={() => handleSelectAluno(aluno)} // Usar onMouseDown para evitar que onBlur feche antes do click
                                            >
                                                <div>
                                                    <p className="text-sm font-medium">{aluno.nome}</p>
                                                    <p className="text-xs text-muted-foreground">{aluno.matricula}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="p-2 text-sm text-muted-foreground text-center">Nenhum aluno encontrado.</p>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Opção para reverter para "Todos os Alunos" se a busca estiver vazia */}
                        {isSearching && termoBusca.length <= 1 && (
                            <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
                                <CardContent className="p-1">
                                    <div
                                        className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer font-medium text-primary"
                                        onMouseDown={() => handleSelectAluno(mockAlunos[0])}
                                    >
                                        <UserCircle className="w-4 h-4 mr-2" />
                                        {mockAlunos[0].nome}
                                    </div>
                                    <p className="p-2 text-sm text-muted-foreground">Continue digitando para buscar...</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                  )}

                  {/* Data Inicial */}
                  <div className="col-span-1">
                    <Label htmlFor="data-inicial">Data Inicial</Label>
                    <Input id="data-inicial" type="date" className="h-10" />
                  </div>

                  {/* Data Final */}
                  <div className="col-span-1">
                    <Label htmlFor="data-final">Data Final</Label>
                    <Input id="data-final" type="date" className="h-10" />
                  </div>

                  {/* Tipo de Relatório (Ajustado para ocupar 2 colunas se necessário, e 1 coluna em telas menores) */}
                  {isProfessor && (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-2">
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
                  <div className="flex items-end col-span-1 sm:col-span-2 lg:col-span-1">
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
