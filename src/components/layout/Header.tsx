import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  userName: string;
  userPhoto?: string;
}

export function Header({ userName, userPhoto }: HeaderProps) {
  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar alunos, turmas, simulados..."
            className="border-0 bg-muted/50 focus-visible:ring-primary"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-[10px]">
              3
            </Badge>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={userPhoto} alt={userName} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
