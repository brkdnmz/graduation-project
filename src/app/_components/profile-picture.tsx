import type { User } from "@prisma/client";
import Image from "next/image";
import { useUser } from "~/hooks/use-user";
import { cn } from "~/lib/utils";

type ProfilePictureProps = {
  userId: User["id"];
  size?: number;
  className?: string;
};

export function ProfilePicture({
  userId,
  size = 200,
  className,
}: ProfilePictureProps) {
  const { data: user, isLoading } = useUser({ userId });

  const lastUpdatedAt = user?.updatedAt.valueOf() ?? "";

  return (
    <div
      className={cn(className, "relative aspect-square rounded-full")}
      style={{ height: size }}
    >
      <Image
        src={
          isLoading
            ? "/profile-placeholder.png"
            : `http://localhost:3000/api/user/${userId}/profile-picture?${lastUpdatedAt}`
        } // lastUpdatedAt is inserted to prevent caching
        fill
        sizes={`${size}px`}
        alt={`${user?.username ?? "Unknown User"}'s profile picture`}
        placeholder="blur"
        blurDataURL="/profile-placeholder.png"
        className="rounded-full border border-slate-600 object-cover"
      />
    </div>
  );
}
