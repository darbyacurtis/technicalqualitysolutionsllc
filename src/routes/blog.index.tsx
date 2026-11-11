import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav, Footer } from "@/components/site-chrome";
import { listPublishedPosts } from "@/lib/posts.functions";
import { formatDate } from "@/lib/blog-format";

const TITLE = "Blog | Technical Quality Solutions LLC";
const DESC = "Articles on food safety, quality systems, audit readiness, and process control from Technical Quality Solutions LLC.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => listPublishedPosts(),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">Insights</p>
        <h1 className="mt-3 text-4xl text-primary md:text-5xl">Blog</h1>
        <p className="mt-4 text-muted-foreground">Practical thoughts on food safety, quality systems, and audit readiness.</p>
        {posts.length === 0 ? (
          <p className="mt-14 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            New articles are coming soon. Check back shortly.
          </p>
        ) : (
          <ul className="mt-14 space-y-6">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block rounded-2xl border border-border bg-card p-8 transition hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{formatDate(p.published_at)}</p>
                  <h2 className="mt-2 text-2xl text-primary">{p.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read article <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
