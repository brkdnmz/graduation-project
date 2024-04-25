import { ContestList } from "~/app/contest/list/_components/contest-list";

export default function ContestListPage() {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-6 col-start-2">
        <ContestList />
      </div>
    </div>
  );
}
