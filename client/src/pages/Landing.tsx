//import { useNavigate } from 'react-router-dom';
//import { ArrowRight, Edit3 } from 'lucide-react';
//import { Button } from '@/components/ui/Button';
//import { ThemeToggle } from '@/components/ui/ThemeToggle';
//import { documentsApi } from '@/lib/api';
//import { useState } from 'react';
//import { cn } from '@/lib/utils';
//
//// ── Feature list — specific claims, not category labels ─────────────────────
//const FEATURES = [
//  {
//    signal: 'live',
//    title: 'No refresh needed.',
//    desc: 'Your teammate\'s edit appears in your document the moment they type it. Not after a sync. Not on the next load. Instantly.',
//  },
//  {
//    signal: 'live',
//    title: 'Two people, one sentence — no conflict.',
//    desc: 'If you and a teammate edit the same paragraph simultaneously, both changes merge. Nobody overwrites the other. This is CRDT, not hope.',
//  },
//  {
//    signal: 'presence',
//    title: 'You can see who\'s in the document right now.',
//    desc: 'Coloured cursors show exactly where each person is working. Names appear on hover. You know immediately if someone else is looking at your section.',
//  },
//  {
//    signal: 'neutral',
//    title: 'Your work doesn\'t disappear.',
//    desc: 'Documents are saved continuously. Revision history snapshots your document every 30 seconds of activity. You can restore any version.',
//  },
//  {
//    signal: 'neutral',
//    title: 'Formatting that doesn\'t get in the way.',
//    desc: 'Bold, italic, underline, headings, lists. Ctrl+B works. The toolbar is there when you need it and quiet when you don\'t.',
//  },
//  {
//    signal: 'neutral',
//    title: 'Share a link, that\'s it.',
//    desc: 'No accounts. No invite flow. Open the document, share the URL, your team is in. This is the whole onboarding.',
//  },
//];
//
//// ── Fake document content — looks like real meeting notes ────────────────────
//// Believable, specific, slightly messy — not a polished demo
//const DOC_CONTENT = [
//  { type: 'heading', text: 'Sprint 3 retrospective' },
//  { type: 'meta', text: 'Thursday · Engineering' },
//  { type: 'spacer' },
//  { type: 'subheading', text: 'What went well' },
//  {
//    type: 'paragraph',
//    text: 'Deployment pipeline is finally stable. Riya got the staging environment working without the weird DNS issue from last sprint.',
//  },
//  {
//    type: 'paragraph',
//    segments: [
//      { text: 'The ', plain: true },
//      { text: 'auth refactor', bold: true },
//      { text: ' shipped on time — three days ahead of estimate actually. That never happens.', plain: true },
//    ],
//  },
//  { type: 'spacer' },
//  { type: 'subheading', text: 'What we\'re fixing next sprint' },
//  {
//    type: 'paragraph',
//    text: 'Mobile layout on the dashboard is broken below 375px. Aarav is picking this up.',
//  },
//  {
//    type: 'paragraph-with-cursor',
//    before: 'Error handling on the upload flow needs a full rewrite — right now it just shows a blank',
//    cursorColor: '#6366F1',
//    after: '',
//  },
//];
//
//// ── Presence users in the mockup ─────────────────────────────────────────────
//const MOCK_PRESENCE = [
//  { initials: 'RK', color: '#6366F1', name: 'Riya K.',   status: 'typing' },
//  { initials: 'AM', color: '#10B981', name: 'Aarav M.',  status: 'viewing' },
//  { initials: 'JP', color: '#F59E0B', name: 'Jess P.',   status: 'idle' },
//];
//
//export default function Landing() {
//  const navigate = useNavigate();
//  const [isCreating, setIsCreating] = useState(false);
//
//  const handleCreateDoc = async () => {
//    setIsCreating(true);
//    try {
//      const doc = await documentsApi.create('Untitled Document');
//      navigate(`/editor/${doc._id}`);
//    } catch {
//      navigate('/dashboard');
//    } finally {
//      setIsCreating(false);
//    }
//  };
//
//  return (
//    <div className="min-h-screen bg-bg text-text-primary overflow-x-hidden">
//
//      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
//      <nav className="fixed top-0 left-0 right-0 z-50 h-13 flex items-center justify-between px-6 border-b border-border bg-bg/90 backdrop-blur-md">
//        <div className="flex items-center gap-2">
//          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
//            <Edit3 size={11} className="text-white" />
//          </div>
//          <span className="text-sm font-bold tracking-tight text-text-primary">Velum</span>
//        </div>
//        <div className="flex items-center gap-2">
//          <button
//            onClick={() => navigate('/dashboard')}
//            className="text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5"
//          >
//            Dashboard
//          </button>
//          <ThemeToggle />
//          <Button size="sm" onClick={handleCreateDoc} isLoading={isCreating}>
//            Open editor
//          </Button>
//        </div>
//      </nav>
//
//      {/* ── Hero ───────────────────────────────────────────────────────────── */}
//      {/*
//        Layout: left-anchored editorial grid.
//        On desktop: copy takes 5 cols, mockup takes 7 cols — intentionally
//        weighted toward the product, not the pitch.
//        On mobile: stacked, copy first.
//      */}
//      <section className="pt-28 pb-16 px-6">
//        <div className="max-w-6xl mx-auto">
//          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
//
//            {/* ── Left: copy ────────────────────────────────────────────── */}
//            <div className="lg:col-span-5 lg:pt-10">
//
//              {/* Live indicator — product signal, not dependency badge */}
//              <div className="flex items-center gap-2 mb-8">
//                <span className="live-pulse w-2 h-2 rounded-full bg-success flex-shrink-0" />
//                <span className="text-xs text-text-muted font-medium">
//                  WebSocket · real-time · CRDT sync
//                </span>
//              </div>
//
//              {/* Headline — left-aligned, editorial weight */}
//              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.1] mb-5">
//                Edit the same doc.
//                <br />
//                <span className="text-text-secondary font-semibold">
//                  At the same time.
//                </span>
//                <br />
//                No conflicts.
//              </h1>
//
//              {/* Subhead — specific, not abstract */}
//              <p className="text-base text-text-secondary leading-relaxed mb-3 max-w-sm">
//                Velum is a shared document editor that stays live while your team is in it.
//                Changes sync in under 100ms. Cursors show who's where.
//                History snapshots every 30 seconds.
//              </p>
//
//              <p className="text-sm text-text-muted mb-8 max-w-xs">
//                No accounts. Share the link and start writing together.
//              </p>
//
//              {/* CTAs */}
//              <div className="flex items-center gap-3">
//                <Button
//                  size="lg"
//                  onClick={handleCreateDoc}
//                  isLoading={isCreating}
//                  rightIcon={<ArrowRight size={15} />}
//                >
//                  Create a document
//                </Button>
//                <button
//                  onClick={() => navigate('/dashboard')}
//                  className="text-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4"
//                >
//                  See all docs
//                </button>
//              </div>
//
//              {/* Social proof line — grounded, not vague */}
//              <p className="text-xs text-text-muted mt-6">
//                Built with Tiptap, Yjs, Hocuspocus, and MongoDB.
//                <br />
//                Hackathon project · source on GitHub.
//              </p>
//            </div>
//
//            {/* ── Right: editor mockup ───────────────────────────────────── */}
//            <div className="lg:col-span-7 relative">
//              {/* Very subtle glow — functional, not decorative */}
//              <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl pointer-events-none" />
//
//              <div className="relative rounded-xl border border-border bg-surface overflow-hidden shadow-card-hover">
//
//                {/* Window chrome */}
//                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-surface-raised">
//                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
//                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
//                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
//
//                  {/* Address bar */}
//                  <div className="flex-1 mx-3">
//                    <div className="h-5 rounded bg-surface-overlay border border-border text-2xs text-text-muted flex items-center px-2 gap-1.5">
//                      <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
//                      velum.app/editor/sprint-3-retro
//                    </div>
//                  </div>
//
//                  {/* Presence in toolbar */}
//                  <div className="flex items-center gap-1.5">
//                    <div className="flex -space-x-1.5">
//                      {MOCK_PRESENCE.map((u) => (
//                        <div
//                          key={u.initials}
//                          title={u.name}
//                          className="w-5 h-5 rounded-full border border-surface flex items-center justify-center text-[8px] font-bold text-white"
//                          style={{ backgroundColor: u.color }}
//                        >
//                          {u.initials}
//                        </div>
//                      ))}
//                    </div>
//                    {/* Live editing count */}
//                    <span className="text-2xs text-text-muted">3 editing</span>
//                  </div>
//                </div>
//
//                {/* Formatting toolbar */}
//                <div className="flex items-center gap-0.5 px-4 py-1.5 border-b border-border bg-surface/80">
//                  {['B', 'I', 'U'].map((f) => (
//                    <div
//                      key={f}
//                      className={cn(
//                        'w-6 h-6 rounded flex items-center justify-center text-xs font-semibold',
//                        f === 'B'
//                          ? 'bg-accent/15 text-accent font-bold'
//                          : 'text-text-muted'
//                      )}
//                    >
//                      {f}
//                    </div>
//                  ))}
//                  <div className="w-px h-3.5 bg-border mx-1" />
//                  {['H1', 'H2'].map((f) => (
//                    <div
//                      key={f}
//                      className="w-7 h-6 rounded flex items-center justify-center text-[10px] font-semibold text-text-muted"
//                    >
//                      {f}
//                    </div>
//                  ))}
//                  <div className="w-px h-3.5 bg-border mx-1" />
//                  <div className="w-6 h-6 rounded flex items-center justify-center text-text-muted text-xs">≡</div>
//
//                  {/* Save status — far right */}
//                  <div className="ml-auto flex items-center gap-1.5 text-2xs text-text-muted">
//                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
//                    Saved
//                  </div>
//                </div>
//
//                {/* Document content */}
//                <div className="px-8 py-6 bg-surface min-h-[280px] font-sans text-sm">
//                  {DOC_CONTENT.map((block, i) => {
//                    if (block.type === 'spacer') return <div key={i} className="h-3" />;
//
//                    if (block.type === 'heading') return (
//                      <h2 key={i} className="text-xl font-bold text-text-primary mb-1 leading-tight">
//                        {block.text}
//                      </h2>
//                    );
//
//                    if (block.type === 'meta') return (
//                      <p key={i} className="text-xs text-text-muted mb-4">{block.text}</p>
//                    );
//
//                    if (block.type === 'subheading') return (
//                      <h3 key={i} className="text-xs font-semibold text-text-muted uppercase tracking-widest mt-1 mb-2">
//                        {block.text}
//                      </h3>
//                    );
//
//                    if (block.type === 'paragraph') {
//                      if (block.segments) return (
//                        <p key={i} className="text-text-secondary leading-relaxed mb-2">
//                          {block.segments.map((seg, j) =>
//                            seg.bold
//                              ? <strong key={j} className="font-semibold text-text-primary">{seg.text}</strong>
//                              : <span key={j}>{seg.text}</span>
//                          )}
//                        </p>
//                      );
//                      return (
//                        <p key={i} className="text-text-secondary leading-relaxed mb-2">
//                          {block.text}
//                        </p>
//                      );
//                    }
//
//                    // paragraph-with-cursor: shows a live colored cursor mid-sentence
//                    if (block.type === 'paragraph-with-cursor') return (
//                      <p key={i} className="text-text-secondary leading-relaxed mb-2 relative">
//                        {block.before}
//                        {/* Cursor */}
//                        <span
//                          className="inline-block w-0.5 h-4 mx-px align-middle cursor-blink rounded-full"
//                          style={{ backgroundColor: block.cursorColor }}
//                        />
//                        {/* Cursor name label */}
//                        <span
//                          className="absolute text-[9px] font-semibold text-white px-1.5 py-0.5 rounded-sm ml-0.5"
//                          style={{
//                            backgroundColor: block.cursorColor,
//                            top: '-1.4em',
//                            marginLeft: '2px',
//                          }}
//                        >
//                          Riya K.
//                        </span>
//                        {block.after}
//                      </p>
//                    );
//
//                    return null;
//                  })}
//                </div>
//
//                {/* Bottom status bar */}
//                <div className="px-8 py-2 border-t border-border bg-surface-raised flex items-center justify-between">
//                  <div className="flex items-center gap-3">
//                    {MOCK_PRESENCE.map((u) => (
//                      <div key={u.initials} className="flex items-center gap-1.5">
//                        <span
//                          className={cn(
//                            'w-1.5 h-1.5 rounded-full flex-shrink-0',
//                            u.status === 'typing' ? 'live-pulse' : ''
//                          )}
//                          style={{ backgroundColor: u.color }}
//                        />
//                        <span className="text-2xs text-text-muted">
//                          {u.name}{u.status === 'typing' ? ' is typing…' : u.status === 'viewing' ? ' viewing' : ''}
//                        </span>
//                      </div>
//                    ))}
//                  </div>
//                  <span className="text-2xs text-text-muted">WebSocket · live</span>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//      </section>
//
//      {/* ── Divider ─────────────────────────────────────────────────────────── */}
//      <div className="max-w-6xl mx-auto px-6">
//        <div className="h-px bg-border" />
//      </div>
//
//      {/* ── Features — broken grid, not symmetric cards ──────────────────────── */}
//      <section className="py-20 px-6">
//        <div className="max-w-6xl mx-auto">
//          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
//
//            {/* Left: anchor statement */}
//            <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
//              <h2 className="text-2xl font-bold text-text-primary tracking-tight mb-4 leading-tight">
//                Everything you need
//                <br />
//                for writing with
//                <br />
//                other people.
//              </h2>
//              <p className="text-sm text-text-secondary leading-relaxed mb-6">
//                Nothing you don't. No workspaces, no permissions system, no setup.
//                Create a document, share the link, start writing.
//              </p>
//              <Button
//                size="md"
//                onClick={handleCreateDoc}
//                isLoading={isCreating}
//                rightIcon={<ArrowRight size={14} />}
//              >
//                Try it now
//              </Button>
//            </div>
//
//            {/* Right: feature list — stacked, not grid */}
//            <div className="lg:col-span-8">
//              <div className="flex flex-col divide-y divide-border">
//                {FEATURES.map((feature, i) => (
//                  <div
//                    key={i}
//                    className="py-5 group flex items-start gap-4"
//                  >
//                    {/* Signal dot — only accent for live features */}
//                    <div className="flex-shrink-0 mt-1.5">
//                      <div
//                        className={cn(
//                          'w-2 h-2 rounded-full',
//                          feature.signal === 'live'     && 'bg-accent',
//                          feature.signal === 'presence' && 'bg-success',
//                          feature.signal === 'neutral'  && 'bg-border-strong'
//                        )}
//                      />
//                    </div>
//                    <div>
//                      <h3 className="text-sm font-semibold text-text-primary mb-1 leading-snug">
//                        {feature.title}
//                      </h3>
//                      <p className="text-sm text-text-secondary leading-relaxed">
//                        {feature.desc}
//                      </p>
//                    </div>
//                  </div>
//                ))}
//              </div>
//            </div>
//          </div>
//        </div>
//      </section>
//
//      {/* ── Divider ─────────────────────────────────────────────────────────── */}
//      <div className="max-w-6xl mx-auto px-6">
//        <div className="h-px bg-border" />
//      </div>
//
//      {/* ── CTA — product-specific, not generic ─────────────────────────────── */}
//      <section className="py-20 px-6">
//        <div className="max-w-6xl mx-auto">
//          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
//
//            {/* Left: statement */}
//            <div className="lg:col-span-7">
//              <h2 className="text-2xl font-bold text-text-primary tracking-tight mb-3">
//                If your team writes things together,
//                <br className="hidden sm:block" />
//                this is just better than a shared Google Doc.
//              </h2>
//              <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
//                Shared workspace. Anyone with the link can join. 
//                No accounts, no waiting for access, no version confusion. 
//                The document is just live and everyone's in it.
//              </p>
//            </div>
//
//            {/* Right: actions — right-aligned on desktop */}
//            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start lg:items-end gap-3">
//              <Button
//                size="lg"
//                onClick={handleCreateDoc}
//                isLoading={isCreating}
//                rightIcon={<ArrowRight size={15} />}
//                className="w-full sm:w-auto"
//              >
//                Create a document
//              </Button>
//              <button
//                onClick={() => navigate('/dashboard')}
//                className="text-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4 whitespace-nowrap"
//              >
//                View dashboard →
//              </button>
//            </div>
//          </div>
//        </div>
//      </section>
//
//      {/* ── Footer ──────────────────────────────────────────────────────────── */}
//      <footer className="border-t border-border py-6 px-6">
//        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//          <div className="flex items-center gap-2">
//            <div className="w-5 h-5 rounded bg-accent flex items-center justify-center">
//              <Edit3 size={9} className="text-white" />
//            </div>
//            <span className="text-sm font-semibold text-text-primary">Velum</span>
//            <span className="text-xs text-text-muted">
//              · Real-time collaborative editor · Hackathon project
//            </span>
//          </div>
//          <p className="text-xs text-text-muted">
//            Built with Tiptap · Yjs · Hocuspocus · MongoDB
//          </p>
//        </div>
//      </footer>
//    </div>
//  );
//}

