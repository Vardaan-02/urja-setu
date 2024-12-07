import { Combobox } from "@/components/ui/combo-box";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";

const Drivers = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];

export default function AssignDriver() {
    const [driver,setDriver] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger>
        <span className="px-4 py-2 bg-green-500 rounded-md shadow-sm text-white">
          Buy Now
        </span>
      </DialogTrigger>
      <DialogContent className="border-none bg-green-50 p-2">
        <div className="bg-white/30 rounded-lg shadow-lg p-4">
          <DialogClose>
            <X className="w-4 h-4 absolute right-6 top-6" />
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="mb-6">Choose Driver</DialogTitle>
            <DialogDescription>
              <Combobox options={Drivers} value={driver} onChange={setDriver}/>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
