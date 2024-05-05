import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export function CreateContestButton() {
  return (
    <Button className="h-auto py-2.5" variant="secondary" asChild>
      <Link href="/contest/create">
        <Plus className="text-slate-500" />
        <span className="text-base text-slate-400">Create</span>
      </Link>
    </Button>
  );
}
