-- Create scans table
CREATE TABLE IF NOT EXISTS public.scans (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id        UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  scan_type     TEXT NOT NULL CHECK (scan_type IN ('teeth', 'eyes', 'skin', 'body')),
  image_url     TEXT,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'complete', 'failed')),
  health_score  INTEGER CHECK (health_score >= 0 AND health_score <= 100),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_scans_pet_id ON public.scans(pet_id);
CREATE INDEX idx_scans_user_id ON public.scans(user_id);

-- Enable RLS
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can CRUD own scans" ON public.scans
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
