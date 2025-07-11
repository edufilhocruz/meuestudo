import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

interface EditProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  section: string | null;
  data: Record<string, any> | null;
  onSave: (section: string, newData: Record<string, any>) => void;
}

export function EditProfileDialog({ isOpen, onOpenChange, section, data, onSave }: EditProfileDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleSaveClick = () => {
    if (section) onSave(section, formData);
  };

  if (!section || !data) return null;
  
  const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar {sectionTitle}</DialogTitle>
          <DialogDescription>Atualize suas informações abaixo.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.keys(data).map(key => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Input id={key} value={formData[key] || ''} onChange={(e) => setFormData(f => ({ ...f, [key]: e.target.value }))} className="col-span-3" />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSaveClick}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}