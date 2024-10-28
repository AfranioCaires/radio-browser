import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioStation } from "@/interfaces/radio-data";
import { useState } from "react";

interface EditRadioFormProps {
  radio: RadioStation;
  onSave: (radio: RadioStation) => void;
  onCancel: () => void;
}

export function EditRadioForm({ radio, onSave, onCancel }: EditRadioFormProps) {
  const [formData, setFormData] = useState(radio);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, url: e.target.value }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="homepage">Homepage</Label>
          <Input
            id="homepage"
            value={formData.homepage}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, homepage: e.target.value }))
            }
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="submit">Salvar</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
}
