import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"

const formSchema = z.object({
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  startTime: z.string(),
  endTime: z.string(),
  turbineSpecs: z.number().positive(),
  turbineEfficiency: z.number().min(0).max(100),
})

export default function WindForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      startTime: "",
      endTime: "",
      turbineSpecs: 0,
      turbineEfficiency: 0,
    },
  });
  const API_KEY = import.meta.env.API_KEY;
  const [arr, setArr] = useState<Array<string>>([]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    const location = values.location;
    const startTime = values.startTime;
    const endTime = values.endTime;
    const turbineSpecs = values.turbineSpecs;
    const turbineEfficiency = values.turbineEfficiency;
    const prompt = `The city is ${location}. The start time is ${startTime} and the end time is ${endTime}. the turbine efficiency is ${turbineEfficiency} and the turbine specs is ${turbineSpecs}. Give answers for latitude, longitude and energy generated with proper units separated by *.`;
    const MLModel = async () => {
      try {
        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
          method: "post",
          data: {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          },
        });
        const aiResponse =
          response["data"]["candidates"][0]["content"]["parts"][0]["text"];
        const responseArr = aiResponse.split("*");
        setArr(responseArr);
      } catch (error) {
        console.log(error);
      }
    };
    MLModel();
    console.log("latitude", arr[0]);
    console.log("longitude", arr[1]);
    console.log("energy", arr[2]);
    console.log("unit", arr[3]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormDescription>
                The location where the wind turbine is installed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                The start time for energy calculation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                The end time for energy calculation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="turbineSpecs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wind Turbine Specs (MWh)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormDescription>
                The specifications of the wind turbine in megawatt-hours.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="turbineEfficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Efficiency of Turbine (%)</FormLabel>
              <FormControl>
                <Input type="number" min="0" max="100" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormDescription>
                The efficiency of the wind turbine (0-100%).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

