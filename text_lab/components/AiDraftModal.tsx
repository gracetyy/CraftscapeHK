import React, { useMemo } from "react";
import type { AiLayout } from "../../types";
import { GLYPH_LIBRARY } from "../../constants";

interface AiDraftModalProps {
  drafts: AiLayout[];
  onSelect: (layout: AiLayout) => void;
  onClose: () => void;
  glyphMap: Map<string, string>;
  language: string;
}

const AiDraftModal: React.FC<AiDraftModalProps> = ({
  drafts,
  onSelect,
  onClose,
  glyphMap,
  language,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--color-surface)] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-[var(--color-border)]">
        <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-bold">
            {language === "zh" ? "AI 設計草稿" : "AI Drafts"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--color-secondary-accent)] transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {drafts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {drafts.map((draft, index) => (
                <div
                  key={index}
                  className="border border-[var(--color-border)] rounded-lg p-4 flex flex-col items-center gap-4 hover:border-[var(--color-primary-accent)] transition-colors cursor-pointer"
                  onClick={() => onSelect(draft)}
                >
                  <div className="w-full aspect-square bg-[var(--color-bg)] rounded-md p-2 border border-[var(--color-border)]">
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      <g>
                        {draft.elements.map((el, elIndex) => {
                          const assumedSize = 48;
                          const outline = el.isOutline ?? false;
                          const fontWeight = el.fontWeight ?? 900;
                          return (
                            <g
                              key={elIndex}
                              transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation}) scale(${el.scale})`}
                            >
                              <g
                                transform={
                                  el.isMirror ? "scale(-1, 1)" : undefined
                                }
                              >
                                <text
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  style={{
                                    fontFamily: '"Noto Serif SC", serif',
                                    fontWeight,
                                    fontSize: `${assumedSize}px`,
                                    fill: outline
                                      ? "none"
                                      : "var(--color-text-primary)",
                                    stroke: outline
                                      ? "var(--color-text-primary)"
                                      : "none",
                                    strokeWidth: outline
                                      ? 1.5 / (el.scale || 1)
                                      : 0,
                                    paintOrder: "stroke",
                                  }}
                                >
                                  {glyphMap.get(el.glyph) || "?"}
                                </text>
                              </g>
                            </g>
                          );
                        })}
                      </g>
                    </svg>
                  </div>
                  <p className="text-sm text-center text-[var(--color-text-secondary)]">
                    {draft.description ||
                      `${language === "zh" ? "構圖" : "Composition"} ${
                        index + 1
                      }`}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--color-text-secondary)]">
              {language === "zh"
                ? "沒有生成草稿，請嘗試不同的提示。"
                : "No drafts were generated. Try a different prompt."}
            </p>
          )}
        </div>
        <div className="p-4 border-t border-[var(--color-border)] text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-secondary-accent)] transition-colors"
          >
            {language === "zh" ? "取消" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiDraftModal;
