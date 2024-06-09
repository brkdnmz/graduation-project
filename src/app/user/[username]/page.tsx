"use client";

import { notFound } from "next/navigation";
import { ProfilePicture } from "~/app/_components/profile-picture";
import { useSession } from "~/hooks/use-session";
import { useUser } from "~/hooks/use-user";
import { ChangeableProfilePicture } from "./_components/changeable-profile-picture";
import { ProfileCard } from "./_components/profile-card";

export default function UserPage({ params }: { params: { username: string } }) {
  const username = params.username;

  const { data: user, isLoading, isError } = useUser({ username });
  const { user: currentUser } = useSession();

  const isCurrentUser = user?.id !== undefined && user.id === currentUser?.id;

  if (isError || user === null) notFound();

  return (
    <ProfileCard>
      <div className="flex flex-wrap gap-3">
        {!isLoading && (
          <>
            <div className="flex items-center justify-center">
              {isCurrentUser ? (
                <ChangeableProfilePicture userId={user.id} size={150} />
              ) : (
                <ProfilePicture userId={user.id} size={150} />
              )}
            </div>
            <div>
              <h4 className="font-bold">{user.username}</h4>
              <span>{isCurrentUser && currentUser.email}</span>
            </div>
          </>
        )}
      </div>
    </ProfileCard>
  );
}
