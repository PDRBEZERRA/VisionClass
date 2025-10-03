import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap } from 'lucide-react';
import { UserRole } from '@/types';
import { mockUsers } from '@/lib/mockData';

export default function Login() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<UserRole>('aluno');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock validation
    const user = mockUsers.find(u => u.role === tipoUsuario);
    
    if (user) {
      localStorage.setItem('userRole', tipoUsuario);
      localStorage.setItem('userId', user.id);
      navigate(`/dashboard/${tipoUsuario}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">ERP Educacional</h1>
          <p className="text-white/80">Sistema de Gestão Escolar Completo</p>
        </div>

        <Card className="card-gradient border-white/10">
          <CardHeader>
            <CardTitle>Acesse sua conta</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tipoUsuario">Tipo de usuário</Label>
                <Select value={tipoUsuario} onValueChange={(value) => setTipoUsuario(value as UserRole)}>
                  <SelectTrigger id="tipoUsuario">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="aluno">Aluno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="matricula">Matrícula ou CPF</Label>
                <Input
                  id="matricula"
                  placeholder="Digite sua matrícula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full btn-primary-gradient">
                Entrar
              </Button>

              <button
                type="button"
                className="w-full text-sm text-primary hover:underline"
              >
                Esqueci minha senha
              </button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-white/60 text-sm mt-6">
          Dados de demonstração - Qualquer senha será aceita
        </p>
      </div>
    </div>
  );
}
