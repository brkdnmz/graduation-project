import type { RouterOutputs } from "~/trpc/shared";
import { DeleteContest } from "./delete-contest";

export function ContestListItem({
  contest,
}: {
  contest: RouterOutputs["contest"]["getAll"][number];
}) {
  const displayDate = (date: Date) =>
    date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <li
      key={contest.id}
      className="flex flex-col gap-2 rounded-xl border border-slate-600 p-1"
    >
      <ul>
        <li>ID: {contest.id}</li>
        <li>Name: {contest.name}</li>
        <li>Type: {contest.type}</li>
        <li>
          <span className="inline-block w-20">Starts at:</span>{" "}
          {displayDate(contest.startsAt)}
        </li>
        <li>
          <span className="inline-block w-20">Ends at:</span>{" "}
          {displayDate(contest.endsAt)}
        </li>
        <li>
          <span className="inline-block w-20">Created at:</span>{" "}
          {displayDate(contest.createdAt)}
        </li>
      </ul>
      <DeleteContest id={contest.id} />
    </li>
  );
}
