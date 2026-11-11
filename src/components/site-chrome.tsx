import { Link } from "@tanstack/react-router";
import { Leaf, ArrowRight } from "lucide-react";

export const EMAIL = "technicalqualitysolutionsllc@gmail.com";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          Technical Quality Solutions LLC
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link to="/" hash="services" className="hover:text-foreground">Services</Link>
          <Link to="/" hash="approach" className="hover:text-foreground">Our Approach</Link>
          <Link to="/cannabis" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>Cannabis</Link>
          <Link to="/blog" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>Blog</Link>
          <Link to="/" hash="book" className="hover:text-foreground">Contact Us</Link>
        </nav>
        <Link
          to="/"
          hash="book"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Schedule <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary-foreground/10">
            <Leaf className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-base">Technical Quality Solutions LLC</p>
            <p className="text-xs text-primary-foreground/70">Food Safety & Quality Consulting</p>
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
