import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface AddItemDialogProps {
  title: string;
  onAdd: (newAddress: {
    id: string;
    address: string;
    city: string;
    state: string;
  }) => void;
  fields: { name: string; label: string }[];
}

export function AddItemDialogAddress({ title, onAdd, fields }: AddItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { address, city, state } = formData;

    if (!address || !city || !state) {
      return;
    }

    onAdd({
      id: Date.now().toString(),
      address,
      city,
      state,
    });

    setFormData({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New {title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-2">
        <div className="bg-white/30 rounded-lg shadow-lg p-4">
        <DialogClose><X className=" absolute right-7 top-7 h-4 w-4" /></DialogClose>
        
        <DialogHeader>
          <DialogTitle>Add New {title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor={field.name} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.name}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                containerClassName="col-span-3"
              />
            </div>
          ))}
          <Button type="submit" className="ml-auto">
            Add {title}
          </Button>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
