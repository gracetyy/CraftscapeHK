import React, { useState, useCallback, useMemo, useEffect } from "react";
import type {
  Craft,
  Product,
  AiLayout,
  CanvasElement,
  GlyphName,
} from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import { useCanvasState } from "./hooks/useCanvasState";
import AiDraftModal from "./components/AiDraftModal";
import Canvas from "./components/Canvas";
import GlyphLibrary from "./components/GlyphLibrary";
import Toolbar from "./components/Toolbar";
import { generateDrafts } from "../services/textLabGeminiService";
import { GLYPH_LIBRARY } from "../constants";

interface TextLabProps {
  craft?: Craft;
  product?: Product;
  onClose: () => void;
}

const TextLabOriginal: React.FC<TextLabProps> = ({
  craft,
  product,
  onClose,
}) => {
  const { language } = useLanguage();

  const {
    elements,
    setElements,
    selectedElementId,
    setSelectedElementId,
    undo,
    redo,
    canUndo,
    canRedo,
    updateElement,
    addElement,
    duplicateSelected,
    deleteSelected,
    clearCanvas,
    bringForward,
    sendBackward,
  } = useCanvasState();

  const [fontWeight, setFontWeight] = useState(900);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<AiLayout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(true);

  const glyphMap = useMemo(
    () => new Map(GLYPH_LIBRARY.map((g) => [g.glyph, g.name])),
    []
  );

  const selectedElement = useMemo(() => {
    if (!selectedElementId) return null;
    return elements.find((el) => el.id === selectedElementId) ?? null;
  }, [elements, selectedElementId]);

  useEffect(() => {
    if (!selectedElement) return;
    const nextWeight = selectedElement.fontWeight;
    setFontWeight((current) => (current === nextWeight ? current : nextWeight));
  }, [selectedElement?.id, selectedElement?.fontWeight]);

  const currentFontWeight = selectedElement?.fontWeight ?? fontWeight;

  const handleFontWeightChange = useCallback(
    (newWeight: number) => {
      if (selectedElement) {
        updateElement(selectedElement.id, { fontWeight: newWeight });
      }
      setFontWeight(newWeight);
    },
    [selectedElement, updateElement]
  );

  const handleToggleMirror = useCallback(() => {
    if (!selectedElementId) return;
    const element = elements.find((el) => el.id === selectedElementId);
    if (!element) return;
    updateElement(selectedElementId, { isMirror: !element.isMirror });
  }, [selectedElementId, elements, updateElement]);

  const handleToggleOutline = useCallback(() => {
    if (!selectedElementId) return;
    const element = elements.find((el) => el.id === selectedElementId);
    if (!element) return;
    updateElement(selectedElementId, { isOutline: !element.isOutline });
  }, [selectedElementId, elements, updateElement]);
  const handleRequestClear = useCallback(() => {
    if (elements.length === 0) return;
    setIsClearConfirmOpen(true);
  }, [elements.length]);

  const handleConfirmClear = useCallback(() => {
    clearCanvas();
    setFontWeight(900);
    setIsClearConfirmOpen(false);
  }, [clearCanvas]);

  const handleCancelClear = useCallback(() => {
    setIsClearConfirmOpen(false);
  }, []);

  const handleGenerateDrafts = useCallback(async () => {
    if (!prompt.trim()) {
      setError(
        language === "zh"
          ? "請輸入一個概念或詞語。"
          : "Please enter a concept or word."
      );
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateDrafts(prompt);
      setDrafts(result);
      setIsModalOpen(true);
    } catch (e) {
      setError(
        language === "zh"
          ? "生成草稿失敗，請重試。"
          : "Failed to generate drafts. Please try again."
      );
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, language]);

  const handleSelectDraft = (layout: AiLayout) => {
    const newElements: CanvasElement[] = layout.elements.map((el, index) => ({
      ...el,
      id: `${Date.now()}-${index}`,
      char: glyphMap.get(el.glyph) || "?",
      zIndex: index,
      isMirror: el.isMirror ?? false,
      isOutline: el.isOutline ?? false,
    }));
    setElements(newElements);
    setIsModalOpen(false);
  };

  const handleGlyphActivate = useCallback(
    (glyph: GlyphName, char: string) => {
      const centerX = 150;
      const centerY = 150;
      const spread = 18;
      const index = elements.length;
      const ring = Math.floor(index / 6);
      const angle = (index % 6) * (Math.PI / 3);
      const offsetRadius = ring * spread + spread;
      const targetX = centerX + Math.cos(angle) * offsetRadius;
      const targetY = centerY + Math.sin(angle) * offsetRadius;
      const clamp = (value: number) => Math.min(285, Math.max(15, value));
      addElement(glyph, char, clamp(targetX), clamp(targetY));
      setIsLibraryCollapsed(true);
    },
    [elements, addElement, setIsLibraryCollapsed]
  );

  const handleExport = (format: "svg" | "pdf") => {
    const canvas = document.getElementById("canvas-svg");
    if (!canvas) return;

    let svgString = new XMLSerializer().serializeToString(canvas);

    const creditText = `<text x="50%" y="295" dominant-baseline="middle" text-anchor="middle" font-size="5" fill="#9ca3af">${
      language === "zh" ? "由 Text Lab 創建" : "Created with Text Lab"
    }</text>`;
    svgString = svgString.replace("</svg>", `${creditText}</svg>`);

    if (format === "svg") {
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "typography-stamp.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert(
        language === "zh"
          ? "PDF 匯出功能即將推出！"
          : "PDF export is a planned feature!"
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)] flex flex-col font-sans antialiased transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between p-4 border-b border-[var(--color-border)] flex-shrink-0 bg-[var(--color-surface)] shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--color-secondary-accent)] rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <svg
            className="w-8 h-8 text-[var(--color-primary-accent)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13" />
            <path d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z" />
            <path d="M5 22h14" />
          </svg>
          <h1 className="text-xl font-bold tracking-tight">
            {language === "zh" ? "文字實驗室" : "Text Lab"}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-2 md:p-4 flex-1 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          {/* Left Panel */}
          <div className="lg:w-1/4 xl:w-1/5 flex flex-col gap-4">
            {/* AI Composition Panel */}
            <div className="p-4 bg-[var(--color-surface)] rounded-lg shadow-md flex-shrink-0 border border-[var(--color-border)]">
              <h2 className="font-bold mb-2">
                {language === "zh" ? "AI 構圖" : "AI Composition"}
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                {language === "zh"
                  ? "輸入一個詞語或概念（例如：龍、香港、❤️）。"
                  : "Enter a word or concept (e.g., 'Dragon', '香港', '❤️')."}
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    language === "zh" ? "您的概念..." : "Your concept here..."
                  }
                  className="w-full px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)]"
                />
                <button
                  onClick={handleGenerateDrafts}
                  disabled={isLoading}
                  className="w-full px-4 py-2 font-semibold text-white bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-accent-hover)] rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading
                    ? language === "zh"
                      ? "生成中..."
                      : "Generating..."
                    : language === "zh"
                    ? "生成草稿"
                    : "Generate Drafts"}
                </button>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
            </div>

            {/* Glyph Library */}
            <GlyphLibrary
              isCollapsed={isLibraryCollapsed}
              setIsCollapsed={setIsLibraryCollapsed}
              onGlyphActivate={handleGlyphActivate}
            />
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Toolbar */}
            <Toolbar
              undo={undo}
              redo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
              duplicateSelected={duplicateSelected}
              deleteSelected={deleteSelected}
              canModifySelection={!!selectedElementId}
              bringForward={bringForward}
              sendBackward={sendBackward}
              canBringForward={!!selectedElementId}
              canSendBackward={!!selectedElementId}
              isMirror={selectedElement?.isMirror ?? false}
              toggleMirror={handleToggleMirror}
              isOutline={selectedElement?.isOutline ?? false}
              toggleOutline={handleToggleOutline}
              fontWeight={currentFontWeight}
              onFontWeightChange={handleFontWeightChange}
            />

            {/* Canvas */}
            <Canvas
              elements={elements}
              selectedElementId={selectedElementId}
              setSelectedElementId={setSelectedElementId}
              updateElement={updateElement}
              addElement={addElement}
            />

            {/* Export Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleExport("svg")}
                  className="px-4 py-2 text-sm font-semibold bg-[var(--color-bg)] border border-[var(--color-border)] hover:bg-[var(--color-secondary-accent)] rounded-md transition-colors"
                >
                  {language === "zh" ? "匯出 SVG" : "Export SVG"}
                </button>
                <button
                  onClick={() => handleExport("pdf")}
                  className="px-4 py-2 text-sm font-semibold bg-[var(--color-bg)] border border-[var(--color-border)] hover:bg-[var(--color-secondary-accent)] rounded-md transition-colors"
                >
                  {language === "zh" ? "匯出 PDF" : "Export PDF"}
                </button>
              </div>
              <button
                onClick={handleRequestClear}
                disabled={elements.length === 0}
                className="ml-auto px-4 py-2 text-sm font-semibold rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {language === "zh" ? "清空畫布" : "Clear Canvas"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* AI Draft Modal */}
      {isModalOpen && (
        <AiDraftModal
          drafts={drafts}
          onSelect={handleSelectDraft}
          onClose={() => setIsModalOpen(false)}
          glyphMap={glyphMap}
          language={language}
        />
      )}

      {isClearConfirmOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-2">
              {language === "zh" ? "清空畫布？" : "Clear canvas?"}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              {language === "zh"
                ? "此操作會移除所有元素，且無法復原。確定要繼續嗎？"
                : "This will remove all elements and cannot be undone. Are you sure you want to continue?"}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancelClear}
                className="px-4 py-2 text-sm font-semibold rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] hover:bg-[var(--color-secondary-accent)] transition-colors"
              >
                {language === "zh" ? "取消" : "Cancel"}
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-4 py-2 text-sm font-semibold rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                {language === "zh" ? "清空" : "Clear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextLabOriginal;
