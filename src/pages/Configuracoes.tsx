import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Database, Bell, Shield, Users } from 'lucide-react';

export default function Configuracoes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole="admin" open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          userName="Admin Sistema"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Configurações</h1>
              <p className="text-muted-foreground mt-1">Gerencie as configurações do sistema</p>
            </div>
            
            <Tabs defaultValue="geral">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="geral">
                  <Settings className="w-4 h-4 mr-2" />
                  Geral
                </TabsTrigger>
                <TabsTrigger value="usuarios">
                  <Users className="w-4 h-4 mr-2" />
                  Usuários
                </TabsTrigger>
                <TabsTrigger value="notificacoes">
                  <Bell className="w-4 h-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="seguranca">
                  <Shield className="w-4 h-4 mr-2" />
                  Segurança
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="geral" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Instituição</CardTitle>
                    <CardDescription>Configure os dados gerais da escola</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Nome da Instituição</Label>
                      <Input placeholder="Escola Exemplo" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>CNPJ</Label>
                        <Input placeholder="00.000.000/0000-00" />
                      </div>
                      
                      <div>
                        <Label>Telefone</Label>
                        <Input placeholder="(00) 0000-0000" />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Endereço</Label>
                      <Input placeholder="Rua, número, bairro" />
                    </div>
                    
                    <Button>Salvar Alterações</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Ano Letivo</CardTitle>
                    <CardDescription>Defina o período do ano letivo atual</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Ano</Label>
                        <Select defaultValue="2025">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Semestre/Período</Label>
                        <Select defaultValue="1">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1º Semestre</SelectItem>
                            <SelectItem value="2">2º Semestre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button>Atualizar Período</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="usuarios" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Permissões de Usuários</CardTitle>
                    <CardDescription>Configure as permissões padrão por tipo de usuário</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Alunos podem visualizar notas</p>
                        <p className="text-sm text-muted-foreground">Permitir que alunos vejam suas próprias notas</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Professores podem criar simulados</p>
                        <p className="text-sm text-muted-foreground">Permitir criação de simulados por professores</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-cadastro de alunos</p>
                        <p className="text-sm text-muted-foreground">Permitir que alunos se cadastrem no sistema</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notificacoes" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificações</CardTitle>
                    <CardDescription>Configure quando e como enviar notificações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email de novos simulados</p>
                        <p className="text-sm text-muted-foreground">Notificar alunos por email sobre novos simulados</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Alertas de desempenho</p>
                        <p className="text-sm text-muted-foreground">Notificar professores sobre queda de desempenho</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Lembretes de prazos</p>
                        <p className="text-sm text-muted-foreground">Enviar lembretes sobre prazos de simulados</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="seguranca" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>Gerencie a segurança de dados</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Política de Senhas</Label>
                      <Select defaultValue="media">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixa">Baixa (mínimo 6 caracteres)</SelectItem>
                          <SelectItem value="media">Média (8 caracteres, letras e números)</SelectItem>
                          <SelectItem value="alta">Alta (12+ caracteres, símbolos obrigatórios)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Autenticação de dois fatores</p>
                        <p className="text-sm text-muted-foreground">Exigir 2FA para administradores</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="pt-4">
                    </div>
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