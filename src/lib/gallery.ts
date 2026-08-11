import { supabase } from "@/integrations/supabase/client";

export type GalleryRow = {
  id: string;
  url: string;
  storage_path: string | null;
  caption: string | null;
  section: string;
  sort_order: number;
  created_at: string;
};

export type GalleryImage = GalleryRow & { displayUrl: string };

export async function fetchGalleryImages(section?: string): Promise<GalleryImage[]> {
  let query = supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (section) query = query.eq("section", section);

  const { data, error } = await query;
  if (error) throw error;

  const rows = (data ?? []) as GalleryRow[];
  const paths = rows.map((r) => r.storage_path).filter((p): p is string => !!p);

  const signed = new Map<string, string>();
  if (paths.length > 0) {
    const { data: urls } = await supabase.storage.from("gallery").createSignedUrls(paths, 60 * 60 * 6);
    urls?.forEach((u) => {
      if (u.path && u.signedUrl) signed.set(u.path, u.signedUrl);
    });
  }

  return rows.map((r) => ({
    ...r,
    displayUrl: (r.storage_path ? signed.get(r.storage_path) : undefined) ?? r.url,
  }));
}