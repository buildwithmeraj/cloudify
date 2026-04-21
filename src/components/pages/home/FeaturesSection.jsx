const features = [
  {
    title: "Cloudinary File Explorer",
    description:
      "Browse uploaded assets, inspect URLs, and keep file operations inside one focused page.",
  },
  {
    title: "Key Management",
    description:
      "Organize Cloudinary credentials and public keys with names that map to your project buckets.",
  },
  {
    title: "Authentication Included",
    description:
      "Built-in auth keeps user dashboards isolated while still allowing public-key based file API flows.",
  },
  {
    title: "Fast Developer Flow",
    description:
      "Reduce context switching between dashboard setup, API testing, and content delivery steps.",
  },
  {
    title: "Provider-Ready Dashboard",
    description:
      "Files and keys areas are structured for future providers such as Cloudflare R2.",
  },
  {
    title: "Ready for Growth",
    description:
      "Use this as a practical base for analytics, teams, audit logs, and automation features.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="mt-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-base-content sm:text-3xl">
            What You Can Do
          </h2>
          <p className="mt-2 max-w-2xl text-base-content/70">
            Cloudify focuses on the operational pieces teams need first: secure
            key setup, reliable file handling, and fast link reuse.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
          >
            <h3 className="text-lg font-bold text-base-content">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-base-content/70">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
