
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import type { AiCreation } from '../types';

interface AppContextType {
  favorites: Set<number>;
  aiCreations: AiCreation[];
  toggleFavorite: (id: number) => void;
  addAiCreation: (creation: Omit<AiCreation, 'id'>) => void;
  isFavorite: (id: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [aiCreations, setAiCreations] = useState<AiCreation[]>([]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((id: number) => {
    return favorites.has(id);
  }, [favorites]);

  const addAiCreation = useCallback((creation: Omit<AiCreation, 'id'>) => {
    const newCreation: AiCreation = {
      ...creation,
      id: new Date().toISOString()
    };
    setAiCreations(prev => [newCreation, ...prev]);
  }, []);

  const value = { favorites, aiCreations, toggleFavorite, addAiCreation, isFavorite };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
