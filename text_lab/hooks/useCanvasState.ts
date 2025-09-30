import { useState, useCallback } from 'react';
import type { CanvasElement, GlyphName } from '../../types';

export const useCanvasState = () => {
  const [history, setHistory] = useState<CanvasElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const elements = history[historyIndex];

  const setState = (newElements: CanvasElement[], fromHistory = false) => {
    if (fromHistory) {
      // When navigating history, just update the index
      setHistoryIndex(newElements.length - 1);
    } else {
      // When making a new change, clear the "redo" history
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, newElements]);
      setHistoryIndex(newHistory.length);
    }
  };

  const setElements = (newElements: CanvasElement[]) => {
    setState(newElements);
  };

  const addElement = useCallback((
    glyph: GlyphName,
    char: string,
    x: number,
    y: number,
    fontWeight = 900,
    options?: { isMirror?: boolean; isOutline?: boolean }
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newElement: CanvasElement = {
      id,
      glyph,
      char,
      x,
      y,
      scale: 1,
      rotation: 0,
      zIndex: elements.length,
      fontWeight,
      isMirror: options?.isMirror ?? false,
      isOutline: options?.isOutline ?? false,
    };
    setState([...elements, newElement]);
    setSelectedElementId(id);
    return id;
  }, [elements, history, historyIndex]);

  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    const newElements = elements.map((el) => (el.id === id ? { ...el, ...updates } : el));
    setState(newElements);
  }, [elements, history, historyIndex]);

  const deleteSelected = useCallback(() => {
    if (!selectedElementId) return;
    const newElements = elements.filter(el => el.id !== selectedElementId);
    setSelectedElementId(null);
    setState(newElements);
  }, [selectedElementId, elements, history, historyIndex]);

  const duplicateSelected = useCallback(() => {
    if (!selectedElementId) return;
    const elementToDuplicate = elements.find(el => el.id === selectedElementId);
    if (elementToDuplicate) {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const newElement: CanvasElement = {
        ...elementToDuplicate,
        id,
        x: elementToDuplicate.x + 10,
        y: elementToDuplicate.y + 10,
        zIndex: elements.length,
      };
      setState([...elements, newElement]);
      setSelectedElementId(id);
    }
  }, [selectedElementId, elements, history, historyIndex]);

  const clearCanvas = useCallback(() => {
    if (elements.length === 0) return;
    setSelectedElementId(null);
    setState([]);
  }, [elements, history, historyIndex]);
  
  const bringForward = useCallback(() => {
    if (!selectedElementId) return;
    const newElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
    const currentIndex = newElements.findIndex(el => el.id === selectedElementId);
    if(currentIndex < newElements.length - 1){
      const currentElement = newElements[currentIndex];
      const nextElement = newElements[currentIndex + 1];
      currentElement.zIndex = nextElement.zIndex;
      nextElement.zIndex = currentElement.zIndex - 1;

      // Re-map z-indices to be continuous from 0
      const sorted = newElements.sort((a, b) => a.zIndex - b.zIndex);
      sorted.forEach((el, index) => el.zIndex = index);
      setState(sorted);
    }
  }, [selectedElementId, elements, history, historyIndex]);

  const sendBackward = useCallback(() => {
    if (!selectedElementId) return;
    const newElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
    const currentIndex = newElements.findIndex(el => el.id === selectedElementId);
    if (currentIndex > 0) {
      const currentElement = newElements[currentIndex];
      const prevElement = newElements[currentIndex - 1];
      currentElement.zIndex = prevElement.zIndex;
      prevElement.zIndex = currentElement.zIndex + 1;
      
      const sorted = newElements.sort((a, b) => a.zIndex - b.zIndex);
      sorted.forEach((el, index) => el.zIndex = index);
      setState(sorted);
    }
  }, [selectedElementId, elements, history, historyIndex]);


  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  return {
    elements,
    setElements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
    addElement,
    deleteSelected,
    duplicateSelected,
  clearCanvas,
    bringForward,
    sendBackward,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  };
};