import Link from "next/link";

export function Navbar() {
  return (
    <header className="mx-4 flex items-center pt-4">
      <Link
        href="/"
        title="Return to home page"
        className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
      >
        <h1 className="text-2xl font-extrabold text-slate-300">CompeVision</h1>
      </Link>

      <nav className="flex grow items-center justify-end gap-10">
        <Link
          href="/auth/signup"
          title="Sign Up"
          className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
        >
          <h1 className="text-2xl text-slate-300">Sign Up</h1>
        </Link>
        <Link
          href="/auth/login"
          title="Log In"
          className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
        >
          <h1 className="text-2xl text-slate-300">Log In</h1>
        </Link>
      </nav>
    </header>
  );
}
