const useCases = [
  {
    heading: "For Freelancers",
    points: [
      "Keep client media organized",
      "Share links without manual dashboard hopping",
      "Ship projects faster with reusable assets",
    ],
  },
  {
    heading: "For Product Teams",
    points: [
      "Centralize API key and media operations",
      "Create a repeatable upload workflow",
      "Reduce confusion between dev and non-dev roles",
    ],
  },
  {
    heading: "For Learners",
    points: [
      "Understand auth, API usage, and cloud file handling",
      "Practice real-world dashboard patterns",
      "Use as a starter for larger media platforms",
    ],
  },
];

const UseCasesSection = () => {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-extrabold text-base-content sm:text-3xl">
        Who Is It For?
      </h2>
      <p className="mt-2 max-w-2xl text-base-content/70">
        Cloudify is designed for anyone who wants a simpler way to handle
        Cloudinary media operations.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {useCases.map((item) => (
          <article
            key={item.heading}
            className="rounded-2xl border border-base-300 bg-base-100 p-5"
          >
            <h3 className="text-lg font-bold text-base-content">{item.heading}</h3>
            <ul className="mt-3 space-y-2 text-sm text-base-content/70">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UseCasesSection;
