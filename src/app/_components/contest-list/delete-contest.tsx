import { FaTrash } from "react-icons/fa";
import { api } from "~/trpc/react";

export function DeleteContest({ id }: { id: number }) {
  const deleteContest = api.contest.delete.useMutation();
  const trpcUtils = api.useUtils();

  const onDeleteContest = async () => {
    deleteContest.mutate(
      { id },
      {
        onSettled: () => {
          void trpcUtils.contest.getAll.invalidate();
        },
      },
    );
  };

  return (
    <form action={onDeleteContest}>
      <button title="Delete contest">
        <FaTrash color="blue" />
      </button>
    </form>
  );
}
