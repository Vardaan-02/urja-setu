import * as z from "zod"

export const formSchema = z.object({
  addresses: z.array(z.object({
    id: z.string(),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
  })).min(1, "At least one address is required"),
  phoneNumbers: z.array(z.object({
    id: z.string(),
    value: z.string(),
  })).min(1, "At least one phone number is required"),
  weight: z.number().positive("Weight must be a positive number"),
  image: z.instanceof(File, { message: "Please upload an image" }),
})

export type FormValues = z.infer<typeof formSchema>

