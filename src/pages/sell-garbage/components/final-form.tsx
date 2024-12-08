"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SelectableCard } from "./selectable-cards"
import { formSchema, FormValues } from "../../../types/sell-garbage-zod-schema"
import { AddItemDialogAddress } from "./add-item-dialog-address"
import { AddItemDialogPhone } from "./add-item-dialog-phone"
import { Label } from "@/components/ui/label"

export function FinalForm() {
  const [addresses, setAddresses] = useState<
    { id: string; address: string; city: string; state: string }[]
  >([])
  const [phoneNumbers, setPhoneNumbers] = useState<{ id: string; value: string }[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [selectedPhoneNumberId, setSelectedPhoneNumberId] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addresses: [],
      phoneNumbers: [],
      weight: 0,
      image: undefined,
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
    // Handle form submission
  }

  const addAddress = (newAddress: { id: string; address: string; city: string; state: string }) => {
    const updatedAddresses = [...addresses, newAddress]
    setAddresses(updatedAddresses)
    form.setValue("addresses", updatedAddresses)
  }

  const addPhoneNumber = (newPhoneNumber: { id: string; value: string }) => {
    const updatedPhoneNumbers = [...phoneNumbers, newPhoneNumber]
    setPhoneNumbers(updatedPhoneNumbers)
    form.setValue("phoneNumbers", updatedPhoneNumbers)
  }

  const deleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id)
    setAddresses(updatedAddresses)
    form.setValue("addresses", updatedAddresses)
    if (selectedAddressId === id) {
      setSelectedAddressId(null)
    }
  }

  const deletePhoneNumber = (id: string) => {
    const updatedPhoneNumbers = phoneNumbers.filter((phoneNumber) => phoneNumber.id !== id)
    setPhoneNumbers(updatedPhoneNumbers)
    form.setValue("phoneNumbers", updatedPhoneNumbers)
    if (selectedPhoneNumberId === id) {
      setSelectedPhoneNumberId(null)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FormField
            control={form.control}
            name="addresses"
            render={() => (
              <FormItem>
                <Label>Addresses</Label>
                <FormControl>
                  <div className="space-y-4">
                    <AnimatePresence>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {addresses.map((address) => (
                          <SelectableCard
                            key={address.id}
                            id={address.id}
                            content={address}
                            isSelected={selectedAddressId === address.id}
                            onSelect={(id) => setSelectedAddressId(id)}
                            onDelete={deleteAddress}
                          />
                        ))}
                      </div>
                    </AnimatePresence>
                    <AddItemDialogAddress
                      title="Address"
                      onAdd={addAddress}
                      fields={[
                        { name: "address", label: "Address" },
                        { name: "city", label: "City" },
                        { name: "state", label: "State" },
                      ]}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FormField
            control={form.control}
            name="phoneNumbers"
            render={() => (
              <FormItem>
                <Label>Phone Numbers</Label>
                <FormControl>
                  <div className="space-y-4">
                    <AnimatePresence>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {phoneNumbers.map((phoneNumber) => (
                          <SelectableCard
                            key={phoneNumber.id}
                            id={phoneNumber.id}
                            content={phoneNumber.value}
                            isSelected={selectedPhoneNumberId === phoneNumber.id}
                            onSelect={(id) => setSelectedPhoneNumberId(id)}
                            onDelete={deletePhoneNumber}
                          />
                        ))}
                      </div>
                    </AnimatePresence>
                    <AddItemDialogPhone
                      title="Phone Number"
                      onAdd={addPhoneNumber}
                      fields={[{ name: "value", label: "Phone Number" }]}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <Label>Weight (kg)</Label>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <Label>Image Upload</Label>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button type="submit">Submit</Button>
        </motion.div>
      </form>
    </Form>
  )
}

