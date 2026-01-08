-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access
CREATE POLICY "Allow public read access" ON public.articles
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow authenticated users (admin) to insert, update, delete
CREATE POLICY "Allow authenticated insert" ON public.articles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON public.articles
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON public.articles
    FOR DELETE
    TO authenticated
    USING (true);

-- Grant permissions
GRANT SELECT ON public.articles TO anon;
GRANT ALL ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
