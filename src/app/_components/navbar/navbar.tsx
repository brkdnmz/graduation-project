import Link from "next/link";
import { ProfileButton } from "../profile-button";
import { navs } from "./navs";

export function Navbar() {
  return (
    <header className="sticky z-50 bg-gradient-to-b from-white/5 py-3">
      <div className="container flex items-center">
        <Link
          href="/"
          title="Return to home page"
          className="mr-4 flex items-center self-stretch py-1 pr-2 opacity-50 transition-opacity hover:opacity-100"
        >
          <h1 className="text-2xl font-extrabold text-slate-300">
            CompeVision
          </h1>
        </Link>

        <nav className="flex grow items-center gap-3">
          {navs.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              title={nav.title ?? nav.label}
              className="flex items-center self-stretch text-2xl text-slate-300 opacity-50 transition-opacity hover:opacity-100"
            >
              {nav.label}
            </Link>
          ))}
        </nav>
        <ProfileButton />
      </div>
    </header>
  );
}
