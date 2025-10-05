import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { mockUsers } from '@/lib/mockData';
import { User } from '@/types';

export default function EditarUsuario() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userToEdit = mockUsers.find(u => u.id === id);
    if (userToEdit) {
      setUser(userToEdit);
    } else {
      // Opcional: lidar com usuário não encontrado
      navigate('/usuarios');
    }
  }, [id, navigate]);

  const handleGoBack = () => {
    navigate(-1); // Navega para a página anterior no histórico
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser(prev => prev ? { ...prev, [id]: value } : null);
  };

  const handleSelectChange = (value: string) => {
    setUser(prev => prev ? { ...prev, role: value as User['role'] } : null);
  };


  if (!user) {
    return <div>Carregando...</div>; // Ou um componente de loading
  }

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
                <CardTitle className="text-2xl">Editar Usuário</CardTitle>
                <CardDescription>Atualize os dados do usuário abaixo.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" value={user.nome} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" value={user.cpf} disabled />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={user.email} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="matricula">Matrícula</Label>
                      <Input id="matricula" value={user.matricula} disabled />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Tipo de Usuário</Label>
                      <Select value={user.role} onValueChange={handleSelectChange}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aluno">Aluno</SelectItem>
                          <SelectItem value="professor">Professor</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Button type="submit" className="flex-1">Salvar Alterações</Button>
                    <Button variant="outline" className="flex-1" onClick={handleGoBack}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

