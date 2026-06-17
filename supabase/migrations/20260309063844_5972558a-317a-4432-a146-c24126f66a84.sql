
-- Drop all existing restrictive policies on blog_posts
DROP POLICY IF EXISTS "Admins can delete posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view published posts" ON public.blog_posts;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Anyone can view published posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can view all posts"
  ON public.blog_posts FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
