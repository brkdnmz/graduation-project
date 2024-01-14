import { revalidatePath } from "next/cache";
import { FaPlus } from "react-icons/fa";
import { api } from "~/trpc/server";

export function AddUser() {
  const onAddUser = async () => {
    "use server";
    await api.user.createRandomUser.mutate();
    revalidatePath("/");
  };

  return (
    <form action={onAddUser}>
      <button
        title="Add a random user"
        className="rounded-lg bg-slate-700 p-2 transition-colors hover:bg-slate-800"
      >
        <FaPlus />
      </button>
    </form>
  );
}
