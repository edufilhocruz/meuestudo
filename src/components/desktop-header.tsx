import { ArrowLeft, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface DesktopHeaderProps {
  title?: string;
}

export default function DesktopHeader({ title = "Painel de Progresso" }: DesktopHeaderProps) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b bg-white px-10 py-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Bell />
        </Button>
        <Avatar>
            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmzzi9oi_oDnXVPMjBYbCWQLnLlcSmxBfF5MSxn1cFU0J3yFJDLtUVNb6rh_pW9EIPQhVF4zosP341FwTBbERg9Ja8rlqsW2CljgS-QyO2tyHgiXZYVc_8co7J_Qswe5IFMNL4CYIX6Xvuuv2lQdxjp3P3ZYUVHtOfg_cHOr51z5BDclKjL76EEwMYpau-JF84E2BioBCY4nDisSd1vuf8WVYd7efmKAOyfHPgeKwOSUVz22rUkkqxg7G2FkFzbHTHkfsYSky_lcBp" alt="User Avatar" />
            <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}