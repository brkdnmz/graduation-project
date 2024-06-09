"use client";

import { type User } from "@prisma/client";
import { useState } from "react";
import { ProfilePicture } from "~/app/_components/profile-picture";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ChangeProfilePictureForm } from "./change-profile-picture-form";

type ChangeableProfilePictureProps = {
  userId: User["id"];
  size?: number;
};

export function ChangeableProfilePicture({
  userId,
  size = 200,
}: ChangeableProfilePictureProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => setDialogOpen(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="relative overflow-hidden rounded-full transition hover:brightness-75"
          title="Update profile picture"
        >
          <ProfilePicture userId={userId} size={size} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change profile picture</DialogTitle>
        </DialogHeader>

        <ChangeProfilePictureForm
          userId={userId}
          onChangePicture={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
