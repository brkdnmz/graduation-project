import { FaPlus } from "react-icons/fa";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export function AddUser() {
  const createRandomUser = api.user.createRandomUser.useMutation();
  const trpcUtils = api.useUtils();
  const { toast } = useToast();

  const onAddUser = async () => {
    createRandomUser.mutate(undefined, {
      onSuccess: ({ username }) => {
        void trpcUtils.user.getAll.invalidate();
        toast({
          variant: "default",
          title: "New random user",
          description: `Added ${username}`,
          duration: 2000,
        });
      },
    });
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
