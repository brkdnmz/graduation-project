import Link from "next/link";
import { AuthButtons } from "./auth-buttons";
import { VisibleIfAuthorized } from "./visible-if-authorized";

export function Navbar() {
  return (
    <header className="flex items-center py-4">
      <Link
        href="/"
        title="Return to home page"
        className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
      >
        <h1 className="text-2xl font-extrabold text-slate-300">CompeVision</h1>
      </Link>

      <nav className="flex grow items-center justify-end gap-10">
        <VisibleIfAuthorized>
          <Link
            href="/contest/create"
            title="Create Contest"
            className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
          >
            <h1 className="text-2xl text-slate-300">Create Contest</h1>
          </Link>
        </VisibleIfAuthorized>
        <AuthButtons />
      </nav>
    </header>
  );
}
