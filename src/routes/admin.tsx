import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Nav, Footer } from "@/components/site-chrome";
import { slugify, formatDate } from "@/lib/blog-format";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Blog Admin | Technical Quality Solutions LLC" },
      { name: "description", content: "Private page for writing and publishing blog articles." },
      { property: "og:title", content: "Blog Admin | Technical Quality Solutions LLC" },
      { property: "og:description", content: "Private page for writing and publishing blog articles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Post = { id: string; slug: string; title: string; excerpt: string; body: string; published: boolean; published_at: string | null };
const empty = { id: "", slug: "", title: "", excerpt: "", body: "", published: false, published_at: null } as Post;
const input = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm";
const btn = "rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(false); return; }
    supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-16">
        {!ready ? null : !session ? <SignIn /> : !isAdmin ? (
          <div className="text-center">
            <p className="text-muted-foreground">This account doesn't have permission to write articles.</p>
            <button className="mt-4 underline" onClick={() => supabase.auth.signOut()}>Sign out</button>
          </div>
        ) : <Editor email={session.user.email ?? ""} />}
      </main>
      <Footer />
    </div>
  );
}

function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault(); setMsg("");
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      setMsg(error ? error.message : "Check your email to confirm your account, then sign in.");
    }
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-2xl border border-border bg-card p-8">
      <h1 className="text-2xl text-primary">{mode === "in" ? "Sign in to write" : "Create owner account"}</h1>
      <input className={input} type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={input} type="password" required minLength={8} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className={btn + " w-full"}>{mode === "in" ? "Sign in" : "Create account"}</button>
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      <button type="button" className="text-sm underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "First time? Create the owner account" : "Have an account? Sign in"}
      </button>
    </form>
  );
}

function Editor({ email }: { email: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState<Post>(empty);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await supabase.from("posts").select("id, slug, title, excerpt, body, published, published_at").order("created_at", { ascending: false });
    setPosts((data as Post[]) ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save(publish: boolean) {
    setSaving(true); setMsg("");
    const slug = draft.slug || slugify(draft.title);
    const row = {
      slug, title: draft.title, excerpt: draft.excerpt, body: draft.body, published: publish,
      published_at: publish ? (draft.published_at ?? new Date().toISOString()) : draft.published_at,
      updated_at: new Date().toISOString(),
    };
    const res = draft.id ? await supabase.from("posts").update(row).eq("id", draft.id) : await supabase.from("posts").insert(row);
    setSaving(false);
    if (res.error) { setMsg(res.error.message); return; }
    setMsg(publish ? `Published! Share this link: ${window.location.origin}/blog/${slug}` : "Saved as draft.");
    setDraft(empty); load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this article?")) return;
    await supabase.from("posts").delete().eq("id", id); load();
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-primary">Blog articles</h1>
        <div className="text-sm text-muted-foreground">{email} · <button className="underline" onClick={() => supabase.auth.signOut()}>Sign out</button></div>
      </div>
      <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg text-primary">{draft.id ? "Edit article" : "New article"}</h2>
        <input className={input} placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <input className={input} placeholder={`Link name (optional) — ${slugify(draft.title) || "auto-from-title"}`} value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: slugify(e.target.value) })} />
        <textarea className={input} rows={2} placeholder="Short summary (shown in the list and LinkedIn previews)" value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
        <textarea className={input} rows={14} placeholder="Article text. Leave a blank line between paragraphs." value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
        <div className="flex flex-wrap gap-3">
          <button className={btn} disabled={saving || !draft.title} onClick={() => save(true)}>Publish</button>
          <button className="rounded-full border border-border px-5 py-2 text-sm" disabled={saving || !draft.title} onClick={() => save(false)}>Save draft</button>
          {draft.id && <button className="text-sm underline" onClick={() => setDraft(empty)}>Cancel</button>}
        </div>
        {msg && <p className="break-all text-sm text-muted-foreground">{msg}</p>}
      </div>
      <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
        {posts.length === 0 && <li className="p-6 text-sm text-muted-foreground">No articles yet.</li>}
        {posts.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="font-medium text-foreground">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.published ? `Published ${formatDate(p.published_at)}` : "Draft"} · /blog/{p.slug}</p>
            </div>
            <div className="flex gap-4 text-sm">
              {p.published && <Link to="/blog/$slug" params={{ slug: p.slug }} className="underline">View</Link>}
              <button className="underline" onClick={() => setDraft(p)}>Edit</button>
              <button className="underline" onClick={() => remove(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
