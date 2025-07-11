import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex justify-between items-center text-sm">
    <p className="font-medium text-muted-foreground">{label}</p>
    <p className="font-semibold text-card-foreground text-right">{value}</p>
  </div>
);

interface ProfileSectionCardProps {
  title: string;
  data: Record<string, string>;
  onEdit: () => void;
}

export function ProfileSectionCard({ title, data, onEdit }: ProfileSectionCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="ghost" size="icon" className="size-8 shrink-0 text-muted-foreground" onClick={onEdit}><Pencil className="size-4" /></Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <InfoRow key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={value} />
        ))}
      </CardContent>
    </Card>
  );
}