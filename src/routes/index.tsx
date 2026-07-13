import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Leaf, Utensils, ShieldCheck, ClipboardCheck, FlaskConical, BookOpenCheck, ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

// Replace with your real Calendly link. Format: https://calendly.com/your-handle/intro-call
const CALENDLY_URL = "https://calendly.com/technicalqualitysolutionsllc/consultation";
const EMAIL = "technicalqualitysolutionsllc@gmail.com";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Trust />
      <Services />
      <Approach />
      <Booking />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          Technical Quality Solutions LLC
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#approach" className="hover:text-foreground">Our Approach</a>
          <a href="#book" className="hover:text-foreground">Contact Us</a>
        </nav>
        <a
          href="#book"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Schedule <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.05fr_1fr] md:pt-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Cannabis & Food Quality Consulting
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-primary md:text-6xl">
            Quality systems that <em className="not-italic text-accent">hold up</em> to inspection, market, and time.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Technical Quality Solutions LLC helps businesses build effective audit-ready
            quality programs — Starting from the basics with implementing GMP all the way
            to control systems to ensure your operation is performing as it should. Each
            step of the process led by hands on and knowledgeable professionals.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
            >
              Schedule a consultation <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
            >
              <Mail className="h-4 w-4" /> Email us
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
          {[
            { label: "Industries", value: (
              <>
                Cannabis&nbsp;<br />
                Ready to Eat Foods
                <div className="text-sm font-sans font-normal text-muted-foreground mt-0.5">Food Processing</div>
              </>
            )},
            { label: "Focus", value: "Problem Solving Quality Systems Audit Readiness" },
            { label: "Credentials", value: (
              <>
                PCQI<br />
                HACCP<br />
                Seafood HACCP · GMP · Lean Six Sigma Green Belt
                <div className="text-sm font-sans font-normal text-muted-foreground mt-0.5">
                  Seafood HACCP Advanced SQF&nbsp;<br />
                  Lean Six Sigma
                </div>
              </>
            )},
          ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</dt>
                <dd className="mt-1 font-display text-base text-primary">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/10 blur-2xl" aria-hidden />
          <img
            src={heroImg}
            alt="Quality consultant reviewing cannabis and food samples in a laboratory"
            width={1600}
            height={1104}
            className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
          />
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    "FDA & cGMP Compliance",
    "PCQI Certified",
    "HACCP & Seafood HACCP",
    "Lean Six Sigma Green Belt",
    "State Cannabis Licensing",
    "SQF PREP",
    "SUPPLIER AUDITS & LABEL REVIEW",
  ];
  return (
    <section className="border-y border-border bg-cream/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {items.map((i) => (
          <span key={i} className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> {i}
          </span>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Leaf,
      title: "Cannabis Quality & Compliance",
      body: "Cultivation, extraction, and infused-product operators trust us to design SOPs, track-and-trace workflows, and state-ready quality programs.",
      points: ["Metrc & state audits", "GMP for cannabis", "Testing & COA review"],
    },
    {
      icon: Utensils,
      title: "Food Safety & Manufacturing",
      body: "From co-manufacturers to specialty brands, we build risk-based food safety plans that pass FDA, third-party, and retailer audits.",
      points: ["HACCP / FSMA plans", "SQF & BRCGS readiness", "Recall & mock traceability"],
    },
    {
      icon: ShieldCheck,
      title: "Audits, Training & Interim QA",
      body: "Gap assessments, staff training, and fractional QA leadership when you need experienced quality direction without a full-time hire.",
      points: ["Mock audits", "Team training", "Fractional QA/QC lead"],
    },
  ];
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">What we do</p>
        <h2 className="mt-3 text-4xl text-primary md:text-5xl">
          Two regulated industries. One quality standard.
        </h2>
        <p className="mt-4 text-muted-foreground">
          We work with growers, processors, co-manufacturers, and consumer brands to translate
          regulation into practical, day-to-day quality systems.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="group relative flex flex-col rounded-2xl border border-border bg-card p-8 transition hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-xl text-primary">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-foreground">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" /> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    { icon: ClipboardCheck, title: "Assess", body: "A structured gap analysis of your current programs against regulatory and commercial requirements." },
    { icon: FlaskConical, title: "Design", body: "Practical SOPs, plans, and controls tailored to your facility, product, and team." },
    { icon: BookOpenCheck, title: "Sustain", body: "Training, internal audits, and ongoing support so your quality system stays audit-ready." },
  ];
  return (
    <section id="approach" className="bg-cream/60">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div className="md:sticky md:top-28">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Approach</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">A calm, methodical path to compliance.</h2>
          <p className="mt-4 text-muted-foreground">
            No jargon dumps. No binder that never gets opened. We embed with your team and leave
            behind systems people actually use.
          </p>
        </div>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="flex gap-5 rounded-2xl border border-border bg-background p-6"
            >
              <div className="flex flex-col items-center">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="mt-2 text-xs font-medium text-muted-foreground">0{i + 1}</span>
              </div>
              <div>
                <h3 className="text-xl text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Booking() {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section id="book" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Book a call</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">
            Let's talk about your quality program.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pick a time that works for you. Free 30-minute intro to understand your operation,
            current gaps, and the fastest path forward.
          </p>
          <div className="mt-8 space-y-3 rounded-2xl border border-border bg-card p-6 text-sm">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-foreground hover:text-primary">
              <Mail className="h-4 w-4 text-accent" /> {EMAIL}
            </a>
            <p className="text-muted-foreground">
              Prefer email? Send a note and we'll reply within one business day.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <div
            className="calendly-inline-widget"
            data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=fdfaf3&text_color=1f2a24&primary_color=3d6b4f`}
            style={{ minWidth: "320px", height: "720px" }}
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary-foreground/10">
            <Leaf className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-base">Technical Quality Solutions LLC</p>
            <p className="text-xs text-primary-foreground/70">Cannabis & Food Quality Consulting</p>
          </div>
        </div>
        <div className="text-sm text-primary-foreground/80">
          <a href={`mailto:${EMAIL}`} className="hover:text-primary-foreground">{EMAIL}</a>
        </div>
        <p className="text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Technical Quality Solutions LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
