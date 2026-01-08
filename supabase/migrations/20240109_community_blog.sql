-- Add user_id to articles
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Drop existing policies to recreate them safely
DROP POLICY IF EXISTS "Allow public read access" ON public.articles;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.articles;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.articles;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.articles;

-- Re-create policies
CREATE POLICY "Public read access" ON public.articles FOR SELECT USING (true);

-- Allow authenticated users to insert their own articles
CREATE POLICY "Authenticated insert" ON public.articles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own articles
CREATE POLICY "Owners update" ON public.articles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own articles
CREATE POLICY "Owners delete" ON public.articles FOR DELETE TO authenticated USING (auth.uid() = user_id);
