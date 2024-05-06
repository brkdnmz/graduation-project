import { formatDuration, intervalToDuration } from "date-fns";
import type { RouterOutputs } from "~/trpc/shared";

function displayDate(date: Date) {
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function displayDuration(startDate: Date, endDate: Date) {
  return formatDuration(
    intervalToDuration({
      start: startDate,
      end: endDate,
    }),
    {
      format: ["years", "months", "weeks", "days", "hours", "minutes"],
      delimiter: ", ",
    },
  );
}

export function ContestListItem({
  contest,
}: {
  contest: RouterOutputs["contest"]["getAll"][number];
}) {
  return (
    <li className="space-y-5 rounded-xl bg-slate-800 p-4 text-slate-300">
      <div className="space-y-2">
        <div className="flex items-end gap-1">
          <h2 className="font-bold">{contest.name}</h2>
          <h5 className="pl-1 text-sm text-muted-foreground">{contest.type}</h5>
        </div>
        <h5 className="text-sm text-muted-foreground">
          by <span className="font-bold">{contest.creator.username}</span>
        </h5>
      </div>
      <div>
        <div>
          {displayDate(contest.startsAt)} — {displayDate(contest.endsAt)}
        </div>
        <div>{displayDuration(contest.startsAt, contest.endsAt)}</div>
      </div>
    </li>
  );
}
