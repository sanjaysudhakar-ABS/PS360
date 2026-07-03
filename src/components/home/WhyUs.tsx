import { Target, Users2, LineChart } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "One partner, full scope",
    description:
      "Strategy, finance, HR, operations, and technology advisory from a single accountable team — no more stitching together five vendors who don't talk to each other.",
  },
  {
    icon: Users2,
    title: "Senior consultants, not just senior pitches",
    description:
      "The partner you meet in the first call is the person in your working sessions every week — not handed off to a junior team after signing.",
  },
  {
    icon: LineChart,
    title: "Built for execution, not just decks",
    description:
      "Every engagement includes implementation support and milestone reviews, so recommendations actually change how the business runs.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-brand-950/[0.02] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-500">
            Why PS360
          </h2>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
            Consulting that&apos;s built to be implemented, not just presented.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-950 text-white">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-brand-950">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-800/70">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
