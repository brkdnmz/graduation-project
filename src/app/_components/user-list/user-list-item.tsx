import type { RouterOutputs } from "~/trpc/shared";
import { DeleteUser } from "./delete-user";

export const revalidate = 0;

export function UserListItem({
  user,
}: {
  user: RouterOutputs["user"]["getAll"][number];
}) {
  return (
    <li
      key={user.id}
      className="flex flex-col gap-2 rounded-xl border border-slate-600 p-1"
    >
      <ul>
        <li>ID: {user.id}</li>
        <li>Email: {user.email}</li>
        <li>Username: {user.username}</li>
        <li>
          Registered at:{" "}
          {user.createdAt.toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "medium",
          })}
        </li>
      </ul>
      <DeleteUser id={user.id} />
    </li>
  );
}
