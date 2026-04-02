import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { User } from '@/types';
import { generateDisplayName, getInitials, getColorForId } from '@/lib/utils';


const STORAGE_KEY = 'velum_user';

export function useUser(): { user: User; updateName: (name: string) => void } {
  const [user, setUser] = useState<User>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as User;
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
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
     
    }
  }, [user]);

  const updateName = useCallback((name: string) => {
    setUser((prev) => ({
      ...prev,
      name: name.trim() || prev.name,
      initials: getInitials(name.trim() || prev.name),
    }));
  }, []);

  return { user, updateName };
}