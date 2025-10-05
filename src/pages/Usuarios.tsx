import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, UserCircle } from 'lucide-react';
import { mockUsers } from '@/lib/mockData';

export default function Usuarios() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtro, setFiltro] = useState('');

  const usuariosFiltrados = mockUsers.filter(u => 
    u.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    u.email.toLowerCase().includes(filtro.toLowerCase()) ||
    u.matricula.toLowerCase().includes(filtro.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'destructive',
      professor: 'default',
      aluno: 'secondary'
    } as const;
    return <Badge variant={colors[role as keyof typeof colors]}>{role}</Badge>;
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
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Gerenciar Usuários</h1>
                <p className="text-muted-foreground mt-1">Cadastre e gerencie todos os usuários do sistema</p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome Completo</Label>
                        <Input placeholder="João da Silva" />
                      </div>
                      
                      <div>
                        <Label>CPF</Label>
                        <Input placeholder="000.000.000-00" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder="usuario@escola.com" />
                      </div>
                      
                      <div>
                        <Label>Matrícula</Label>
                        <Input placeholder="ALU001" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Tipo de Usuário</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aluno">Aluno</SelectItem>
                            <SelectItem value="professor">Professor</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Senha Inicial</Label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1">Cadastrar</Button>
                      <Button variant="outline" className="flex-1">Cancelar</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome, email ou matrícula..."
                      className="pl-10"
                      value={filtro}
                      onChange={(e) => setFiltro(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuariosFiltrados.map((usuario) => (
                        <TableRow key={usuario.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white">
                                <UserCircle className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="font-medium">{usuario.nome}</p>
                                <p className="text-sm text-muted-foreground">{usuario.cpf}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{usuario.matricula}</TableCell>
                          <TableCell>{usuario.email}</TableCell>
                          <TableCell>{getRoleBadge(usuario.role)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
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