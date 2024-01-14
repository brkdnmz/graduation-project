import { revalidatePath } from "next/cache";
import { FaTrash } from "react-icons/fa";
import { api } from "~/trpc/server";

export function DeleteUser({ id }: { id: number }) {
  const onDeleteUser = async () => {
    "use server";
    await api.user.deleteUser.mutate({ id });
    revalidatePath("/");
  };

  return (
    <form action={onDeleteUser}>
      <button title="Delete user">
        <FaTrash color="blue" />
      </button>
    </form>
  );
}
