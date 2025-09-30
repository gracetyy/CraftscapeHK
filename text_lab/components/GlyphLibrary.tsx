import React, { useRef } from "react";
import { GLYPH_LIBRARY } from "../../constants";
import type { GlyphName } from "../../types";
import { useLanguage } from "../../contexts/LanguageContext";

const DraggableGlyph: React.FC<{
  name: string;
  glyph: GlyphName;
  onActivate: (glyph: GlyphName, char: string) => void;
}> = ({ name, glyph, onActivate }) => {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("glyph", glyph);
    e.dataTransfer.setData("glyphChar", name);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.pointerType === "pen") {
      touchStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    }
  };

  const resetTouchTracking = () => {
    touchStartRef.current = null;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.pointerType === "pen") {
      const start = touchStartRef.current;
      resetTouchTracking();
      if (!start) return;
      const distance = Math.hypot(e.clientX - start.x, e.clientY - start.y);
      const duration = Date.now() - start.time;
      if (distance < 12 && duration < 500) {
        e.preventDefault();
        onActivate(glyph, name);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate(glyph, name);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={resetTouchTracking}
      onPointerCancel={resetTouchTracking}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="flex flex-col items-center justify-center p-2 bg-[var(--color-bg)] rounded-md cursor-grab active:cursor-grabbing hover:bg-[var(--color-secondary-accent)] transition-colors aspect-square border border-[var(--color-border)]"
      title={name}
    >
      <span
        className="text-3xl select-none text-[var(--color-text-primary)]"
        style={{ fontFamily: '"Noto Serif SC", serif', fontWeight: 900 }}
      >
        {name}
      </span>
    </div>
  );
};

interface GlyphLibraryProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  onGlyphActivate: (glyph: GlyphName, char: string) => void;
}

const GlyphLibrary: React.FC<GlyphLibraryProps> = ({
  isCollapsed,
  setIsCollapsed,
  onGlyphActivate,
}) => {
  const { language } = useLanguage();
  const heading = language === "zh" ? "部首與筆畫" : "Radicals & Strokes";

  return (
    <div className="flex-1 p-4 bg-[var(--color-surface)] rounded-lg shadow-md flex flex-col overflow-hidden border border-[var(--color-border)]">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex justify-between items-center text-left"
        aria-expanded={!isCollapsed}
        aria-controls="glyph-library-content"
      >
        <h2 className="font-bold">{heading}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform duration-300 ${
            isCollapsed ? "" : "rotate-180"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        id="glyph-library-content"
        className={`mt-3 transition-all duration-300 ease-in-out overflow-y-auto ${
          isCollapsed ? "max-h-0" : "max-h-60"
        }`}
      >
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2">
          {GLYPH_LIBRARY.map(({ name, glyph }) => (
            <DraggableGlyph
              key={glyph}
              name={name}
              glyph={glyph}
              onActivate={onGlyphActivate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlyphLibrary;
