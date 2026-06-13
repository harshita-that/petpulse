'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import {
  ArrowLeft, Activity, Calendar, ChevronRight, Pencil,
  PawPrint, Weight, Palette, Heart, TrendingUp,
  Clock, AlertCircle, Loader2, Camera, BarChart3,
  Dog, Sparkles,
} from 'lucide-react';

/* ─── Types ─── */

interface Pet {
  id: string;
  name: string;
  breed: string | null;
  age: number | null;
  weight: number | null;
  sex: string | null;
  color: string | null;
  conditions: string[];
  avatar_url: string | null;
  created_at: string;
}

interface Scan {
  id: string;
  pet_id: string;
  scan_type: 'teeth' | 'eyes' | 'skin' | 'body';
  status: 'pending' | 'processing' | 'complete' | 'failed';
  health_score: number | null;
  created_at: string;
}

/* ─── Constants ─── */

const SCAN_TYPE_META: Record<string, { icon: string; label: string; color: string; bg: string }> = {
  teeth: { icon: '🦷', label: 'Teeth Scan', color: 'text-sky-700', bg: 'bg-sky-50' },
  eyes:  { icon: '👁️', label: 'Eye Scan',   color: 'text-violet-700', bg: 'bg-violet-50' },
  skin:  { icon: '🐾', label: 'Skin Scan',  color: 'text-amber-700', bg: 'bg-amber-50' },
  body:  { icon: '🐕', label: 'Body Scan',  color: 'text-emerald-700', bg: 'bg-emerald-50' },
};

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  complete:    { label: 'Completed',  className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  processing: { label: 'Processing', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  pending:    { label: 'Pending',    className: 'bg-blue-50 text-blue-700 border-blue-200' },
  failed:     { label: 'Failed',     className: 'bg-red-50 text-red-700 border-red-200' },
};

/* ─── Helpers ─── */

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  if (diffDays === 1) {
    return 'Yesterday at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' }) + ' at ' +
      date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  return date.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#2D9B6F';
  if (score >= 60) return '#F59E0B';
  return '#EF4444';
}

