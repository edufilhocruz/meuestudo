import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface SubjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dialogSubject: string;
  onDialogSubjectChange: (value: string) => void;
  onConfirm: () => void;
}

export function SubjectDialog({ isOpen, onOpenChange, dialogSubject, onDialogSubjectChange, onConfirm }: SubjectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Qual disciplina você vai estudar?</DialogTitle>
          <DialogDescription>Informe a disciplina para iniciar sua sessão de foco.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input id="disciplina-modal" placeholder="Ex: Matemática" value={dialogSubject} onChange={(e) => onDialogSubjectChange(e.target.value)} autoComplete="off" />
        </div>
        <DialogFooter>
          <Button onClick={onConfirm} className="w-full">Confirmar e Iniciar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}