import Link from "next/link";

const QuickStartSection = () => {
  return (
    <section className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <article className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-base-content">
          2-Minute Quick Start
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-base-content/70">
          <li>
            <span className="font-semibold text-base-content">1.</span> Register or
            login to your account.
          </li>
          <li>
            <span className="font-semibold text-base-content">2.</span> Add your
            Cloudinary credentials from the keys section.
          </li>
          <li>
            <span className="font-semibold text-base-content">3.</span> Go to the
            Cloudinary files page and upload your media.
          </li>
          <li>
            <span className="font-semibold text-base-content">4.</span> Copy and use
            generated links in your app or website.
          </li>
        </ol>
      </article>

      <article className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <p className="text-xs font-semibold text-base-content/70">
          Start Now
        </p>
        <h3 className="mt-2 text-2xl font-black text-base-content">
          Ready to simplify media management?
        </h3>
        <p className="mt-2 text-sm text-base-content/70">
          Create your account and get a clean Cloudinary workflow in minutes.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/register" className="btn btn-neutral">
            Create Account
          </Link>
          <Link href="/login" className="btn btn-outline">
            Login
          </Link>
          <Link href="/docs" className="btn btn-ghost">
            API Docs
          </Link>
        </div>
      </article>
    </section>
  );
};

export default QuickStartSection;
