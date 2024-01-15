"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import revalidateHomePage from "~/app/actions";
import { api } from "~/trpc/react";

const createContestFormSchema = z
  .object({
    contestName: z.string().min(1, "Must not be empty"),
    contestType: z.union([
      z.literal("Image Segmentation"),
      z.literal("Object Detection"),
    ]),
    startsAt: z.coerce.date().min(new Date(), "Must start in the future"),
    endsAt: z.coerce.date().min(new Date()),
  })
  .refine((fields) => fields.startsAt <= fields.endsAt, {
    message: "Must not end before the start date",
    path: ["endsAt"],
  });

type CreateContestForm = z.infer<typeof createContestFormSchema>;

export default function CreateContest() {
  const { formState, register, handleSubmit } = useForm<CreateContestForm>({
    resolver: zodResolver(createContestFormSchema),
  });
  const createContest = api.contest.create.useMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateContestForm> = async (data) => {
    try {
      await createContest.mutateAsync(data);
      await revalidateHomePage();
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmitError: SubmitErrorHandler<CreateContestForm> = (error) => {
    console.log(error);
  };

  const [now] = useState(new Date());

  return (
    <form
      className="flex flex-col justify-center gap-4 rounded-lg border-2 border-slate-900 bg-slate-800 p-4"
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
    >
      <label className="flex flex-col">
        <h3 className="mb-2">Contest Name</h3>
        <input
          type="text"
          {...register("contestName")}
          className="rounded-lg px-2 py-1"
        />
        {formState.errors.contestName && (
          <div className="relative">
            <span className="absolute left-0 top-0 text-sm text-rose-500">
              {formState.errors.contestName.message}
            </span>
          </div>
        )}
      </label>
      <label className="flex flex-col">
        <h3 className="mb-2">Contest Type</h3>
        <select {...register("contestType")} className="rounded-lg px-2 py-1">
          <option>Image Segmentation</option>
          <option>Object Detection</option>
        </select>
        {formState.errors.contestType && (
          <div className="relative">
            <span className="absolute left-0 top-0 text-sm text-rose-500">
              {formState.errors.contestType.message}
            </span>
          </div>
        )}
      </label>
      <div className="mb-5 flex justify-between">
        <label>
          <h4>Start Date</h4>
          <input
            type="datetime-local"
            {...register("startsAt")}
            min={now.toISOString().slice(0, -8)}
            className="rounded-lg px-2 py-1"
          />
          {formState.errors.startsAt && (
            <div className="relative">
              <span className="absolute left-0 top-0 text-sm text-rose-500">
                {formState.errors.startsAt.message}
              </span>
            </div>
          )}
        </label>
        <label>
          <h4>End Date</h4>
          <input
            type="datetime-local"
            {...register("endsAt")}
            min={now.toISOString().slice(0, -8)}
            className="rounded-lg px-2 py-1"
          />
          {formState.errors.endsAt && (
            <div className="relative">
              <span className="absolute left-0 top-0 text-sm text-rose-500">
                {formState.errors.endsAt.message}
              </span>
            </div>
          )}
        </label>
      </div>
      <button type="submit" className="mt-4 rounded-lg bg-slate-900 py-2">
        Create Contest
      </button>
    </form>
  );
}
