import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { api } from "~/trpc/server";
import { UsernameLink } from "../_components/username-link";
import revalidateCache from "../actions";

export default async function DevToolsPage() {
  if (env.NODE_ENV !== "development") redirect("/");

  const users = await api.user.getAll.query();

  const onCreateRandomUser = async () => {
    "use server";
    void api.user.createRandomUser.mutate();
    void revalidateCache();
  };

  return (
    <ul className="container">
      <li className="flex flex-col gap-3">
        <ul className="max-h-40 w-fit overflow-auto rounded-lg border p-3">
          {users.map((user) => (
            <li key={user.id}>
              <UsernameLink username={user.username} />
            </li>
          ))}
        </ul>
        <form action={onCreateRandomUser}>
          <Button type="submit">Create Random User</Button>
        </form>
      </li>
    </ul>
  );
}
