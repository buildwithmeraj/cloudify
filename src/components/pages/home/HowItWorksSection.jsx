const steps = [
  {
    title: "Create your account",
    description:
      "Sign up once to get a private workspace where keys and files are isolated by user.",
  },
  {
    title: "Add your API keys",
    description:
      "Register Cloudinary credentials plus a public API key name pair used for file APIs.",
  },
  {
    title: "Operate your media",
    description:
      "Upload, browse, preview, and bulk-delete media while keeping everything grouped by bucket name.",
  },
  {
    title: "Ship with confidence",
    description:
      "Use secure Cloudinary URLs directly in your apps, docs, and client projects with less manual work.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="mt-14">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-base-content sm:text-3xl">
          How Cloudify Works
        </h2>
        <p className="mt-2 max-w-2xl text-base-content/70">
          The workflow is intentionally short: connect keys, run file actions,
          and reuse URLs. This keeps onboarding fast for both solo devs and
          teams.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold text-base-content">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-base-content/70">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
