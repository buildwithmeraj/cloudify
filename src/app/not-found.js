import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] w-full max-w-3xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
        <h2 className="text-5xl font-semibold text-base-content/70">404</h2>
        <h1 className="mt-2 text-2xl font-bold text-base-content sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-base-content/70 sm:text-base">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-6">
          <Link href="/" className="btn btn-primary">
            Go back home
          </Link>
        </div>
      </div>
    </section>
  );
}
