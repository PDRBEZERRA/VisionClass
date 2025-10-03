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

const emojiScale = ['😢', '😐', '😊', '😃', '🤩'];
const criterios = ['Assiduidade', 'Participação', 'Responsabilidade', 'Sociabilidade'];

export default function Carometro() {
  const [turmaId, setTurmaId] = useState('1');
  const [selectedAluno, setSelectedAluno] = useState<typeof mockAlunos[0] | null>(null);
  const [avaliacoes, setAvaliacoes] = useState({
    assiduidade: 3,
    participacao: 3,
    responsabilidade: 3,
    sociabilidade: 3,
  });
  const [observacoes, setObservacoes] = useState('');

  const alunos = mockAlunos.filter(a => a.turmaId === turmaId);
  const turma = mockTurmas.find(t => t.id === turmaId);

  const handleSaveAvaliacao = () => {
    console.log('Salvando avaliação:', { aluno: selectedAluno, avaliacoes, observacoes });
    setSelectedAluno(null);
    setObservacoes('');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole="professor" />
      
      <div className="flex-1 flex flex-col">
        <Header userName="Prof. Maria Silva" />
        
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Carômetro</h1>
              <p className="text-muted-foreground">Avaliação comportamental da turma</p>
            </div>
            <div className="flex gap-3">
              <Select value={turmaId} onValueChange={setTurmaId}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {mockTurmas.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{turma?.nome}</h3>
                  <p className="text-sm text-muted-foreground">
                    {alunos.length} alunos • {turma?.periodo} • {turma?.ano}
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  Data: {new Date().toLocaleDateString('pt-BR')}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
                {alunos.map((aluno) => (
                  <button
                    key={aluno.id}
                    onClick={() => setSelectedAluno(aluno)}
                    className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-all hover-lift"
                  >
                    <Avatar className="w-24 h-24 ring-2 ring-transparent group-hover:ring-primary transition-all">
                      <AvatarImage src={aluno.foto} alt={aluno.nome} />
                      <AvatarFallback>{aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="text-sm font-medium leading-tight">{aluno.nome}</p>
                      <p className="text-xs text-muted-foreground">{aluno.matricula}</p>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-secondary" title="Presente" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modal de Avaliação */}
      <Dialog open={!!selectedAluno} onOpenChange={(open) => !open && setSelectedAluno(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

              <TabsContent value="avaliar" className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <Avatar className="w-20 h-20 ring-2 ring-primary">
                    <AvatarImage src={selectedAluno.foto} />
                    <AvatarFallback>{selectedAluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedAluno.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      Matrícula: {selectedAluno.matricula} • {turma?.nome}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {criterios.map((criterio, idx) => {
                    const key = criterio.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') as keyof typeof avaliacoes;
                    return (
                      <div key={criterio} className="space-y-3">
                        <Label className="text-base font-semibold">{criterio}</Label>
                        <div className="flex justify-between items-center gap-2">
                          {emojiScale.map((emoji, emojiIdx) => (
                            <button
                              key={emojiIdx}
                              type="button"
                              onClick={() => setAvaliacoes(prev => ({ ...prev, [key]: emojiIdx + 1 }))}
                              className={`flex-1 text-4xl p-4 rounded-lg transition-all ${
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
                    <Label>Observações</Label>
                    <Textarea
                      placeholder="Adicione observações sobre o comportamento do aluno..."
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedAluno(null)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveAvaliacao} className="btn-primary-gradient">
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
