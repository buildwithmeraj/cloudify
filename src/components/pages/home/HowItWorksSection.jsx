const steps = [
  {
    title: "Create your account",
    description:
      "Sign up and log in to access your private Cloudify dashboard.",
  },
  {
    title: "Add your API keys",
    description:
      "Store Cloudinary and public keys so uploads and API calls are ready.",
  },
  {
    title: "Manage your files",
    description:
      "Upload media, browse your assets, and keep your cloud library organized.",
  },
  {
    title: "Deliver instantly",
    description:
      "Use Cloudinary URLs in your apps, websites, emails, or client projects.",
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
          Follow this simple workflow to move from setup to production quickly.
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
