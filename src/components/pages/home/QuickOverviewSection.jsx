const QuickOverviewSection = () => {
  return (
    <section className="mt-14">
      <p className="mb-2 text-2xl font-extrabold text-base-content sm:text-3xl">
        Quick Overview
      </p>
      <p className="mb-4 max-w-3xl text-sm text-base-content/70 sm:text-base">
        Cloudify is built for teams that want one workflow across multiple media
        providers. Right now the production-ready flow is Cloudinary, with the
        architecture prepared for upcoming providers.
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-base-300 bg-base-200 p-4">
          <p className="text-sm font-semibold text-base-content">
            1. Connect providers securely
          </p>
          <p className="mt-1 text-sm text-base-content/70">
            Save Cloudinary account keys and public access keys so uploads and
            file APIs work without hardcoding secrets in your frontend.
          </p>
        </div>
        <div className="rounded-xl border border-base-300 bg-base-200 p-4">
          <p className="text-sm font-semibold text-base-content">
            2. Run upload + file operations
          </p>
          <p className="mt-1 text-sm text-base-content/70">
            Upload media, list existing files, preview assets, and delete
            selected files from a single dashboard flow.
          </p>
        </div>
        <div className="rounded-xl border border-base-300 bg-base-200 p-4">
          <p className="text-sm font-semibold text-base-content">
            3. Reuse URLs in products
          </p>
          <p className="mt-1 text-sm text-base-content/70">
            Keep links ready for websites, apps, email templates, and docs
            while your media library stays organized by bucket name.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickOverviewSection;
