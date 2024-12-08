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
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Drivers = [
  { label: "Driver 1", value: "1" },
  { label: "Driver 2", value: "2" },
  { label: "Driver 3", value: "3" },
];

// Define Zod schema for validation
const schema = z.object({
  driver: z.string().nonempty({ message: "Driver selection is required." }),
});

type FormData = z.infer<typeof schema>;

export default function AssignDriver() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { driver: "" },
  });

  const onSubmit = (data: FormData) => {
    console.log("Selected Driver:", data.driver);
  };

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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="driver"
                    render={({ field }) => (
                      <FormItem>
                        <label
                          htmlFor="driver"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Select a Driver
                        </label>
                        <FormControl>
                          <Combobox
                            options={Drivers}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Choose a driver"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    className="mt-8 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Assign Driver
                  </button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
