import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Lock, Bell, Camera } from 'lucide-react';
import { UserRole } from '@/types';

interface PerfilProps {
  userRole?: UserRole;
}

export default function Perfil({ userRole = 'aluno' }: PerfilProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const userData = {
    aluno: { nome: 'João Santos', matricula: 'ALU001', email: 'joao@escola.com' },
    professor: { nome: 'Prof. João Silva', matricula: 'PROF001', email: 'joao.silva@escola.com' },
    admin: { nome: 'Admin Sistema', matricula: 'ADM001', email: 'admin@escola.com' }
  }[userRole];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole={userRole} open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          userName={userData.nome}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Meu Perfil</h1>
              <p className="text-muted-foreground mt-1">Gerencie suas informações pessoais</p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.matricula}`} />
                      <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                        {userData.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold">{userData.nome}</h2>
                    <p className="text-muted-foreground">{userData.matricula}</p>
                    <p className="text-sm text-muted-foreground mt-1">{userData.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="dados">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dados">
                  <User className="w-4 h-4 mr-2" />
                  Dados
                </TabsTrigger>
                <TabsTrigger value="seguranca">
                  <Lock className="w-4 h-4 mr-2" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="notificacoes">
                  <Bell className="w-4 h-4 mr-2" />
                  Notificações
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dados" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Atualize seus dados cadastrais</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome Completo</Label>
                        <Input defaultValue={userData.nome} />
                      </div>
                      
                      <div>
                        <Label>Matrícula</Label>
                        <Input defaultValue={userData.matricula} disabled />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <Input type="email" defaultValue={userData.email} />
                      </div>
                      
                      <div>
                        <Label>Telefone</Label>
                        <Input placeholder="(00) 00000-0000" />
                      </div>
                    </div>
                    
                    <div>
                      <Label>CPF</Label>
                      <Input defaultValue="000.000.000-00" disabled />
                    </div>
                    
                    <Button>Salvar Alterações</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="seguranca" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Senha Atual</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    
                    <div>
                      <Label>Nova Senha</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    
                    <div>
                      <Label>Confirmar Nova Senha</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    
                    <Button>Atualizar Senha</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notificacoes" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificações</CardTitle>
                    <CardDescription>Escolha como deseja ser notificado</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Novos simulados</p>
                          <p className="text-sm text-muted-foreground">Receber email sobre novos simulados</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Resultados disponíveis</p>
                          <p className="text-sm text-muted-foreground">Notificar quando resultados forem liberados</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Lembretes de prazos</p>
                          <p className="text-sm text-muted-foreground">Receber lembretes sobre prazos próximos</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <Button>Salvar Preferências</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}