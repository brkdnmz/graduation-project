import { FaTrash } from "react-icons/fa";
import revalidateHomePage from "~/app/actions";
import { api } from "~/trpc/server";

export function DeleteUser({ id }: { id: number }) {
  const onDeleteUser = async () => {
    "use server";
    await api.user.deleteUser.mutate({ id });
    void revalidateHomePage();
  };

  return (
    <form action={onDeleteUser}>
      <button title="Delete user">
        <FaTrash color="blue" />
      </button>
    </form>
  );
}
