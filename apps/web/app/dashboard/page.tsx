'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import {
  Plus, LogOut, PawPrint, Calendar, Weight, Palette,
  ChevronRight, Trash2, X, Activity, Pencil
} from 'lucide-react';
import PawIcon from '@/components/petpulse/PawIcon';
import type { User } from '@supabase/supabase-js';

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

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [deletingPetId, setDeletingPetId] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: petsData } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });

      setPets(petsData || []);
      setLoading(false);
    }
    init();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  async function confirmDeletePet() {
    if (!deletingPetId) return;
    const { error } = await supabase.from('pets').delete().eq('id', deletingPetId);
    if (!error) {
      setPets(pets.filter(p => p.id !== deletingPetId));
    }
    setDeletingPetId(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#2D9B6F]/20 border-t-[#2D9B6F] rounded-full animate-spin" />
          <p className="text-[#6B7280] text-sm">Loading your pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E4DA] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F5EF] flex items-center justify-center">
              <PawIcon className="w-5 h-5 text-[#2D9B6F]" />
            </div>
            <span className="text-lg font-display font-bold text-[#1A1A1A]">PetPulse</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#6B7280] hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F0E8] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-[#1A1A1A] mb-1">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''} 🐾
          </h1>
          <p className="text-[#6B7280]">Manage your pets and track their health.</p>
        </motion.div>

        {/* Pets grid */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-[#1A1A1A]">
            Your Pets ({pets.length})
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2D9B6F] text-white rounded-xl font-semibold text-sm hover:bg-[#248F63] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Pet
          </button>
        </div>

        {pets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border-2 border-dashed border-[#E8E4DA] p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#E8F5EF] flex items-center justify-center mx-auto mb-4">
              <PawPrint className="w-8 h-8 text-[#2D9B6F]" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#1A1A1A] mb-2">No pets yet</h3>
            <p className="text-[#6B7280] mb-6 max-w-sm mx-auto">
              Add your first pet to start tracking their health with AI-powered scans.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4845F] text-white rounded-xl font-semibold hover:bg-[#F16A41] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add your first pet
            </button>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet, i) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-2xl border border-[#E8E4DA] p-5 hover:shadow-lg hover:border-[#2D9B6F]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8F5EF] to-[#C5E8D8] flex items-center justify-center">
                    <PawPrint className="w-6 h-6 text-[#2D9B6F]" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => setEditingPet(pet)}
                      className="p-1.5 rounded-lg text-[#B8B3A8] hover:text-[#2D9B6F] hover:bg-[#E8F5EF] transition-all"
                      title="Edit pet"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingPetId(pet.id)}
                      className="p-1.5 rounded-lg text-[#B8B3A8] hover:text-red-500 hover:bg-red-50 transition-all"
                      title="Delete pet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-[#1A1A1A] mb-1">{pet.name}</h3>
                <p className="text-sm text-[#6B7280] mb-3">{pet.breed || 'Unknown breed'}</p>

                <div className="space-y-1.5 text-xs text-[#6B7280]">
                  {pet.age && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{pet.age} years old</span>
                    </div>
                  )}
                  {pet.weight && (
                    <div className="flex items-center gap-1.5">
                      <Weight className="w-3 h-3" />
                      <span>{pet.weight} kg</span>
                    </div>
                  )}
                  {pet.color && (
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-3 h-3" />
                      <span>{pet.color}</span>
                    </div>
                  )}
                </div>

                {pet.conditions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {pet.conditions.map((c) => (
                      <span key={c} className="px-2 py-0.5 bg-[#FEF0EB] text-[#F4845F] rounded-full text-[10px] font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <button className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-[#E8F5EF] text-[#2D9B6F] rounded-xl text-sm font-semibold hover:bg-[#D4F0E4] transition-colors">
                  <Activity className="w-3.5 h-3.5" />
                  Scan health
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Add Pet Modal */}
      <AnimatePresence>
        {showAddModal && (
          <PetFormModal
            title="Add a Pet"
            submitLabel="Add Pet"
            supabase={supabase}
            onClose={() => setShowAddModal(false)}
            onSaved={(pet: Pet) => {
              setPets([pet, ...pets]);
              setShowAddModal(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Edit Pet Modal */}
      <AnimatePresence>
        {editingPet && (
          <PetFormModal
            title="Edit Pet"
            submitLabel="Save Changes"
            pet={editingPet}
            supabase={supabase}
            onClose={() => setEditingPet(null)}
            onSaved={(updated: Pet) => {
              setPets(pets.map(p => p.id === updated.id ? updated : p));
              setEditingPet(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deletingPetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeletingPetId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-display font-bold text-[#1A1A1A] text-center mb-2">Delete this pet?</h3>
              <p className="text-sm text-[#6B7280] text-center mb-6">
                This will permanently remove this pet and all their scan data. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingPetId(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[#E8E4DA] text-[#1A1A1A] font-semibold text-sm hover:bg-[#F3F0E8] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeletePet}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Shared Pet Form Modal (Add + Edit) ─── */
function PetFormModal({ title, submitLabel, pet, supabase, onClose, onSaved }: {
  title: string;
  submitLabel: string;
  pet?: Pet;
  supabase: ReturnType<typeof createClient>;
  onClose: () => void;
  onSaved: (pet: Pet) => void;
}) {
  const [name, setName] = useState(pet?.name || '');
  const [breed, setBreed] = useState(pet?.breed || '');
  const [age, setAge] = useState(pet?.age?.toString() || '');
  const [weight, setWeight] = useState(pet?.weight?.toString() || '');
  const [sex, setSex] = useState(pet?.sex || '');
  const [color, setColor] = useState(pet?.color || '');
  const [conditions, setConditions] = useState(pet?.conditions?.join(', ') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!pet;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name,
      breed: breed || null,
      age: age ? parseFloat(age) : null,
      weight: weight ? parseFloat(weight) : null,
      sex: sex || null,
      color: color || null,
      conditions: conditions ? conditions.split(',').map(c => c.trim()).filter(Boolean) : [],
    };

    if (isEditing) {
      // Update existing pet
      const { data, error: updateError } = await supabase
        .from('pets')
        .update(payload)
        .eq('id', pet.id)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
      onSaved(data as Pet);
    } else {
      // Create new pet
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error: insertError } = await supabase
        .from('pets')
        .insert({ ...payload, user_id: user.id })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
      onSaved(data as Pet);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-[#E8E4DA]">
          <h3 className="text-xl font-display font-bold text-[#1A1A1A]">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F3F0E8] text-[#6B7280]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Luna"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E4DA] bg-white focus:border-[#2D9B6F] focus:outline-none transition-colors text-[#1A1A1A] placeholder:text-[#B8B3A8]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Breed</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Golden Retriever"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E4DA] bg-white focus:border-[#2D9B6F] focus:outline-none transition-colors text-[#1A1A1A] placeholder:text-[#B8B3A8]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E4DA] bg-white focus:border-[#2D9B6F] focus:outline-none transition-colors text-[#1A1A1A]"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Age (years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 3"
                min="0"
                step="0.5"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E4DA] bg-white focus:border-[#2D9B6F] focus:outline-none transition-colors text-[#1A1A1A] placeholder:text-[#B8B3A8]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 28"
                min="0"
                step="0.1"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E4DA] bg-white focus:border-[#2D9B6F] focus:outline-none transition-colors text-[#1A1A1A] placeholder:text-[#B8B3A8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Color</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g. Golden"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E4DA] bg-white focus:border-[#2D9B6F] focus:outline-none transition-colors text-[#1A1A1A] placeholder:text-[#B8B3A8]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Conditions</label>
            <input
              type="text"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              placeholder="e.g. allergies, hip dysplasia (comma-separated)"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E4DA] bg-white focus:border-[#2D9B6F] focus:outline-none transition-colors text-[#1A1A1A] placeholder:text-[#B8B3A8]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-[#2D9B6F] text-white font-semibold rounded-xl hover:bg-[#248F63] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <PawPrint className="w-4 h-4" />
                {submitLabel}
              </>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
