import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-8 lg:p-10">
      <div>
        <h1 className="text-2xl font-black leading-tight text-base-content sm:text-4xl lg:text-5xl">
          One dashboard to upload, manage, and serve media from Cloudinary.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-base-content/70 sm:mt-5 sm:text-base lg:text-lg">
          Cloudify helps teams work with media faster. Connect your keys once,
          upload files, browse assets, and reuse links without jumping between
          tools.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href="/register" className="btn btn-primary w-full sm:w-auto">
            Get Started Free
          </Link>
          <Link
            href="/dashboard/files/cloudinary"
            className="btn btn-outline w-full sm:w-auto"
          >
            Open File Manager
          </Link>
        </div>

        <div className="mt-6 grid gap-2 text-sm text-base-content/70 sm:flex sm:flex-wrap sm:gap-5">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success" />
            API key vault support
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-info" />
            Upload and list Cloudinary files
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-warning" />
            Built for solo devs and teams
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
