import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Nav, Footer } from "@/components/site-chrome";
import { getPublishedPost } from "@/lib/posts.functions";
import { formatDate, toParagraphs } from "@/lib/blog-format";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPublishedPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found | Technical Quality Solutions LLC" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.title} | Technical Quality Solutions LLC`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl text-primary">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-primary underline">Back to the blog</Link>
      </main>
      <Footer />
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <article className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> All articles
        </Link>
        <p className="mt-8 text-xs uppercase tracking-wider text-muted-foreground">{formatDate(post.published_at)}</p>
        <h1 className="mt-2 text-4xl text-primary md:text-5xl">{post.title}</h1>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground">
          {toParagraphs(post.body).map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </article>
      <Footer />
    </div>
  );
}
