const useCases = [
  {
    heading: "For Freelancers",
    points: [
      "Keep each client’s media organized by key name and bucket",
      "Share secure asset links without manual dashboard hopping",
      "Ship websites faster with reusable media pipelines",
    ],
  },
  {
    heading: "For Product Teams",
    points: [
      "Centralize key setup and media operations in one internal tool",
      "Create repeatable upload/list/delete workflows across environments",
      "Reduce handoff confusion between engineering and content teams",
    ],
  },
  {
    heading: "For Learners",
    points: [
      "Learn practical auth and API key patterns used in real apps",
      "Practice building dashboard UX around real backend contracts",
      "Use it as a starter for multi-provider media platforms",
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
        Cloudify is useful anywhere media workflows become repetitive and
        error-prone. It gives structure to keys, uploads, and file lifecycle
        actions.
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
