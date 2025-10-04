import { Bell, Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  userName: string;
  userPhoto?: string;
  onMenuClick?: () => void;
}

export function Header({ userName, userPhoto, onMenuClick }: HeaderProps) {
  const isMobile = useIsMobile();
  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="h-full px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="shrink-0"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}

        <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl">
          {!isMobile && <Search className="w-5 h-5 text-muted-foreground shrink-0" />}
          <Input
            placeholder={isMobile ? "Buscar..." : "Buscar alunos, turmas, simulados..."}
            className="border-0 bg-muted/50 focus-visible:ring-primary text-sm"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors shrink-0">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 bg-destructive text-[10px]">
              3
            </Badge>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-border">
            {!isMobile && (
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium truncate max-w-[120px]">{userName}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            )}
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-primary/20 shrink-0">
              <AvatarImage src={userPhoto} alt={userName} />
              <AvatarFallback className="bg-gradient-primary text-white text-xs sm:text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
