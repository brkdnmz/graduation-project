import type { RouterOutputs } from "~/trpc/shared";
import { DeleteContest } from "./delete-contest";

export function ContestListItem({
  contest,
}: {
  contest: RouterOutputs["contest"]["getAll"][number];
}) {
  return (
    <li
      key={contest.id}
      className="flex flex-col gap-2 rounded-xl border border-slate-600 p-1"
    >
      <ul>
        <li>ID: {contest.id}</li>
        <li>Name: {contest.name}</li>
        <li>Type: {contest.type}</li>
        <li>Starts at: {contest.startsAt.toLocaleString()}</li>
        <li>Ends at: {contest.endsAt.toLocaleString()}</li>
        <li>Created at: {contest.createdAt.toLocaleString()}</li>
      </ul>
      <DeleteContest id={contest.id} />
    </li>
  );
}