import { useNavigate } from 'react-router-dom';
import { ArrowRight, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { documentsApi } from '@/lib/api';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// ── Presence users in the mockup ─────────────────────────────────────────────
const PRESENCE = [
  { initials: 'RK', color: '#6366F1', name: 'Riya K.',  status: 'typing'   },
  { initials: 'AM', color: '#10B981', name: 'Aarav M.', status: 'viewing'  },
  { initials: 'JP', color: '#F59E0B', name: 'Jess P.',  status: 'idle'     },
];

// ── Feature list — numbered, specific, no category labels ────────────────────
const FEATURES = [
  {
    n: '01',
    title: 'Your teammate\'s edit appears while they\'re still typing it.',
    desc: 'Not after a sync. Not on reload. The document updates as each character is entered. Sub-100ms latency over WebSocket.',
  },
  {
    n: '02',
    title: 'Two people editing the same sentence. No conflict.',
    desc: 'Yjs CRDT handles concurrent edits mathematically. Both changes merge. Nobody overwrites the other. This is not a lock-and-unlock system.',
  },
  {
    n: '03',
    title: 'Coloured cursors show exactly where each person is.',
    desc: 'Name labels appear above each cursor. You can see if someone is in your paragraph before you start editing it.',
  },
  {
    n: '04',
    title: 'Every 30 seconds of editing creates a revision.',
    desc: 'Snapshots are stored automatically. Open revision history from the editor and restore any version. The document persists across server restarts.',
  },
  {
    n: '05',
    title: 'Bold, italic, underline. Ctrl+B works.',
    desc: 'Headings, bullet lists, numbered lists, blockquotes, code. The toolbar is there when you need it and stays out of the way when you don\'t.',
  },
  {
    n: '06',
    title: 'Share the link. That\'s the whole setup.',
    desc: 'No accounts. No invite flow. No workspace creation. Open a document, copy the URL, send it. Your team joins and starts editing.',
  },
];

export default function Landing() {
  const navigate  = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const doc = await documentsApi.create('Untitled Document');
      navigate(`/editor/${doc._id}`);
    } catch {
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary">

      {/* ── 2px accent line — the only decorative element ────────────────── */}
      <div className="h-0.5 w-full bg-accent" />

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-accent flex items-center justify-center flex-shrink-0">
              <Edit3 size={10} className="text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight">Velum</span>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs text-text-muted hover:text-text-primary transition-colors px-3 py-2 rounded-md hover:bg-surface-overlay"
            >
              All documents
            </button>
            <ThemeToggle />
            <Button size="sm" onClick={handleCreate} isLoading={loading}>
              New document
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      {/*
        Hard asymmetric grid: 5 cols copy / 7 cols mockup.
        On mobile: stacked, copy first.
        No gradient, no glow, no floating shadow cloud.
      */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">

          {/* ── Left: copy ──────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:pt-4">

            {/* Section label */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
              <span className="text-xs text-text-muted font-mono uppercase tracking-widest">
                Live · WebSocket · CRDT
              </span>
            </div>

            {/* Headline — left-anchored, no gradient text */}
            <h1 className="text-[2.6rem] sm:text-5xl lg:text-[2.8rem] xl:text-5xl font-extrabold tracking-tight leading-[1.08] mb-5 text-text-primary">
              Edit the same document.
              <br />
              <span className="text-text-secondary font-semibold">
                At the same time.
              </span>
              <br />
              No one overwrites anyone.
            </h1>

            {/* Subhead — concrete, no abstract nouns */}
            <p className="text-[0.95rem] text-text-secondary leading-relaxed mb-2 max-w-[360px]">
              Velum is a shared document editor that stays live while your team works in it.
              Changes sync character-by-character. Cursors show who's where.
              History saves every 30 seconds.
            </p>

            <p className="text-sm text-text-muted mb-8 max-w-[300px]">
              No accounts. Share the URL. Everyone's in.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Button
                size="lg"
                onClick={handleCreate}
                isLoading={loading}
                rightIcon={<ArrowRight size={15} />}
              >
                Open a document
              </Button>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4 decoration-border-strong hover:decoration-text-secondary"
              >
                Browse all docs
              </button>
            </div>

            {/* Grounded tech note — not a badge */}
            <div className="border-t border-border pt-5">
              <p className="text-xs text-text-muted font-mono leading-relaxed">
                Stack: Tiptap · Yjs · Hocuspocus · MongoDB
                <br />
                Hackathon submission · Source on GitHub
              </p>
            </div>
          </div>

          {/* ── Right: editor mockup ─────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-border-strong bg-surface overflow-hidden shadow-card-hover">

              {/* Window chrome */}
              <div className="flex items-center gap-0 border-b border-border">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 px-3 py-2.5 border-r border-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>

                {/* Document title in chrome */}
                <div className="flex-1 px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-text-secondary">
                    Sprint 4 · Retrospective
                  </span>

                  {/* Presence cluster */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {PRESENCE.map((u) => (
                        <div
                          key={u.initials}
                          title={u.name}
                          className="w-5 h-5 rounded-full border border-surface-raised flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
                          style={{ backgroundColor: u.color }}
                        >
                          {u.initials}
                        </div>
                      ))}
                    </div>
                    <span className="text-2xs text-text-muted">
                      3 editing
                    </span>
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-border bg-surface-raised">
                {[
                  { l: 'B', active: true  },
                  { l: 'I', active: false },
                  { l: 'U', active: false },
                ].map(({ l, active }) => (
                  <div
                    key={l}
                    className={cn(
                      'w-6 h-6 rounded text-xs font-bold flex items-center justify-center',
                      active
                        ? 'bg-accent/20 text-accent'
                        : 'text-text-muted hover:text-text-secondary'
                    )}
                  >
                    {l}
                  </div>
                ))}
                <div className="w-px h-3.5 bg-border mx-1" />
                {['H1', 'H2'].map((l) => (
                  <div key={l} className="w-7 h-6 rounded text-[10px] font-semibold text-text-muted flex items-center justify-center">
                    {l}
                  </div>
                ))}
                <div className="w-px h-3.5 bg-border mx-1" />
                <div className="w-6 h-6 text-text-muted flex items-center justify-center text-xs">≡</div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-2xs text-text-muted font-mono">Saved</span>
                </div>
              </div>

              {/* Document body */}
              <div className="px-8 py-6 bg-surface min-h-[300px] text-sm">

                {/* Document heading */}
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-text-primary leading-tight">
                    Sprint 4 retrospective
                  </h2>
                  <p className="text-xs text-text-muted font-mono mt-0.5">
                    Engineering · Thu 12 Dec · Aarav, Riya, Jess
                  </p>
                </div>

                {/* Thin rule */}
                <div className="h-px bg-border mb-4" />

                {/* Section: what shipped */}
                <p className="text-2xs font-semibold text-text-muted uppercase tracking-widest mb-2">
                  What shipped
                </p>
                <p className="text-text-secondary leading-relaxed mb-2">
                  Auth refactor went out Wednesday. Three days early. First time that's happened this year.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  WebSocket reconnection is{' '}
                  <strong className="text-text-primary font-semibold">finally fixed</strong>
                  {' '}— users no longer drop out of the room on flaky connections.
                </p>

                {/* Section: what's still broken */}
                <p className="text-2xs font-semibold text-text-muted uppercase tracking-widest mb-2">
                  What's still broken
                </p>
                <p className="text-text-secondary leading-relaxed mb-2">
                  Mobile layout collapses below 375px. Aarav picking up next sprint.
                </p>

                {/* Paragraph with live cursor mid-sentence */}
                <p className="text-text-secondary leading-relaxed mb-1 relative">
                  Error handling on the upload flow just shows a blank screen — it needs a full
                  {/* Riya's cursor — indigo, mid-sentence */}
                  <span className="relative inline-block mx-[1px] align-middle">
                    <span
                      className="inline-block w-[2px] h-[1.1em] rounded-[1px] align-middle blink"
                      style={{ backgroundColor: '#6366F1' }}
                    />
                    {/* Name label above cursor */}
                    <span
                      className="absolute bottom-full left-0 mb-[3px] text-[9px] font-semibold text-white px-1.5 py-[2px] rounded-[3px] whitespace-nowrap"
                      style={{ backgroundColor: '#6366F1' }}
                    >
                      Riya K.
                    </span>
                  </span>
                  {' '}rewrite.
                </p>

                {/* Aarav's cursor further down */}
                <p className="text-text-secondary leading-relaxed relative">
                  Jess is also looking at the{' '}
                  <span className="relative inline-block mx-[1px] align-middle">
                    <span
                      className="inline-block w-[2px] h-[1.1em] rounded-[1px] align-middle"
                      style={{ backgroundColor: '#10B981' }}
                    />
                    <span
                      className="absolute bottom-full left-0 mb-[3px] text-[9px] font-semibold text-white px-1.5 py-[2px] rounded-[3px] whitespace-nowrap"
                      style={{ backgroundColor: '#10B981' }}
                    >
                      Aarav M.
                    </span>
                  </span>
                  {' '}notification bug from last sprint.
                </p>
              </div>

              {/* Status bar */}
              <div className="px-4 py-2 border-t border-border bg-surface-raised flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {PRESENCE.map((u) => (
                    <div key={u.initials} className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          'w-1.5 h-1.5 rounded-full flex-shrink-0',
                          u.status === 'typing' ? 'animate-pulse' : ''
                        )}
                        style={{ backgroundColor: u.color }}
                      />
                      <span className="text-2xs text-text-muted font-mono">
                        {u.name}
                        {u.status === 'typing'  ? ' · typing'  : ''}
                        {u.status === 'viewing' ? ' · viewing' : ''}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-2xs text-text-muted font-mono">
                  WebSocket · live
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Horizontal rule ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* ── Features — editorial numbered list ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left anchor — sticky section label */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 self-start">
            <p className="text-2xs font-mono uppercase tracking-widest text-text-muted mb-3">
              What it actually does
            </p>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight leading-tight mb-4">
              Every feature
              <br />
              exists because
              <br />
              someone needed it.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              No workspaces, no permission levels, no onboarding flow.
              Create a document, share the URL, write together.
            </p>
            <Button
              size="md"
              onClick={handleCreate}
              isLoading={loading}
              rightIcon={<ArrowRight size={14} />}
            >
              Try it now
            </Button>
          </div>

          {/* Right: numbered feature list */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-border">
              {FEATURES.map((f) => (
                <div key={f.n} className="flex gap-5 py-5 group">
                  {/* Number */}
                  <span className="font-mono text-xs text-text-muted pt-0.5 flex-shrink-0 w-6">
                    {f.n}
                  </span>
                  {/* Content */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary leading-snug mb-1.5 group-hover:text-accent transition-colors duration-150">
                      {f.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Horizontal rule ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* ── CTA — statement + action, not a banner ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Statement — left-aligned, not centered */}
          <div className="lg:col-span-7">
            <p className="text-2xs font-mono uppercase tracking-widest text-text-muted mb-4">
              Shared workspace model
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight leading-tight mb-4">
              Anyone with the link
              <br />
              can open it and start writing.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md mb-2">
              Velum is a shared workspace. Every document is accessible via its URL.
              No accounts, no access requests, no version confusion.
              The document is live and everyone's in it.
            </p>
            <p className="text-xs text-text-muted leading-relaxed max-w-md">
              This is intentional. The product is about real-time collaboration,
              not access control.
            </p>
          </div>

          {/* Action — right side, not centered below */}
          <div className="lg:col-span-5 lg:pt-12 flex flex-col gap-3 lg:items-end">
            <Button
              size="lg"
              onClick={handleCreate}
              isLoading={loading}
              rightIcon={<ArrowRight size={15} />}
              className="w-full sm:w-auto"
            >
              Create a document
            </Button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4 decoration-border-strong"
            >
              View all documents →
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>
      <footer className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent flex items-center justify-center">
            <Edit3 size={8} className="text-white" />
          </div>
          <span className="text-xs font-semibold text-text-primary">Velum</span>
          <span className="text-xs text-text-muted">
            · Real-time collaborative text editor
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-text-muted">Hackathon project</span>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs text-text-muted hover:text-text-primary transition-colors underline underline-offset-2"
          >
            Dashboard
          </button>
        </div>
      </footer>
    </div>
  );
}