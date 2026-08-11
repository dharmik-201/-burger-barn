import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { fetchGalleryImages } from "@/lib/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Owner Dashboard — Thicksip Cafe" },
      { name: "description", content: "Private dashboard for managing Thicksip Cafe gallery and menu images." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Owner Dashboard — Thicksip Cafe" },
      { property: "og:description", content: "Private dashboard for Thicksip Cafe staff." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return <Shell><p className="text-sm text-muted-foreground">Loading…</p></Shell>;
  }

  return <Shell>{session ? <Dashboard /> : <AuthCard />}</Shell>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-4xl px-5 py-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Private</p>
            <h1 className="text-4xl">Owner Dashboard</h1>
          </div>
          <Link to="/" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary">
            Back to site
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}

function AuthCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your email to confirm the account, then sign in.");
          setMode("signin");
          return;
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="surface-card mx-auto max-w-sm space-y-4 p-7">
      <h2 className="text-3xl">{mode === "signin" ? "Owner sign in" : "Create owner account"}</h2>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" variant="hero" className="w-full" disabled={busy}>
        {mode === "signin" ? "Sign in" : "Sign up"}
      </Button>
      <button
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="w-full text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
      >
        {mode === "signin" ? "Need an account?" : "Already have an account?"}
      </button>
    </form>
  );
}

function Dashboard() {
  const queryClient = useQueryClient();
  const [section, setSection] = useState("gallery");
  const [caption, setCaption] = useState("");

  const roleQuery = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    },
  });

  const imagesQuery = useQuery({
    queryKey: ["gallery", "all"],
    queryFn: () => fetchGalleryImages(),
    enabled: roleQuery.data === true,
  });

  const claim = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc("claim_admin");
      if (error) throw error;
      if (!data) throw new Error("An owner account already exists.");
      return data;
    },
    onSuccess: () => {
      toast.success("Admin access granted.");
      queryClient.invalidateQueries({ queryKey: ["is-admin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const upload = useMutation({
    mutationFn: async (file: File) => {
      const path = `${section}/${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (upErr) throw upErr;
      const { error } = await supabase.from("gallery_images").insert({
        url: "",
        storage_path: path,
        caption: caption || null,
        section,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Image uploaded.");
      setCaption("");
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async ({ id, path }: { id: string; path: string | null }) => {
      if (path) await supabase.storage.from("gallery").remove([path]);
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Image removed.");
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (roleQuery.isLoading) return <p className="text-sm text-muted-foreground">Checking access…</p>;

  if (!roleQuery.data) {
    return (
      <div className="surface-card space-y-4 p-7">
        <h2 className="text-3xl">No admin access yet</h2>
        <p className="text-sm text-muted-foreground">
          This account is signed in but not marked as the cafe owner. If you are setting up the site for the first
          time, claim owner access below — it works only while no owner exists.
        </p>
        <div className="flex gap-3">
          <Button variant="hero" onClick={() => claim.mutate()} disabled={claim.isPending}>
            Claim owner access
          </Button>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="surface-card space-y-4 p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl">Upload an image</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Images live in a private bucket and are served through short-lived signed links.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
            Sign out
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <select
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="gallery">Gallery</option>
              <option value="menu">Menu</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption">Caption (optional)</Label>
            <Input id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Image file</Label>
          <Input
            id="file"
            type="file"
            accept="image/*"
            disabled={upload.isPending}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload.mutate(file);
              e.target.value = "";
            }}
          />
          {upload.isPending ? <p className="text-xs text-muted-foreground">Uploading…</p> : null}
        </div>
      </div>

      <div className="surface-card p-7">
        <h2 className="text-3xl">Manage images</h2>
        {imagesQuery.data && imagesQuery.data.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {imagesQuery.data.map((img) => (
              <figure key={img.id} className="overflow-hidden rounded-xl border border-border">
                <img src={img.displayUrl} alt={img.caption ?? "Gallery image"} className="h-36 w-full object-cover" />
                <figcaption className="space-y-2 p-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{img.section}</p>
                  <p className="text-sm">{img.caption ?? "—"}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    disabled={remove.isPending}
                    onClick={() => remove.mutate({ id: img.id, path: img.storage_path })}
                  >
                    Delete
                  </Button>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No images uploaded yet — the site shows the built-in photos until you add your own.
          </p>
        )}
      </div>
    </div>
  );
}