/**
 * Saved Items Storage
 * Client-only localStorage for saved resources + templates
 */

export interface SavedItem {
  id: string;
  kind: 'resource' | 'template';
  slug: string;
  title: string;
  meta: string; // e.g. "California" or "Wage & hour"
  savedAt: string; // ISO timestamp
}

const STORAGE_KEY = 'gr-saved:v1';

/**
 * Get all saved items, sorted by most recent first
 */
export function getSaved(): SavedItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const items = JSON.parse(data) as SavedItem[];
    return items.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  } catch (error) {
    console.error('Failed to load saved items:', error);
    return [];
  }
}

/**
 * Check if an item is saved
 */
export function isSaved(kind: 'resource' | 'template', slug: string): boolean {
  const items = getSaved();
  return items.some((item) => item.kind === kind && item.slug === slug);
}

/**
 * Save an item (dedupes by kind + slug)
 */
export function saveItem(item: Omit<SavedItem, 'id' | 'savedAt'>): SavedItem {
  const items = getSaved();
  
  // Check if already saved
  const existingIndex = items.findIndex(
    (i) => i.kind === item.kind && i.slug === item.slug
  );
  
  if (existingIndex >= 0) {
    // Already saved, return existing
    return items[existingIndex];
  }
  
  // Create new saved item
  const newItem: SavedItem = {
    ...item,
    id: `${item.kind}-${item.slug}-${Date.now()}`,
    savedAt: new Date().toISOString(),
  };
  
  items.push(newItem);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save item:', error);
  }
  
  return newItem;
}

/**
 * Remove a saved item
 */
export function unsaveItem(kind: 'resource' | 'template', slug: string): void {
  const items = getSaved();
  const filtered = items.filter((item) => !(item.kind === kind && item.slug === slug));
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to unsave item:', error);
  }
}

/**
 * Toggle saved state, returns new state
 */
export function toggleSaved(item: Omit<SavedItem, 'id' | 'savedAt'>): { saved: boolean } {
  const isCurrentlySaved = isSaved(item.kind, item.slug);
  
  if (isCurrentlySaved) {
    unsaveItem(item.kind, item.slug);
    return { saved: false };
  } else {
    saveItem(item);
    return { saved: true };
  }
}

/**
 * Clear all saved items (dev-only)
 */
export function clearSaved(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear saved items:', error);
  }
}

/**
 * Get saved items by kind
 */
export function getSavedByKind(kind: 'resource' | 'template'): SavedItem[] {
  return getSaved().filter((item) => item.kind === kind);
}
