import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Printer, Filter } from 'lucide-react';
import { mockAlunos, mockTurmas } from '@/lib/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

const emojiScale = ['😢', '😐', '😊', '😃', '🤩'];
const criterios = ['Assiduidade', 'Participação', 'Responsabilidade', 'Sociabilidade'];

export default function Carometro() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [turmaId, setTurmaId] = useState('1');
  const [selectedAluno, setSelectedAluno] = useState<typeof mockAlunos[0] | null>(null);
  const [avaliacoes, setAvaliacoes] = useState({
    assiduidade: 3,
    participacao: 3,
    responsabilidade: 3,
    sociabilidade: 3,
  });
  const [observacoes, setObservacoes] = useState('');
  const isMobile = useIsMobile();

  const alunos = mockAlunos.filter(a => a.turmaId === turmaId);
  const turma = mockTurmas.find(t => t.id === turmaId);

  const handleSaveAvaliacao = () => {
    console.log('Salvando avaliação:', { aluno: selectedAluno, avaliacoes, observacoes });
    setSelectedAluno(null);
    setObservacoes('');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole="professor" open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header userName="Prof. Maria Silva" onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Carômetro</h1>
              <p className="text-sm text-muted-foreground">Avaliação comportamental da turma</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Select value={turmaId} onValueChange={setTurmaId}>
                <SelectTrigger className="w-full sm:w-[200px] md:w-[280px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {mockTurmas.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Filter className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Filtros</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Printer className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Imprimir</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">{turma?.nome}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {alunos.length} alunos • {turma?.periodo} • {turma?.ano}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs sm:text-sm w-fit">
                  Data: {new Date().toLocaleDateString('pt-BR')}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4">
                {alunos.map((aluno) => (
                  <button
                    key={aluno.id}
                    onClick={() => setSelectedAluno(aluno)}
                    className="group flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-all hover-lift"
                  >
                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ring-2 ring-transparent group-hover:ring-primary transition-all">
                      <AvatarImage src={aluno.foto} alt={aluno.nome} />
                      <AvatarFallback className="text-xs sm:text-sm">{aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="text-center w-full">
                      <p className="text-xs sm:text-sm font-medium leading-tight line-clamp-2">{aluno.nome}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{aluno.matricula}</p>
                    </div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary" title="Presente" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modal de Avaliação */}
      <Dialog open={!!selectedAluno} onOpenChange={(open) => !open && setSelectedAluno(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Avaliação Individual</DialogTitle>
            <DialogDescription>
              Avalie o desempenho comportamental do aluno
            </DialogDescription>
          </DialogHeader>

          {selectedAluno && (
            <Tabs defaultValue="avaliar" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="avaliar">Avaliar Hoje</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="avaliar" className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/30 rounded-lg">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 ring-2 ring-primary shrink-0">
                    <AvatarImage src={selectedAluno.foto} />
                    <AvatarFallback>{selectedAluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold">{selectedAluno.nome}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Matrícula: {selectedAluno.matricula} • {turma?.nome}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {criterios.map((criterio, idx) => {
                    const key = criterio.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') as keyof typeof avaliacoes;
                    return (
                      <div key={criterio} className="space-y-2 sm:space-y-3">
                        <Label className="text-sm sm:text-base font-semibold">{criterio}</Label>
                        <div className="flex justify-between items-center gap-1 sm:gap-2">
                          {emojiScale.map((emoji, emojiIdx) => (
                            <button
                              key={emojiIdx}
                              type="button"
                              onClick={() => setAvaliacoes(prev => ({ ...prev, [key]: emojiIdx + 1 }))}
                              className={`flex-1 text-2xl sm:text-3xl md:text-4xl p-2 sm:p-3 md:p-4 rounded-lg transition-all ${
                                avaliacoes[key] === emojiIdx + 1
                                  ? 'bg-primary/20 scale-110 ring-2 ring-primary'
                                  : 'hover:bg-muted/50 hover:scale-105'
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Observações</Label>
                    <Textarea
                      placeholder="Adicione observações sobre o comportamento do aluno..."
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      rows={isMobile ? 3 : 4}
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedAluno(null)} className="w-full sm:w-auto">
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveAvaliacao} className="btn-primary-gradient w-full sm:w-auto">
                    Salvar Avaliação
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="historico" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Histórico de avaliações dos últimos 30 dias
                </p>
                <div className="space-y-3">
                  {[
                    { data: '10/01/2025', nota: 4.5, obs: 'Participação excepcional' },
                    { data: '03/01/2025', nota: 4.0, obs: 'Bom comportamento' },
                    { data: '20/12/2024', nota: 3.8, obs: '' },
                  ].map((item, i) => (
                    <Card key={i} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{item.data}</p>
                          <p className="text-sm text-muted-foreground">{item.obs || 'Sem observações'}</p>
                        </div>
                        <Badge variant="secondary">Média: {item.nota}</Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
