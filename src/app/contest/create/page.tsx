"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

const createContestFormSchema = z
  .object({
    contestName: z.string().min(1, "Must not be empty"),
    contestType: z.union(
      [z.literal("Image Segmentation"), z.literal("Object Detection")],
      {
        errorMap: () => {
          return {
            message: "Invalid contest type", // react-hook-form ignores this, considers unionErrors instead...
          };
        },
      },
    ),
    startsAt: z.coerce.date().min(new Date(), "Must not start in the past"),
    endsAt: z.coerce.date(),
  })
  .refine((fields) => fields.startsAt <= fields.endsAt, {
    message: "Must not end before the start date",
    path: ["endsAt"],
  });

type CreateContestForm = z.infer<typeof createContestFormSchema>;

export default function CreateContest() {
  const form = useForm<CreateContestForm>({
    resolver: zodResolver(createContestFormSchema),
  });
  const createContest = api.contest.create.useMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateContestForm> = async (data) => {
    createContest.mutate(data, {
      onSuccess: () => {
        router.push("/contest/list");
      },
      onError: () => {
        alert("An error occurred");
      },
    });
  };

  const now = new Date();

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-center gap-4 rounded-xl bg-slate-900 p-4 text-slate-300"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="contestName"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contest Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contestType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contest Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contest type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Image Segmentation">
                    Image Segmentation
                  </SelectItem>
                  <SelectItem value="Object Detection">
                    Object Detection
                  </SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.contestType && (
                <div className="relative">
                  <p className="absolute left-3 top-0.5 text-sm font-medium text-destructive">
                    Please select contest type
                  </p>
                </div>
              )}
            </FormItem>
          )}
        />

        <div className="flex items-center justify-center gap-3">
          <FormField
            control={form.control}
            name="startsAt"
            defaultValue={"" as unknown as Date}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stars at</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    min={now.toISOString().slice(0, -8)}
                    className="w-fit"
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().slice(0, -8)
                        : field.value
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span className="pointer-events-none select-none text-2xl font-extralight text-slate-400">
            —
          </span>

          <FormField
            control={form.control}
            name="endsAt"
            defaultValue={"" as unknown as Date}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Ends at</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    min={now.toISOString().slice(0, -8)}
                    className="w-fit"
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().slice(0, -8)
                        : field.value
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="mt-4 rounded-lg py-2 text-slate-300"
          variant="secondary"
        >
          Create Contest
        </Button>
      </form>
    </Form>
  );
}
