import { api } from "~/trpc/server";
import { RegisterButton } from "../_components/register-button";

export default async function ContestPage({
  params,
}: {
  params: { contestId: string };
}) {
  const contestId = Number(params.contestId);
  const contest = await api.contest.getById.query({
    id: contestId,
  });

  if (!contest) {
    return <h1>Contest not found</h1>;
  }

  return (
    <div className="space-y-4">
      <h1>{contest?.name}</h1>
      <RegisterButton contest={contest} />
    </div>
  );
}
