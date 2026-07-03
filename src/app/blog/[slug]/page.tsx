import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { CTASection } from "@/components/CTASection";
import {
  BlogPostingJsonLd,
  BreadcrumbJsonLd,
} from "@/components/StructuredData";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = getBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        author={post.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Insights", url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
        ]}
      />

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <nav className="text-sm text-brand-800/50">
            <Link href="/blog" className="hover:text-accent-500">
              Insights
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-800/80">{post.category}</span>
          </nav>

          <div className="mt-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-accent-500">
            <span>{post.category}</span>
            <span className="text-brand-800/40">
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-brand-800/40">{post.readingTime}</span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-brand-800/70">{post.description}</p>

          <div
            className="blog-prose mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-14 rounded-xl border border-black/10 bg-brand-950/[0.02] p-7">
            <p className="font-semibold text-brand-950">
              Want help applying this to your business?
            </p>
            <p className="mt-2 text-sm text-brand-800/70">
              Book a free consultation with a {siteConfig.name} advisor.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-500"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {otherPosts.length > 0 && (
            <div className="mt-16 border-t border-black/10 pt-10">
              <h2 className="text-lg font-semibold text-brand-950">
                Related reading
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="rounded-xl border border-black/10 p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-accent-500">
                      {p.category}
                    </p>
                    <h3 className="mt-2 font-semibold text-brand-950">
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTASection />
    </>
  );
}
