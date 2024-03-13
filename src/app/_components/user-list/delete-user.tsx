import { FaTrash } from "react-icons/fa";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export function DeleteUser({ id }: { id: number }) {
  const deleteUser = api.user.deleteUser.useMutation();
  const trpcUtils = api.useUtils();
  const { toast } = useToast();

  const onDeleteUser = () => {
    deleteUser.mutate(
      { id },
      {
        onSuccess: ({ username }) => {
          void trpcUtils.user.getAll.invalidate();
          toast({
            variant: "destructive",
            title: "User deleted",
            description: `Deleted ${username}`,
            duration: 2000,
          });
        },
      },
    );
  };

  return (
    <form action={onDeleteUser}>
      <button title="Delete user">
        <FaTrash color="blue" />
      </button>
    </form>
  );
}
