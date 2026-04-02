import { useNavigate } from 'react-router-dom';
import {
  Zap, Users, GitBranch, Clock, ArrowRight, Edit3, Shield, Star,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { documentsApi } from '@/lib/api';
import { useState } from 'react';

const FEATURES = [
  {
    icon: <Zap size={18} />,
    title: 'Real-time sync',
    desc: 'Changes appear instantly across all connected devices. No refresh needed.',
  },
  {
    icon: <Users size={18} />,
    title: 'Live presence',
    desc: 'See who is editing right now, where their cursor is, and what they are typing.',
  },
  {
    icon: <GitBranch size={18} />,
    title: 'Conflict-free editing',
    desc: 'CRDT-based merging means two people can edit the same sentence simultaneously — no conflicts.',
  },
  {
    icon: <Clock size={18} />,
    title: 'Revision history',
    desc: 'Every save is a snapshot. Browse and restore any previous version of your document.',
  },
  {
    icon: <Edit3 size={18} />,
    title: 'Rich formatting',
    desc: 'Bold, italic, underline, headings, lists, code blocks — all with keyboard shortcuts.',
  },
  {
    icon: <Shield size={18} />,
    title: 'Persistent storage',
    desc: 'Documents survive server restarts. Your work is always safe in MongoDB.',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateDoc = async () => {
    setIsCreating(true);
    try {
      const doc = await documentsApi.create('My first document');
      navigate(`/editor/${doc._id}`);
    } catch {
      navigate('/dashboard');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    // CHANGED: bg-[#09090B] → bg-bg
    <div className="min-h-screen bg-bg text-text-primary overflow-x-hidden">

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      {/* CHANGED: bg-[#09090B]/80 → bg-bg/80 */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 border-b border-border/50 bg-bg/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <Edit3 size={13} className="text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight">Velum</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          {/* Theme toggle in landing nav */}
          <ThemeToggle />
          <Button size="sm" onClick={handleCreateDoc} isLoading={isCreating}>
            Start writing
          </Button>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/10 text-accent text-xs font-medium mb-8 animate-fade-in">
            <Star size={11} />
            Real-time collaborative editing, powered by Yjs CRDTs
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1] mb-6 animate-slide-up">
            Write together,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-violet-400">
              effortlessly.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed mb-10 animate-slide-up">
            Velum is a lightweight collaborative editor for teams and students. Real-time sync,
            live cursors, and conflict-free editing — all in a clean, distraction-free interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up">
            <Button
              size="lg"
              onClick={handleCreateDoc}
              isLoading={isCreating}
              rightIcon={<ArrowRight size={16} />}
            >
              Create a document
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')}>
              View dashboard
            </Button>
          </div>
        </div>

        {/* ── Editor mockup ─────────────────────────────────────────────── */}
        <div className="relative max-w-3xl mx-auto mt-20 animate-slide-up">
          <div className="absolute inset-x-10 -top-4 h-40 bg-accent/10 blur-2xl rounded-full" />

          <div className="relative rounded-2xl border border-border-strong bg-surface overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.3)]">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface-raised">
              <div className="w-2.5 h-2.5 rounded-full bg-danger/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/70" />
              <div className="flex-1 mx-4">
                <div className="h-5 rounded-md bg-surface-overlay border border-border text-2xs text-text-muted flex items-center px-2">
                  velum.app/editor/abc123
                </div>
              </div>
            </div>

            {/* Toolbar mockup */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-surface/80">
              {['B', 'I', 'U', '|', 'H1', 'H2', '|', '≡', '⋮'].map((label, i) =>
                label === '|' ? (
                  <div key={i} className="w-px h-4 bg-border mx-1" />
                ) : (
                  <div
                    key={i}
                    className="w-7 h-7 rounded flex items-center justify-center text-xs font-semibold text-text-secondary hover:bg-surface-overlay"
                  >
                    {label}
                  </div>
                )
              )}
              <div className="ml-auto flex -space-x-1.5">
                {['#6366F1', '#10B981', '#EC4899'].map((color, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: color }}
                    className="w-6 h-6 rounded-full border-2 border-surface text-[9px] font-bold text-white flex items-center justify-center"
                  >
                    {['SF', 'BO', 'CL'][i]}
                  </div>
                ))}
              </div>
            </div>

            {/* CHANGED: bg-[#09090B] → bg-surface (adapts to theme) */}
            <div className="p-8 bg-surface min-h-[200px] font-serif">
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Q3 Product Strategy
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                Our focus for the third quarter is to solidify our core user experience while
                expanding into enterprise segments.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed relative">
                The key initiatives include{' '}
                <span className="text-text-primary font-medium">real-time collaboration</span>,
                <span className="relative inline-block mx-0.5">
                  <span className="absolute -top-0.5 left-0 w-0.5 h-5 bg-[#10B981] rounded-full" />
                </span>
                improved onboarding, and
                <span className="relative inline-block mx-0.5">
                  <span className="absolute -top-0.5 left-0 w-0.5 h-5 bg-[#EC4899] rounded-full" />
                </span>{' '}
                performance optimization.
              </p>

              <div className="flex items-center gap-3 mt-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span className="text-2xs text-text-muted">Brave Owl is typing…</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" />
                  <span className="text-2xs text-text-muted">Calm Lynx joined</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-4">
              Built for real collaboration
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto text-base">
              Every feature is designed for the moment two people try to edit the same document at the same time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-surface border border-border hover:border-border-strong hover:bg-surface-raised transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent rounded-3xl pointer-events-none" />
          <div className="relative p-12 rounded-2xl border border-border bg-surface">
            <h2 className="text-3xl font-bold text-text-primary mb-4 tracking-tight">
              Start writing with your team
            </h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              No sign-up required. Create a document and share the link — collaborators join instantly.
            </p>
            <Button size="lg" onClick={handleCreateDoc} isLoading={isCreating} rightIcon={<ArrowRight size={16} />}>
              Create your first document
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-accent flex items-center justify-center">
              <Edit3 size={10} className="text-white" />
            </div>
            <span className="text-sm font-semibold">Velum</span>
            <span className="text-xs text-text-muted ml-2">
              Built with Tiptap, Yjs, and Hocuspocus
            </span>
          </div>
          <p className="text-xs text-text-muted">
            Real-time collaborative editing · Hackathon project
          </p>
        </div>
      </footer>
    </div>
  );
}