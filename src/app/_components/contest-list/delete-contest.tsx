import { FaTrash } from "react-icons/fa";
import revalidateHomePage from "~/app/actions";
import { api } from "~/trpc/server";

export function DeleteContest({ id }: { id: number }) {
  const onDeleteContest = async () => {
    "use server";
    await api.contest.delete.mutate({ id });
    void revalidateHomePage();
  };

  return (
    <form action={onDeleteContest}>
      <button title="Delete contest">
        <FaTrash color="blue" />
      </button>
    </form>
  );
}
