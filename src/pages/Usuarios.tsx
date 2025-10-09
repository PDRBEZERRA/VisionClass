import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types';
import { Plus, Search, Edit, Eye, Trash2, ArrowLeftRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface UsuariosProps {
  userRole?: UserRole; // Adicionando userRole como opcional, padrão para 'admin'
}

// Mock de dados para a tabela
const mockUsers = [
  { id: '101', nome: 'João da Silva', email: 'joao@escola.com', tipo: 'Aluno', turma: '3º A' },
  { id: '102', nome: 'Maria Souza', email: 'maria@escola.com', tipo: 'Aluno', turma: '3º A' },
  { id: '201', nome: 'Prof. Ana Lima', email: 'ana@escola.com', tipo: 'Professor', turma: 'N/A' },
  { id: '301', nome: 'Admin Sistema', email: 'admin@escola.com', tipo: 'Administrador', turma: 'N/A' },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Aluno': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'Professor': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Administrador': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

export default function Usuarios({ userRole = 'admin' }: UsuariosProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const userName = userRole === 'admin' ? 'Admin Sistema' : 'Prof. João Silva';

  const handleNovoUsuario = () => navigate('/usuarios/novo');
  const handleEditarUsuario = (id: string) => navigate(`/usuarios/editar/${id}`);

  // NOVA FUNÇÃO: Navegar para a página de desempenho do aluno
  const handleVerDesempenho = (alunoId: string) => {
    navigate(`/desempenho/aluno/${alunoId}`);
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Gerenciamento de Usuários</h1>
                <p className="text-muted-foreground mt-1">Lista completa de administradores, professores e alunos.</p>
              </div>

              <Button onClick={handleNovoUsuario} className="btn-primary-gradient">
                <Plus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Lista de Usuários</CardTitle>
                <div className="relative w-full max-w-sm">
                  <Input type="text" placeholder="Buscar por nome ou email..." className="pl-10" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Turma</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.nome}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleColor(user.tipo)} variant="secondary">
                              {user.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.turma}</TableCell>
                          <TableCell className="text-right space-x-2 flex justify-end">
                            {user.tipo === 'Aluno' && (
                              // NOVO BOTÃO: Ver Desempenho
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVerDesempenho(user.id)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Desempenho
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => handleEditarUsuario(user.id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
