import { Spinner } from "~/components/spinner";

export function PageLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Spinner />
      <p className="text-slate-500">Loading...</p>
    </div>
  );
}
