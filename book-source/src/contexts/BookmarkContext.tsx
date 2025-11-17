import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Controls visibility/behavior of the page Table of Contents
// - 'hidden'   => only the small "Show Table of Contents" button is visible
// - 'expanded' => full TOC panel is visible (default once user chooses to show)
// - 'collapsed' is kept for forward-compatibility but not currently used
export type TocMode = 'expanded' | 'collapsed' | 'hidden';

export interface Bookmark {
  id: string;
  pageTitle: string;
  pageUrl: string;
  headingId?: string;
  headingText?: string;
  headingLevel?: number;
  note: string;
  timestamp: number;
}

interface BookmarkContextValue {
  bookmarks: Record<string, Bookmark>;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => void;
  deleteBookmark: (id: string) => void;
  updateBookmarkNote: (id: string, note: string) => void;
  getBookmarksByPage: (pageUrl: string) => Bookmark[];
  isBookmarked: (pageUrl: string, headingId?: string) => boolean;
  // Global TOC visibility state
  hideTOC: boolean;
  setHideTOC: (hide: boolean) => void;
  tocMode: TocMode;
  setTocMode: (mode: TocMode) => void;
}

const BookmarkContext = createContext<BookmarkContextValue | undefined>(undefined);

const STORAGE_KEY = 'pageBookmarks';
const TOC_PREFS_KEY = 'tocPreferences';

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Record<string, Bookmark>>({});
  const [hideTOC, setHideTOC] = useState(false);
  // Start with TOC hidden by default; user can explicitly choose to show it
  const [tocMode, setTocMode] = useState<TocMode>('hidden');

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookmarks(parsed);
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }

    try {
      const tocPrefsRaw = localStorage.getItem(TOC_PREFS_KEY);
      if (tocPrefsRaw) {
        const tocPrefs = JSON.parse(tocPrefsRaw) as { mode?: TocMode };
        if (tocPrefs.mode === 'expanded' || tocPrefs.mode === 'collapsed' || tocPrefs.mode === 'hidden') {
          setTocMode(tocPrefs.mode);
        }
      }
    } catch (error) {
      console.error('Error loading TOC preferences:', error);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }, [bookmarks]);

  // Persist TOC mode so users keep their preference
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    try {
      localStorage.setItem(TOC_PREFS_KEY, JSON.stringify({ mode: tocMode }));
    } catch (error) {
      console.error('Error saving TOC preferences:', error);
    }
  }, [tocMode]);

  const addBookmark = useCallback((bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => {
    const id = `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newBookmark: Bookmark = {
      ...bookmark,
      id,
      timestamp: Date.now(),
    };

    setBookmarks((prev) => ({
      ...prev,
      [id]: newBookmark,
    }));
  }, []);

  const deleteBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, []);

  const updateBookmarkNote = useCallback((id: string, note: string) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        note,
      },
    }));
  }, []);

  const getBookmarksByPage = useCallback((pageUrl: string) => {
    return Object.values(bookmarks).filter((bookmark) => bookmark.pageUrl === pageUrl);
  }, [bookmarks]);

  const isBookmarked = useCallback((pageUrl: string, headingId?: string) => {
    return Object.values(bookmarks).some(
      (bookmark) =>
        bookmark.pageUrl === pageUrl &&
        (headingId ? bookmark.headingId === headingId : !bookmark.headingId)
    );
  }, [bookmarks]);

  const value: BookmarkContextValue = {
    bookmarks,
    addBookmark,
    deleteBookmark,
    updateBookmarkNote,
    getBookmarksByPage,
    isBookmarked,
    hideTOC,
    setHideTOC,
    tocMode,
    setTocMode,
  };

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
