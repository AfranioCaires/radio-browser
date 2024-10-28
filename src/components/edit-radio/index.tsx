import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { RadioStation } from "@/interfaces/radio-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { EditRadioForm } from "./edit-radio";

interface EditRadioDialogProps {
  radio: RadioStation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (radio: RadioStation) => void;
}

export function EditRadio({
  radio,
  open,
  onOpenChange,
  onSave,
}: EditRadioDialogProps) {
  const isMobile = useIsMobile();

  const handleSave = (updatedRadio: RadioStation) => {
    onSave(updatedRadio);
    onOpenChange(false);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerDescription />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar rádio</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <EditRadioForm
              radio={radio}
              onSave={handleSave}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar rádio</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <EditRadioForm
          radio={radio}
          onSave={handleSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
