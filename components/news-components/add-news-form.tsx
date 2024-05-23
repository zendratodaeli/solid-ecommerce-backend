"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "../image-upload";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { News } from "@prisma/client";
import LoadingButton from "../ui/loading-button";

const addNewsFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().optional(),
});

type AddNewsValue = z.infer<typeof addNewsFormSchema>;

interface AddNewsFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newsToEdit?: News;
}

const AddNewsForm = ({ open, setOpen, newsToEdit }: AddNewsFormProps) => {
  const [loading, setLoading] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const router = useRouter();

  const form = useForm<AddNewsValue>({
    resolver: zodResolver(addNewsFormSchema),
    defaultValues: {
      title: newsToEdit?.title || "",
      content: newsToEdit?.content || "",
      imageUrl: newsToEdit?.imageUrl || "",
    },
  });

  const onSubmit = async (data: AddNewsValue) => {
    try {
      if(newsToEdit) {
        await axios.put(`/api/news`, { id: newsToEdit.id, ...data} );
      } else {
        await axios.post(`/api/news`, data);
      }

      router.push(`/`);
      router.refresh();
      toast.success("Success to add a news");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if(!newsToEdit) return;
    setDeleteInProgress(true)

    try {
      await axios.delete(`/api/news`, { data: {id : newsToEdit.id}} );

      router.refresh();
      router.push(`/`)
      toast.success("News deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{newsToEdit ? "Edit News" : "Add News"}</DialogTitle>
          </DialogHeader>
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        disabled={loading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className=" gap-2  sm:gap-0">
              {newsToEdit && (
                <LoadingButton
                  variant="destructive"
                  loading={deleteInProgress}
                  disabled={form.formState.isSubmitting}
                  onClick={onDelete}
                  type="button"
                >
                  Delete Note
                </LoadingButton>
              )}
              <LoadingButton 
                type="submit" 
                loading={form.formState.isSubmitting}
                disabled={deleteInProgress}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewsForm;
