DROP POLICY IF EXISTS "Gallery images are publicly viewable" ON public.gallery_images;

CREATE POLICY "Signed-in users can view gallery images"
ON public.gallery_images
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Gallery objects are readable" ON storage.objects;

CREATE POLICY "Signed-in users can read gallery objects"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'gallery'::text);