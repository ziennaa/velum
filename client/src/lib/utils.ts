import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: diffDays > 365 ? 'numeric' : undefined,
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// CHANGED: teal palette replaces indigo as the first cursor color.
// Cursor colors must be distinct so collaborators are visually separable.
// Pacific Blue (#3DA0AA) replaces indigo (#6366F1) as slot 0 — brand-aligned.
// Tropical Teal (#55ABB1) replaces old teal (#14B8A6) as slot 6 — slightly warmer.
// All other colors kept for maximum variety across collaborators.
export const CURSOR_COLORS = [
  '#3DA0AA', // Pacific Blue   — brand teal, replaces indigo
  '#8B5CF6', // violet         — kept
  '#EC4899', // pink           — kept
  '#F59E0B', // amber          — kept
  '#10B981', // emerald        — kept
  '#3B82F6', // blue           — kept
  '#55ABB1', // Tropical Teal  — replaces old teal #14B8A6
  '#F97316', // orange         — kept
  '#EF4444', // rose           — kept
  '#84CC16', // lime           — kept
] as const;

const ADJECTIVES = ['Swift', 'Silent', 'Clever', 'Bright', 'Calm', 'Brave', 'Keen', 'Bold'];
const NOUNS = ['Fox', 'Owl', 'Wolf', 'Hawk', 'Bear', 'Lynx', 'Raven', 'Crane'];

export function generateDisplayName(): string {
  const adj  = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj} ${noun}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getColorForId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length];
}