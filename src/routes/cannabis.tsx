import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, ArrowRight, CheckCircle2 } from "lucide-react";
import { Nav, Footer } from "@/components/site-chrome";

const TITLE = "Cannabis Industry Experience | Technical Quality Solutions LLC";
const DESC = "Quality and compliance experience in cannabis cultivation, extraction, and infused products: SOPs, Metrc and state audits, testing and COA review.";

export const Route = createFileRoute("/cannabis")({
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
  component: CannabisPage,
});

const points = [
  "Metrc & state audits",
  "State cannabis licensing support",
  "SOPs for cultivation, extraction & infused products",
  "Testing & COA review",
  "Problem solving & process improvement",
  "Track-and-trace workflows",
];

function CannabisPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-24">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Leaf className="h-5 w-5" />
        </span>
        <p className="mt-6 text-xs font-medium uppercase tracking-widest text-accent">Cannabis industry experience</p>
        <h1 className="mt-3 text-4xl text-primary md:text-5xl">The same food-grade quality discipline, applied to cannabis.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Cultivation, extraction, and infused-product operators trust us to design SOPs,
          track-and-trace workflows, and state-ready quality programs. Our food safety background
          brings proven GMP and process control practices to a fast-moving, highly regulated industry.
        </p>
        <ul className="mt-10 grid gap-3 rounded-2xl border border-border bg-card p-8 sm:grid-cols-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {p}
            </li>
          ))}
        </ul>
        <Link
          to="/"
          hash="book"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Schedule a consultation <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
      <Footer />
    </div>
  );
}
