"use client";

import { createContext, useContext, useState, useEffect } from 'react';

interface SearchHistoryContextType {
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

export function SearchHistoryProvider({ children }: { children: React.ReactNode }) {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    setSearchHistory(prev => {
      // Remove existing entry if it exists
      const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
      // Add new query to the beginning
      return [query.trim(), ...filtered].slice(0, 10); // Keep only last 10 searches
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const removeFromHistory = (query: string) => {
    setSearchHistory(prev => prev.filter(item => item !== query));
  };

  return (
    <SearchHistoryContext.Provider value={{
      searchHistory,
      addToHistory,
      clearHistory,
      removeFromHistory
    }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
}
