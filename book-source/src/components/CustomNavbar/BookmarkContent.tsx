import { useLocation } from '@docusaurus/router';
import React, { useEffect, useMemo, useState } from 'react';
import type { Bookmark } from '../../contexts/BookmarkContext';
import { useBookmarks } from '../../contexts/BookmarkContext';
import './bookmarkContent.css';

const BookmarkContent: React.FC = () => {
  const location = useLocation();
  const {
    bookmarks,
    addBookmark,
    deleteBookmark,
    updateBookmarkNote,
    isBookmarked,
    currentDoc,
    selectedText,
    setSelectedText,
    initialView,
    setInitialView,
  } = useBookmarks();

  // Detect if current route is a docs page (routeBasePath is "/docs" in docusaurus.config.ts)
  const isDocsRoute = location.pathname.startsWith('/docs');

  // We consider it a doc page when both the route matches and
  // the currentDoc info has been populated by the DocItem wrapper.
  const isDocPage = isDocsRoute && !!currentDoc;

  const metadata =
    currentDoc?.metadata || ({ title: 'Current Page', permalink: location.pathname } as const);

  const [view, setView] = useState<'add' | 'view'>(initialView);
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarkNote, setBookmarkNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editNoteText, setEditNoteText] = useState('');

  // Check if entire page is bookmarked
  const isPageBookmarked = isBookmarked(metadata.permalink);

  // Reset to initialView when it changes (triggered from outside)
  useEffect(() => {
    setView(initialView);
    // If opening in 'add' mode with selected text, prefill the name field
    if (initialView === 'add' && selectedText) {
      // Extract first few words or complete heading
      const words = selectedText.trim().split(/\s+/);
      const prefillText = words.length > 10 ? words.slice(0, 10).join(' ') + '...' : selectedText;
      setBookmarkName(prefillText);
    }
  }, [initialView, selectedText]);

  // Clean up selected text when component unmounts or view changes
  useEffect(() => {
    return () => {
      setSelectedText('');
    };
  }, [setSelectedText]);

  // Handle bookmark entire page
  const handleBookmarkPage = () => {
    addBookmark({
      name: metadata.title,
      pageTitle: metadata.title,
      pageUrl: metadata.permalink,
      note: bookmarkNote,
      isEntirePage: true,
    });
    setBookmarkName('');
    setBookmarkNote('');
    setView('view');
    setInitialView('view');
  };

  // Handle bookmark with custom name (from selected text or manual entry)
  const handleSaveBookmark = () => {
    if (!bookmarkName.trim()) {
      alert('Please enter a name for the bookmark');
      return;
    }

    addBookmark({
      name: bookmarkName.trim(),
      pageTitle: metadata.title,
      pageUrl: metadata.permalink,
      note: bookmarkNote.trim(),
      isEntirePage: false,
    });

    setBookmarkName('');
    setBookmarkNote('');
    setSelectedText('');
    setView('view');
    setInitialView('view');
  };

  // Handle remove bookmark (clear form)
  const handleRemoveBookmark = () => {
    setBookmarkName('');
    setBookmarkNote('');
    setSelectedText('');
  };

  // Filter bookmarks by search query (search in name and note)
  const filteredBookmarks = useMemo(() => {
    const filtered = Object.values(bookmarks).filter((bookmark) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        bookmark.name.toLowerCase().includes(query) ||
        bookmark.note.toLowerCase().includes(query) ||
        bookmark.pageTitle.toLowerCase().includes(query)
      );
    });

    // Sort by timestamp (newest first)
    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }, [bookmarks, searchQuery]);

  // Group bookmarks by page
  const groupedBookmarks = useMemo(() => {
    const grouped: Record<string, Bookmark[]> = {};
    filteredBookmarks.forEach((bookmark) => {
      if (!grouped[bookmark.pageUrl]) {
        grouped[bookmark.pageUrl] = [];
      }
      grouped[bookmark.pageUrl].push(bookmark);
    });

    return grouped;
  }, [filteredBookmarks]);

  // Handle edit note
  const handleStartEditNote = (id: string, currentNote: string) => {
    setEditingNoteId(id);
    setEditNoteText(currentNote);
  };

  const handleSaveNote = (id: string) => {
    updateBookmarkNote(id, editNoteText);
    setEditingNoteId(null);
    setEditNoteText('');
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditNoteText('');
  };

  return (
    <div className="bookmark-content">
      {/* Header with view toggle */}
      <div className="bookmark-content__header">
        <div className="bookmark-content__tabs">
          <button
            className={`bookmark-content__tab ${view === 'view' ? 'bookmark-content__tab--active' : ''}`}
            onClick={() => {
              setView('view');
              setInitialView('view');
            }}
          >
            View Bookmarks ({Object.keys(bookmarks).length})
          </button>
          <button
            className={`bookmark-content__tab ${view === 'add' ? 'bookmark-content__tab--active' : ''}`}
            onClick={() => {
              setView('add');
              setInitialView('add');
            }}
          >
            Add Bookmark
          </button>
        </div>
      </div>

      {/* Add Bookmark View */}
      {view === 'add' && (
        <div className="bookmark-content__add">
          {!isDocPage ? (
            <div className="bookmark-content__empty">
              <p>📄 Navigate to a documentation page to add bookmarks.</p>
              <p style={{ fontSize: '14px', marginTop: '12px', color: '#666' }}>
                Bookmarks can only be created from documentation pages with content.
              </p>
            </div>
          ) : (
            <>
              <div className="bookmark-content__page-info">
                <h3 className="bookmark-content__page-title">{metadata.title}</h3>
                <p className="bookmark-content__page-url">{metadata.permalink}</p>
              </div>

              {/* Bookmark entire page option */}
              <div className="bookmark-content__section">
                <button
                  className="bookmark-content__bookmark-page-btn"
                  onClick={handleBookmarkPage}
                  disabled={isPageBookmarked}
                >
                  {isPageBookmarked ? '✓ Page Already Bookmarked' : '📄 Bookmark Entire Page'}
                </button>
              </div>

              {/* Name and Note fields */}
              <div className="bookmark-content__section">
                <label className="bookmark-content__label">Name:</label>
                <input
                  type="text"
                  className="bookmark-content__input"
                  placeholder="Enter bookmark name..."
                  value={bookmarkName}
                  onChange={(e) => setBookmarkName(e.target.value)}
                />
              </div>

              <div className="bookmark-content__section">
                <label className="bookmark-content__label">Note (Optional):</label>
                <textarea
                  className="bookmark-content__textarea"
                  placeholder="Add a personal note to this bookmark..."
                  value={bookmarkNote}
                  onChange={(e) => setBookmarkNote(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Save and Remove buttons */}
              <div className="bookmark-content__actions">
                <button
                  className="bookmark-content__btn bookmark-content__btn--primary"
                  onClick={handleSaveBookmark}
                  disabled={!bookmarkName.trim()}
                >
                  Save
                </button>
                <button
                  className="bookmark-content__btn bookmark-content__btn--secondary"
                  onClick={handleRemoveBookmark}
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* View Bookmarks */}
      {view === 'view' && (
        <div className="bookmark-content__view">
          {/* Search */}
          <div className="bookmark-content__search">
            <input
              type="text"
              className="bookmark-content__search-input"
              placeholder="Search bookmarks by name or note..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Bookmarks list */}
          {Object.keys(groupedBookmarks).length === 0 ? (
            <div className="bookmark-content__empty">
              <p>No bookmarks found.</p>
              <button
                className="bookmark-content__btn bookmark-content__btn--primary"
                onClick={() => {
                  setView('add');
                  setInitialView('add');
                }}
              >
                Add Your First Bookmark
              </button>
            </div>
          ) : (
            <div className="bookmark-content__groups">
              {Object.entries(groupedBookmarks).map(([pageUrl, pageBookmarks]) => (
                <div key={pageUrl} className="bookmark-group">
                  <h4 className="bookmark-group__title">{pageBookmarks[0].pageTitle}</h4>
                  <div className="bookmark-group__items">
                    {pageBookmarks.map((bookmark) => (
                      <div key={bookmark.id} className="bookmark-item">
                        <div className="bookmark-item__header">
                          <a href={bookmark.pageUrl} className="bookmark-item__link">
                            <span className="bookmark-item__icon">
                              {bookmark.isEntirePage ? '📄' : '🔖'}
                            </span>
                            <span className="bookmark-item__heading">{bookmark.name}</span>
                          </a>
                          <button
                            className="bookmark-item__delete"
                            onClick={() => deleteBookmark(bookmark.id)}
                            title="Delete bookmark"
                          >
                            ×
                          </button>
                        </div>
                        {editingNoteId === bookmark.id ? (
                          <div className="bookmark-item__note-edit">
                            <textarea
                              className="bookmark-content__textarea"
                              value={editNoteText}
                              onChange={(e) => setEditNoteText(e.target.value)}
                              rows={2}
                              autoFocus
                            />
                            <div className="bookmark-item__note-actions">
                              <button
                                className="bookmark-content__btn bookmark-content__btn--small bookmark-content__btn--primary"
                                onClick={() => handleSaveNote(bookmark.id)}
                              >
                                Save
                              </button>
                              <button
                                className="bookmark-content__btn bookmark-content__btn--small bookmark-content__btn--secondary"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {bookmark.note && (
                              <p
                                className="bookmark-item__note"
                                onClick={() => handleStartEditNote(bookmark.id, bookmark.note)}
                              >
                                {bookmark.note}
                              </p>
                            )}
                            {!bookmark.note && (
                              <button
                                className="bookmark-item__add-note"
                                onClick={() => handleStartEditNote(bookmark.id, '')}
                              >
                                + Add note
                              </button>
                            )}
                          </>
                        )}
                        <div className="bookmark-item__timestamp">
                          {new Date(bookmark.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookmarkContent;
