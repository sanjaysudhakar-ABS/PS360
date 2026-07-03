import { siteConfig } from "@/lib/site-config";

export function Stats() {
  return (
    <section className="border-b border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <dt className="text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-brand-800/70">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
