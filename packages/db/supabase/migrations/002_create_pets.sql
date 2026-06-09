-- Create pets table
CREATE TABLE IF NOT EXISTS public.pets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  breed       TEXT,
  age         DECIMAL,
  weight      DECIMAL,
  sex         TEXT CHECK (sex IN ('male', 'female', 'unknown')),
  color       TEXT,
  conditions  TEXT[] DEFAULT '{}',
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for user lookups
CREATE INDEX idx_pets_user_id ON public.pets(user_id);

-- Enable RLS
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

-- Policies: users can only manage their own pets
CREATE POLICY "Users can CRUD own pets" ON public.pets
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
