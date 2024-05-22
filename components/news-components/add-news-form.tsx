"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios"
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const addNewsFormSchema = z.object({
  title: z.string().min(1,),
  content: z.string().min(1,)
});

type AddNewsValue = z.infer<typeof addNewsFormSchema>

const AddNewsForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const form = useForm<AddNewsValue>({
    resolver: zodResolver(addNewsFormSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  })

  const onSubmit = async (data: AddNewsValue) => {
    try {
      setLoading(true);

      await axios.post(`/api/news`, data);

      router.refresh();
      router.push(`/`)
      toast.success("Success to add a news");
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder="Title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder="Content..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {"Submit"}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default AddNewsForm
