import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, Calendar, BookOpen } from 'lucide-react';
import { mockTurmas } from '../lib/mockData';
import { UserRole } from '../types';

export default function Turmas() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole') as UserRole || 'professor';
  const userName = userRole === 'admin' ? 'Admin Sistema' : 'Prof. João Silva';

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar userRole={userRole} open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header userName={userName} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {userRole === 'admin' ? 'Todas as Turmas' : 'Minhas Turmas'}
            </h1>
            <div className="grid gap-4 sm:grid-cols-2">
              {mockTurmas.map((turma) => (
                <Card key={turma.id}>
                  <CardHeader>
                    <CardTitle>{turma.nome}</CardTitle>
                    <Badge variant="secondary">{turma.periodo}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{turma.alunosIds.length} alunos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Ano: {turma.ano}</span>
                    </div>
                    <Button className="w-full" onClick={() => navigate(`/turma/${turma.id}`)}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ver Turma
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

