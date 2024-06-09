"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const changeProfilePictureFormSchema = z.object({
  newProfilePicture: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Please upload a valid image")
    .transform(async (file) => new Uint8Array(await file.arrayBuffer())),
});

type ChangeProfilePictureForm = z.infer<typeof changeProfilePictureFormSchema>;

type ChangeProfilePictureFormProps = {
  userId: User["id"];
  onChangePicture?: () => void;
};

export function ChangeProfilePictureForm({
  userId,
  onChangePicture,
}: ChangeProfilePictureFormProps) {
  const { handleSubmit, control } = useForm<ChangeProfilePictureForm>({
    resolver: zodResolver(changeProfilePictureFormSchema),
  });
  const updateProfilePicture = api.user.updateProfilePicture.useMutation();
  const router = useRouter();
  const trpcUtils = api.useUtils();

  const onUpdateProfilePicture: SubmitHandler<ChangeProfilePictureForm> = (
    data,
  ) => {
    updateProfilePicture.mutate(
      { userId, newProfilePicture: data.newProfilePicture },
      {
        onSuccess: () => {
          router.refresh();
          onChangePicture?.();
          void trpcUtils.user.invalidate();
        },
        onError: (err) => {
          switch (err.data?.code) {
            case "FORBIDDEN":
              toast({
                variant: "destructive",
                title: "Error",
                description: err.message,
                duration: 3000,
              });
              break;
            case "UNAUTHORIZED":
              toast({
                variant: "destructive",
                title: "Error",
                description: "You must be logged in",
                duration: 3000,
              });
            default:
              break;
          }
        },
      },
    );
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onUpdateProfilePicture, (errors) => {
        console.log(errors);
      })}
    >
      <Controller
        control={control}
        name="newProfilePicture"
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              type="file"
              required
              onChange={(e) => {
                const image = e.target.files?.[0];
                field.onChange(image);
              }}
            />

            {error && <p className="text-sm text-red-400">{error.message}</p>}
          </>
        )}
      />

      <div className="flex justify-end">
        <Button type="submit">OK</Button>
      </div>
    </form>
  );
}
