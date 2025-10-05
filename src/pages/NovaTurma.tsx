import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { mockUsers } from '../lib/mockData';

export default function NovaTurma() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole="admin" open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header
          userName="Admin Sistema"
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Button variant="outline" size="sm" onClick={handleGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Cadastrar Nova Turma</CardTitle>
                <CardDescription>Preencha os dados abaixo para criar uma nova turma no sistema.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome-turma">Nome da Turma</Label>
                    <Input id="nome-turma" placeholder="Ex: 3º Ano A - Ensino Médio" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ano-letivo">Ano Letivo</Label>
                      <Input id="ano-letivo" placeholder="Ex: 2025" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="periodo">Período</Label>
                      <Select>
                        <SelectTrigger id="periodo">
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manha">Manhã</SelectItem>
                          <SelectItem value="tarde">Tarde</SelectItem>
                          <SelectItem value="noite">Noite</SelectItem>
                          <SelectItem value="integral">Integral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="professor">Professor Responsável</Label>
                    <Select>
                      <SelectTrigger id="professor">
                        <SelectValue placeholder="Selecione um professor" />
                      </Trigger>
                      <SelectContent>
                        {mockUsers.filter(u => u.role === 'professor').map(prof => (
                          <SelectItem key={prof.id} value={prof.id}>{prof.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-t pt-6">Alunos</h3>
                  <p className="text-sm text-muted-foreground">Adicione alunos a esta turma.</p>
                  <Button variant="outline">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Adicionar Alunos
                  </Button>
                  {/* Aqui você pode adicionar uma lista de alunos selecionados */}
                </div>

                <div className="flex justify-end gap-2 pt-6 border-t">
                  <Button variant="outline" onClick={handleGoBack}>
                    Cancelar
                  </Button>
                  <Button>Cadastrar Turma</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

