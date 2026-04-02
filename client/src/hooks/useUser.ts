import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { User } from '@/types';
import { generateDisplayName, getInitials, getColorForId } from '@/lib/utils';

const STORAGE_KEY = 'velum_user';

interface UseUserReturn {
  user: User;
  updateName: (name: string) => void;
  updateColor: (color: string) => void;
  dismissIdentityModal: () => void;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        if (parsed.hasChosenName === undefined) {
          return { ...parsed, hasChosenName: true };
        }
        return parsed;
      }
    } catch {
    }

    const id = uuidv4();
    const name = generateDisplayName();
    return {
      id,
      name,
      color: getColorForId(id),
      initials: getInitials(name),
      hasChosenName: false,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
    }
  }, [user]);

  const updateName = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setUser((prev) => ({
      ...prev,
      name: trimmed,
      initials: getInitials(trimmed),
      hasChosenName: true,
    }));
  }, []);

  const updateColor = useCallback((color: string) => {
    setUser((prev) => ({ ...prev, color }));
  }, []);

  const dismissIdentityModal = useCallback(() => {
    setUser((prev) => ({ ...prev, hasChosenName: true }));
  }, []);

  return { user, updateName, updateColor, dismissIdentityModal };
}