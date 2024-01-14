import { api } from "~/trpc/server";
import { AddUser } from "./add-user";
import { UserListItem } from "./user-list-item";

export async function UserList() {
  const users = await api.user.getAll.query();

  return (
    <div className="rounded-xl border-2 border-slate-900 bg-gradient-to-b from-slate-700 to-slate-900 px-4 py-2">
      <div className="overflow-auto">
        <h2 className="border-b border-slate-500 pb-4">Users</h2>
        <ul className="flex max-h-96 flex-col gap-2 overflow-auto py-2">
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
        <div className="text-center">
          <AddUser />
        </div>
      </div>
    </div>
  );
}
