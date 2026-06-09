-- Create scan_findings table
CREATE TABLE IF NOT EXISTS public.scan_findings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id       UUID NOT NULL REFERENCES public.scans(id) ON DELETE CASCADE,
  region_label  TEXT NOT NULL,
  confidence    DECIMAL NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  severity      TEXT NOT NULL CHECK (severity IN ('normal', 'watch', 'concern', 'urgent')),
  description   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index
CREATE INDEX idx_scan_findings_scan_id ON public.scan_findings(scan_id);

-- Enable RLS
ALTER TABLE public.scan_findings ENABLE ROW LEVEL SECURITY;

-- Policy: users can view findings for their own scans
CREATE POLICY "Users can view own scan findings" ON public.scan_findings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.scans
      WHERE scans.id = scan_findings.scan_id
      AND scans.user_id = auth.uid()
    )
  );
