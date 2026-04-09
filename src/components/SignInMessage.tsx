import { Link } from "@tanstack/react-router";

export function SignInMessage() {
  return (
    <section className="rounded-[1.45rem] border border-(--line) bg-[radial-gradient(circle_at_86%_22%,rgba(221,107,32,0.16)_0,transparent_39%),linear-gradient(130deg,var(--surface)_0%,#fff8e8_100%)] p-[clamp(1.2rem,3vw,2.2rem)] shadow-[0_18px_40px_rgba(145,95,36,0.11)] max-sm:rounded-[1.05rem]">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="motion-safe:delay-75 motion-safe:transition motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:starting:translate-y-2 motion-safe:starting:scale-[0.99] motion-safe:starting:opacity-0">
          <h1 className="m-0 font-(--font-display) text-[clamp(2rem,5vw,3.2rem)] leading-[1.02] tracking-[-0.02em] text-[#2f2518]">
            Sign in to add joke
          </h1>
          <p className="mt-3 max-w-[48ch] text-[clamp(0.98rem,2vw,1.1rem)] text-(--ink-soft)">
            Joke submission is available to signed in users only.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/signin"
              className="rounded-full border border-[#d9cbb3] bg-[#fffdf8] px-3 py-1.5 font-semibold text-[#6e5c47] no-underline transition-colors duration-150 hover:border-[#c8b393] hover:text-[#4b3b28]"
            >
              Signin
            </Link>
            <Link
              to="/signup"
              className="rounded-full border border-[#d78a41] bg-[linear-gradient(180deg,#ee9a49_0%,#d77420_100%)] px-3 py-1.5 font-semibold text-[#fff9f2] no-underline shadow-[0_6px_12px_rgba(180,83,9,0.2)] transition-[transform,box-shadow] duration-150 ease-in-out hover:-translate-y-px hover:shadow-[0_8px_14px_rgba(180,83,9,0.28)]"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
