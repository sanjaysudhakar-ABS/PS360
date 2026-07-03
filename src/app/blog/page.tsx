import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Insights & Resources",
  description:
    "Expert insights on customer experience, customer success, and support operations to help you stay ahead of the curve.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Insights", url: `${siteConfig.url}/blog` },
        ]}
      />

      <section className="bg-brand-950/[0.02] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight text-brand-950 sm:text-5xl">
            Insights &amp; resources
          </h1>
          <p className="mt-5 text-lg text-brand-800/70">
            Expert insights on customer experience, customer success, and
            support operations — published weekly.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 rounded-xl border border-black/10 p-7 transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-accent-500">
                    <span>{post.category}</span>
                    <span className="text-brand-800/40">
                      {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-brand-800/40">
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-brand-950">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-brand-800/70">
                    {post.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent-500 transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
