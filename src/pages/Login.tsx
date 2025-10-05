import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap } from 'lucide-react';
import { UserRole } from '@/types';
// import { mockUsers } from '@/lib/mockData'; // REMOVIDO: Não é mais necessário
import { toast } from 'sonner'; // ADICIONADO: Para notificações

// Interface de resposta do backend Java
interface LoginResponse {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: string;
}


export default function Login() {
  // O campo matricula/CPF será enviado como 'email' para a API Java.
  const [emailOrMatricula, setEmailOrMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<UserRole>('aluno');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Removida a lógica de mock

    const API_URL = "http://localhost:8080/api/usuarios/login";

    // O body deve corresponder ao DTO LoginRequest.java (email e senha)
    const loginData = {
        email: emailOrMatricula,
        senha: senha,
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (!response.ok) {
            // Falha na autenticação (401 Unauthorized, 400 Bad Request, etc.)
            const errorMessage = data.mensagem || "Credenciais inválidas ou erro desconhecido.";
            toast.error("Falha no Login", { description: errorMessage });
            return;
        }

        // Sucesso (200 OK)
        const userData: LoginResponse = data;

        // Embora o tipo de usuário seja selecionado no front,
        // a validação final do papel deve vir do backend (userData.tipoUsuario)
        if (userData.tipoUsuario.toLowerCase() !== tipoUsuario) {
             toast.error("Acesso Negado", {
                 description: `O usuário ${userData.email} não tem o papel de ${tipoUsuario.toUpperCase()}.`
             });
             return;
        }


        // Salva os dados do usuário no armazenamento local
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', userData.tipoUsuario.toLowerCase());
        localStorage.setItem('userId', userData.id.toString());

        toast.success("Login realizado com sucesso!");

        // Redireciona com base no papel retornado pelo backend
        navigate(`/dashboard/${userData.tipoUsuario.toLowerCase()}`);

    } catch (error) {
        console.error("Erro de Conexão com a API:", error);
        toast.error("Erro de Conexão", {
            description: "Não foi possível conectar ao servidor. Verifique se o backend Java está rodando na porta 8080."
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-3 sm:p-4">
      <div className="w-full max-w-md animate-fade-in px-2 sm:px-0">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm mb-3 sm:mb-4">
            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">VisionClass</h1>
          <p className="text-sm sm:text-base text-white/80">Sistema de Gestão Escolar Completo</p>
        </div>

        <Card className="card-gradient border-white/10">
          <CardHeader className="space-y-1 sm:space-y-1.5">
            <CardTitle className="text-xl sm:text-2xl">Acesse sua conta</CardTitle>
            <CardDescription className="text-sm">
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="tipoUsuario" className="text-sm">Tipo de usuário</Label>
                <Select value={tipoUsuario} onValueChange={(value) => setTipoUsuario(value as UserRole)}>
                  <SelectTrigger id="tipoUsuario" className="h-10 sm:h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="aluno">Aluno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="matricula" className="text-sm">Matrícula ou E-mail</Label>
                <Input
                  id="matricula"
                  placeholder="Digite seu e-mail ou matrícula"
                  value={emailOrMatricula}
                  onChange={(e) => setEmailOrMatricula(e.target.value)}
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="senha" className="text-sm">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>

              <Button type="submit" className="w-full btn-primary-gradient h-10 sm:h-11 text-sm sm:text-base">
                Entrar
              </Button>

              <button
                type="button"
                className="w-full text-xs sm:text-sm text-primary hover:underline"
              >
                Esqueci minha senha
              </button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-white/60 text-sm mt-6">

        </p>
      </div>
    </div>
  );
}