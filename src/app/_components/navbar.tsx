import Link from "next/link";
import { env } from "~/env";
import { ProfileButton } from "./profile-button";

export function Navbar() {
  return (
    <header className="flex items-center py-4">
      <Link
        href="/"
        title="Return to home page"
        className="mr-4 flex items-center self-stretch py-1 pr-2 opacity-50 transition-opacity hover:opacity-100"
      >
        <h1 className="text-2xl font-extrabold text-slate-300">CompeVision</h1>
      </Link>

      <nav className="flex grow items-center gap-3">
        <Link
          href="/contest/list"
          title="Contests Page"
          className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
        >
          <h1 className="text-2xl text-slate-300">Contests</h1>
        </Link>

        {env.NODE_ENV === "development" && (
          <Link
            href="/dev-tools"
            className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
          >
            <h1 className="text-2xl text-slate-300">Dev Tools</h1>
          </Link>
        )}
      </nav>
      <ProfileButton />
    </header>
  );
}