function getScoreBg(score: number): string {
  if (score >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

/* ─── Animation Variants ─── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

/* ─── Small Components ─── */

function HealthScoreBadge({ score }: { score: number }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreBg(score)}`}
    >
      <Heart className="w-3 h-3" />
      {score}
    </span>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl border border-[#E8E4DA] p-5 flex flex-col items-center text-center"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: color + '15' }}
      >
        {icon}
      </div>
      <span className="text-2xl font-bold text-[#1A1A1A] font-display">{value}</span>
      <span className="text-xs text-[#6B7280] mt-1">{label}</span>
    </motion.div>
  );
}

/* ─── Main Page ─── */

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const petId = params?.id as string;
  const supabase = createClient();

  const [pet, setPet] = useState<Pet | null>(null);
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function init() {
      // Auth check
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch pet (RLS ensures user ownership)
      const { data: petData, error: petError } = await supabase
        .from('pets')
        .select('*')
        .eq('id', petId)
        .single();

      if (petError || !petData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPet(petData as Pet);

      // Fetch scans
      const { data: scansData } = await supabase
        .from('scans')
        .select('*')
        .eq('pet_id', petId)
        .order('created_at', { ascending: false });

      setScans((scansData || []) as Scan[]);
      setLoading(false);
    }
    init();
  }, [petId]);

  /* ─── Derived Stats ─── */
  const completedScans = scans.filter(s => s.status === 'complete' && s.health_score != null);
  const totalScans = scans.length;
  const latestScore = completedScans.length > 0 ? completedScans[0].health_score! : null;
  const avgScore = completedScans.length > 0
    ? Math.round(completedScans.reduce((sum, s) => sum + s.health_score!, 0) / completedScans.length)
    : null;

  /* ─── Loading State ─── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#2D9B6F]/20 border-t-[#2D9B6F] rounded-full animate-spin" />
          <p className="text-[#6B7280] text-sm">Loading pet profile...</p>
        </div>
      </div>
    );
  }

  /* ─── Not Found State ─── */
  if (notFound || !pet) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-display font-bold text-[#1A1A1A] mb-2">Pet not found</h2>
          <p className="text-[#6B7280] mb-6 text-sm">
            This pet doesn&apos;t exist or you don&apos;t have access.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D9B6F] text-white rounded-xl font-semibold text-sm hover:bg-[#248F63] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* ─── Sticky Header Bar ─── */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-[#E8E4DA] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/pets/${pet.id}/edit`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8E4DA] text-sm font-medium text-[#6B7280] hover:border-[#2D9B6F] hover:text-[#2D9B6F] transition-all bg-white"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Link>
            <Link
              href="/scan/new"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F4845F] text-white text-sm font-semibold hover:bg-[#E8734E] transition-colors shadow-sm shadow-[#F4845F]/25"
            >
              <Camera className="w-3.5 h-3.5" />
              New Scan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* ─── Pet Profile Header ─── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl border border-[#E8E4DA] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E8F5EF] to-[#C5E8D8] flex items-center justify-center flex-shrink-0 shadow-sm">
                {pet.avatar_url ? (
                  <img
                    src={pet.avatar_url}
                    alt={pet.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                ) : (
                  <Dog className="w-10 h-10 text-[#2D9B6F]" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-[#1A1A1A] mb-1">
                      {pet.name}
                    </h1>
                    <p className="text-[#6B7280]">
                      {pet.breed || 'Unknown breed'}
                      {pet.sex && <span className="mx-1.5">·</span>}
                      {pet.sex && (
                        <span className="capitalize">{pet.sex}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Detail pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {pet.age != null && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAFAF7] border border-[#E8E4DA] text-xs font-medium text-[#6B7280]">
                      <Calendar className="w-3 h-3" />
                      {pet.age} {pet.age === 1 ? 'year' : 'years'} old
                    </div>
                  )}
                  {pet.weight != null && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAFAF7] border border-[#E8E4DA] text-xs font-medium text-[#6B7280]">
                      <Weight className="w-3 h-3" />
                      {pet.weight} kg
                    </div>
                  )}
                  {pet.color && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAFAF7] border border-[#E8E4DA] text-xs font-medium text-[#6B7280]">
                      <Palette className="w-3 h-3" />
                      {pet.color}
                    </div>
                  )}
                </div>

                {/* Conditions */}
                {pet.conditions && pet.conditions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {pet.conditions.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 bg-[#FEF0EB] text-[#F4845F] rounded-full text-[11px] font-semibold"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── Stats Bar ─── */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-3 sm:gap-4 mb-8"
        >
          <StatCard
            icon={<BarChart3 className="w-5 h-5 text-[#2D9B6F]" />}
            label="Total Scans"
            value={totalScans}
            color="#2D9B6F"
          />
          <StatCard
            icon={<Heart className="w-5 h-5" style={{ color: latestScore ? getScoreColor(latestScore) : '#6B7280' }} />}
            label="Latest Score"
            value={latestScore != null ? latestScore : '—'}
            color={latestScore ? getScoreColor(latestScore) : '#6B7280'}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" style={{ color: avgScore ? getScoreColor(avgScore) : '#6B7280' }} />}
            label="Avg Score"
            value={avgScore != null ? avgScore : '—'}
            color={avgScore ? getScoreColor(avgScore) : '#6B7280'}
          />
        </motion.section>

        {/* ─── Scan History ─── */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#2D9B6F]" />
              Scan History
            </h2>
            {scans.length > 0 && (
              <span className="text-xs text-[#6B7280] bg-[#FAFAF7] border border-[#E8E4DA] px-2.5 py-1 rounded-full">
                {scans.length} {scans.length === 1 ? 'scan' : 'scans'}
              </span>
            )}
          </div>

          {scans.length === 0 ? (
            /* ─── Empty State ─── */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border-2 border-dashed border-[#E8E4DA] p-10 sm:p-14 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8F5EF] to-[#C5E8D8] flex items-center justify-center mx-auto mb-5">
                <Sparkles className="w-8 h-8 text-[#2D9B6F]" />
              </div>
              <h3 className="text-lg font-display font-bold text-[#1A1A1A] mb-2">
                No scans yet
              </h3>
              <p className="text-[#6B7280] text-sm max-w-xs mx-auto mb-6">
                Start tracking {pet.name}&apos;s health with an AI-powered scan. It only takes a moment.
              </p>
              <Link
                href="/scan/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4845F] text-white rounded-xl font-semibold hover:bg-[#E8734E] transition-colors shadow-sm shadow-[#F4845F]/25"
              >
                <Camera className="w-4 h-4" />
                Start first scan
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            /* ─── Scan Cards ─── */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {scans.map((scan) => {
                const meta = SCAN_TYPE_META[scan.scan_type] || SCAN_TYPE_META.body;
                const statusStyle = STATUS_STYLES[scan.status] || STATUS_STYLES.pending;
                const isCompleted = scan.status === 'complete';
                const isProcessing = scan.status === 'processing';
                const isPending = scan.status === 'pending';
                const isFailed = scan.status === 'failed';

                const cardContent = (
                  <motion.div
                    variants={itemVariants}
                    className={`group bg-white rounded-2xl border border-[#E8E4DA] p-4 sm:p-5 transition-all duration-300 ${
                      isCompleted
                        ? 'hover:shadow-lg hover:border-[#2D9B6F]/30 cursor-pointer'
                        : isFailed
                        ? 'border-red-100 bg-red-50/30'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Scan type icon */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl ${meta.bg}`}
                      >
                        {scan.scan_type === 'teeth' && '🦷'}
                        {scan.scan_type === 'eyes' && '👁️'}
                        {scan.scan_type === 'skin' && '🐾'}
                        {scan.scan_type === 'body' && '🐕'}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-[#1A1A1A]">
                            {meta.label}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle.className}`}
                          >
                            {isFailed && <AlertCircle className="w-2.5 h-2.5 mr-0.5" />}
                            {isProcessing && <Loader2 className="w-2.5 h-2.5 mr-0.5 animate-spin" />}
                            {statusStyle.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                          <Clock className="w-3 h-3" />
                          {formatDate(scan.created_at)}
                        </div>
                      </div>

                      {/* Score + Chevron */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {isCompleted && scan.health_score != null && (
                          <HealthScoreBadge score={scan.health_score} />
                        )}
                        {isProcessing && (
                          <div className="w-8 h-8 flex items-center justify-center">
                            <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                          </div>
                        )}
                        {isPending && (
                          <div className="w-8 h-8 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-blue-400" />
                          </div>
                        )}
                        {isFailed && (
                          <div className="w-8 h-8 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                          </div>
                        )}
                        {isCompleted && (
                          <ChevronRight className="w-5 h-5 text-[#B8B3A8] group-hover:text-[#2D9B6F] group-hover:translate-x-0.5 transition-all" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );

                if (isCompleted) {
                  return (
                    <Link key={scan.id} href={`/scan/${scan.id}/results`}>
                      {cardContent}
                    </Link>
                  );
                }

                return <div key={scan.id}>{cardContent}</div>;
              })}
            </motion.div>
          )}
        </motion.section>

        {/* ─── Disclaimer ─── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-[#6B7280]/60 text-center mt-12 mb-8"
        >
          PetPulse is a wellness monitoring tool, not a diagnostic service.
          Always consult your vet for medical advice.
        </motion.p>
      </main>
    </div>
  );
}
