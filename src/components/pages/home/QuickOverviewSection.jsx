const QuickOverviewSection = () => {
  return (
    <section className="mt-14">
      <p className="mb-3 text-2xl font-extrabold text-base-content sm:text-3xl">
        Quick Overview
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-base-300 bg-base-200 p-4">
          <p className="text-sm font-semibold text-base-content">1. Add keys</p>
          <p className="mt-1 text-sm text-base-content/70">
            Save Cloudinary credentials and public keys from one place.
          </p>
        </div>
        <div className="rounded-xl border border-base-300 bg-base-200 p-4">
          <p className="text-sm font-semibold text-base-content">
            2. Upload media
          </p>
          <p className="mt-1 text-sm text-base-content/70">
            Send images or files through the app and keep your flow focused.
          </p>
        </div>
        <div className="rounded-xl border border-base-300 bg-base-200 p-4">
          <p className="text-sm font-semibold text-base-content">
            3. Reuse everywhere
          </p>
          <p className="mt-1 text-sm text-base-content/70">
            Copy links and integrate assets into websites, apps, and docs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickOverviewSection;
