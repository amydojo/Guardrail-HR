import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type SavedItem = {
  id: string;
  type: 'resource' | 'template';
  slug: string;
  title: string;
  category?: string;
  version?: string;
  savedAt: string; // ISO timestamp
};

type SavedItemsContextType = {
  savedItems: SavedItem[];
  saveItem: (item: Omit<SavedItem, 'id' | 'savedAt'>) => void;
  unsaveItem: (id: string) => void;
  isSaved: (type: string, slug: string, version?: string) => boolean;
  getSavedItem: (type: string, slug: string, version?: string) => SavedItem | undefined;
};

// ============================================================================
// CONTEXT
// ============================================================================

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

const STORAGE_KEY = 'gr-saved-items';

// ============================================================================
// PROVIDER
// ============================================================================

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (error) {
        console.error('Failed to load saved items:', error);
      }
    }
    return [];
  });

  // Persist to localStorage whenever savedItems changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
      } catch (error) {
        console.error('Failed to save items:', error);
      }
    }
  }, [savedItems]);

  const saveItem = (item: Omit<SavedItem, 'id' | 'savedAt'>) => {
    setSavedItems((prev) => {
      // De-duplicate by type + slug + version
      const exists = prev.find(
        (existing) =>
          existing.type === item.type &&
          existing.slug === item.slug &&
          existing.version === item.version
      );

      if (exists) {
        // Already saved, don't add duplicate
        return prev;
      }

      // Create new saved item
      const newItem: SavedItem = {
        ...item,
        id: `${item.type}-${item.slug}-${item.version || 'default'}-${Date.now()}`,
        savedAt: new Date().toISOString(),
      };

      // Add to beginning (newest first)
      return [newItem, ...prev];
    });
  };

  const unsaveItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isSaved = (type: string, slug: string, version?: string) => {
    return savedItems.some(
      (item) =>
        item.type === type &&
        item.slug === slug &&
        (item.version === version || (!item.version && !version))
    );
  };

  const getSavedItem = (type: string, slug: string, version?: string) => {
    return savedItems.find(
      (item) =>
        item.type === type &&
        item.slug === slug &&
        (item.version === version || (!item.version && !version))
    );
  };

  return (
    <SavedItemsContext.Provider
      value={{
        savedItems,
        saveItem,
        unsaveItem,
        isSaved,
        getSavedItem,
      }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (context === undefined) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
}