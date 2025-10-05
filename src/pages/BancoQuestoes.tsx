import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { questoes } from '@/lib/mockData';

export default function BancoQuestoes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [disciplinaFiltro, setDisciplinaFiltro] = useState('todas');

  const questoesFiltradas = questoes.filter(q => 
    (disciplinaFiltro === 'todas' || q.disciplina === disciplinaFiltro) &&
    (q.enunciado.toLowerCase().includes(filtro.toLowerCase()) || 
     q.tema.toLowerCase().includes(filtro.toLowerCase()))
  );

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
                <h1 className="text-2xl sm:text-3xl font-bold">Banco de Questões</h1>
                <p className="text-muted-foreground mt-1">Gerencie suas questões e crie novos itens</p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Questão
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Questão</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Disciplina</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="matematica">Matemática</SelectItem>
                            <SelectItem value="portugues">Português</SelectItem>
                            <SelectItem value="fisica">Física</SelectItem>
                            <SelectItem value="quimica">Química</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Dificuldade</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facil">Fácil</SelectItem>
                            <SelectItem value="medio">Médio</SelectItem>
                            <SelectItem value="dificil">Difícil</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Tema/Conteúdo</Label>
                      <Input placeholder="Ex: Equações do 2º grau" />
                    </div>
                    
                    <div>
                      <Label>Tipo de Questão</Label>
                      <RadioGroup defaultValue="multipla_escolha">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multipla_escolha" id="multipla" />
                          <Label htmlFor="multipla">Múltipla Escolha</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="verdadeiro_falso" id="vf" />
                          <Label htmlFor="vf">Verdadeiro ou Falso</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label>Enunciado</Label>
                      <Textarea 
                        placeholder="Digite o enunciado da questão..."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Alternativas</Label>
                      {['A', 'B', 'C', 'D', 'E'].map(letra => (
                        <div key={letra} className="flex items-center gap-2">
                          <RadioGroupItem value={letra} id={letra} />
                          <Label htmlFor={letra} className="text-sm font-medium">{letra})</Label>
                          <Input placeholder={`Alternativa ${letra}`} className="flex-1" />
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <Label>Tags</Label>
                      <Input placeholder="Ex: ENEM, Vestibular, Revisão (separadas por vírgula)" />
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1">Salvar Questão</Button>
                      <Button variant="outline" className="flex-1">Pré-visualizar</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por enunciado ou tema..."
                      className="pl-10"
                      value={filtro}
                      onChange={(e) => setFiltro(e.target.value)}
                    />
                  </div>
                  
                  <Select value={disciplinaFiltro} onValueChange={setDisciplinaFiltro}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas Disciplinas</SelectItem>
                      <SelectItem value="Matemática">Matemática</SelectItem>
                      <SelectItem value="Português">Português</SelectItem>
                      <SelectItem value="Física">Física</SelectItem>
                      <SelectItem value="Química">Química</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {questoesFiltradas.map((questao) => (
                    <Card key={questao.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary">{questao.disciplina}</Badge>
                              <Badge variant="outline">{questao.dificuldade}</Badge>
                              {questao.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Tema:</span> {questao.tema}
                            </p>
                            <p className="text-sm line-clamp-2">{questao.enunciado}</p>
                          </div>
                          
                          <div className="flex sm:flex-col gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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