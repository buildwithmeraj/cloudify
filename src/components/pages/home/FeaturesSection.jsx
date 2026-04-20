const features = [
  {
    title: "Cloudinary File Explorer",
    description:
      "See your uploaded assets and manage your media workflow from one screen.",
  },
  {
    title: "Key Management",
    description:
      "Save Cloudinary and public keys with a structure designed for real projects.",
  },
  {
    title: "Authentication Included",
    description:
      "Built-in login and registration keep each user’s dashboard isolated.",
  },
  {
    title: "Fast Developer Flow",
    description:
      "Use fewer tools and context switches when handling uploads and asset links.",
  },
  {
    title: "Clean Dashboard UX",
    description:
      "Straightforward pages for keys and files so onboarding is quick for any team.",
  },
  {
    title: "Ready for Growth",
    description:
      "A practical foundation you can extend with analytics, teams, and automation.",
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
            Cloudify gives you the essentials needed to work confidently with media.
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
