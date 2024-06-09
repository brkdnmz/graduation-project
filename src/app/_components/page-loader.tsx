import { Spinner } from "~/components/spinner";

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
