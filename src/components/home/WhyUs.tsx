import { Search, Target, Settings, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery & Assessment",
    description:
      "Comprehensive analysis of your current customer experience and identification of improvement opportunities, grounded in your support, success, and usage data.",
  },
  {
    icon: Target,
    title: "Strategy Development",
    description:
      "A custom strategy aligned with your business goals and customer needs, with a clear roadmap and priorities ranked by revenue impact.",
  },
  {
    icon: Settings,
    title: "Implementation",
    description:
      "Hands-on execution with your team — playbooks, tooling, and training — ensuring proper adoption, not just a strategy deck.",
  },
  {
    icon: TrendingUp,
    title: "Optimization",
    description:
      "Continuous monitoring and refinement through your first measurement cycles to maximize results and keep improvements compounding.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-brand-950/[0.02] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-500">
            How we work
          </h2>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
            A proven methodology for customer experience transformation.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title}>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-950 text-white">
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-accent-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-brand-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-800/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
