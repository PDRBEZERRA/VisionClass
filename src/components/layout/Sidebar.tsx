import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Settings,
  ClipboardList,
  UserCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface SidebarProps {
  userRole: UserRole;
}

const menuItems = {
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/admin' },
    { icon: Users, label: 'Usuários', path: '/usuarios' },
    { icon: GraduationCap, label: 'Turmas', path: '/turmas' },
    { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ],
  professor: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/professor' },
    { icon: GraduationCap, label: 'Minhas Turmas', path: '/turmas' },
    { icon: Users, label: 'Carômetro', path: '/carometro' },
    { icon: BookOpen, label: 'Banco de Questões', path: '/questoes' },
    { icon: FileText, label: 'Simulados', path: '/simulados' },
    { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
    { icon: UserCircle, label: 'Perfil', path: '/perfil' },
  ],
  aluno: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/aluno' },
    { icon: ClipboardList, label: 'Meus Simulados', path: '/meus-simulados' },
    { icon: BarChart3, label: 'Meu Desempenho', path: '/desempenho' },
    { icon: UserCircle, label: 'Perfil', path: '/perfil' },
  ],
};

export function Sidebar({ userRole }: SidebarProps) {
  const items = menuItems[userRole];

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          ERP Educacional
        </h1>
        <p className="text-xs text-muted-foreground mt-1 capitalize">{userRole}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                'hover:bg-primary/10 hover:text-primary',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-primary'
                  : 'text-foreground'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
