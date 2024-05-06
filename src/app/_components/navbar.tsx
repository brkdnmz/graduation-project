import Link from "next/link";
import { ProfileButton } from "./profile-button";

export function Navbar() {
  return (
    <header className="flex items-center px-4 py-4">
      <Link
        href="/"
        title="Return to home page"
        className="mr-4 flex items-center self-stretch px-2 py-1 opacity-50 transition-opacity hover:opacity-100"
      >
        <h1 className="text-2xl font-extrabold text-slate-300">CompeVision</h1>
      </Link>

      <nav className="flex grow items-center gap-10">
        <Link
          href="/contest/list"
          title="Contests Page"
          className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
        >
          <h1 className="text-2xl text-slate-300">Contests</h1>
        </Link>
      </nav>
      <ProfileButton />
    </header>
  );
}
