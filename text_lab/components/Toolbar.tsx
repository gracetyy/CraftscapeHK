import React, { useMemo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const IconButton: React.FC<{
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}> = ({ onClick, disabled, children, title }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className="p-2 rounded-md hover:bg-[var(--color-secondary-accent)] disabled:text-[var(--color-text-secondary)] disabled:cursor-not-allowed disabled:bg-transparent transition-colors"
  >
    {children}
  </button>
);

interface ToolbarProps {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  duplicateSelected: () => void;
  deleteSelected: () => void;
  canModifySelection: boolean;
  bringForward: () => void;
  sendBackward: () => void;
  canBringForward: boolean;
  canSendBackward: boolean;
  isMirror: boolean;
  toggleMirror: () => void;
  isOutline: boolean;
  toggleOutline: () => void;
  fontWeight: number;
  onFontWeightChange: (weight: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  undo,
  redo,
  canUndo,
  canRedo,
  duplicateSelected,
  deleteSelected,
  canModifySelection,
  bringForward,
  sendBackward,
  canBringForward,
  canSendBackward,
  isMirror,
  toggleMirror,
  isOutline,
  toggleOutline,
  fontWeight,
  onFontWeightChange,
}) => {
  const { language } = useLanguage();
  const disableSelectionActions = !canModifySelection;
  const labels = useMemo(() => {
    if (language === "zh") {
      return {
        undo: "復原",
        redo: "重做",
        duplicate: "複製",
        delete: "刪除",
        sendBackward: "向後移一層",
        bringForward: "向前移一層",
        mirror: "鏡像",
        outline: "描邊",
        weight: "字重",
      };
    }
    return {
      undo: "Undo",
      redo: "Redo",
      duplicate: "Duplicate",
      delete: "Delete",
      sendBackward: "Send Backward",
      bringForward: "Bring Forward",
      mirror: "Mirror",
      outline: "Outline",
      weight: "Weight",
    };
  }, [language]);

  return (
    <div className="p-2 bg-[var(--color-surface)] rounded-lg shadow-md flex flex-wrap items-center justify-center gap-2 border border-[var(--color-border)]">
      <div className="flex items-center border-r border-[var(--color-border)] pr-2">
        <IconButton onClick={undo} disabled={!canUndo} title={labels.undo}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l4-4m-4 4l4 4"
            />
          </svg>
        </IconButton>
        <IconButton onClick={redo} disabled={!canRedo} title={labels.redo}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 10h-10a8 8 0 00-8 8v2m18-10l-4-4m4 4l-4 4"
            />
          </svg>
        </IconButton>
      </div>

      <div className="flex items-center border-r border-[var(--color-border)] pr-2">
        <IconButton
          onClick={duplicateSelected}
          disabled={!canModifySelection}
          title={labels.duplicate}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </IconButton>
        <IconButton
          onClick={deleteSelected}
          disabled={!canModifySelection}
          title={labels.delete}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </IconButton>
      </div>

      <div className="flex items-center border-r border-[var(--color-border)] pr-2">
        <IconButton
          onClick={sendBackward}
          disabled={!canSendBackward}
          title={labels.sendBackward}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect
              x="9"
              y="9"
              width="12"
              height="12"
              rx="2"
              fill="currentColor"
              fillOpacity="0.5"
            />
            <path d="M15 5H7a2 2 0 0 0-2 2v8" />
            <rect
              x="5"
              y="5"
              width="12"
              height="12"
              rx="2"
              stroke="currentColor"
              fill="none"
            />
          </svg>
        </IconButton>
        <IconButton
          onClick={bringForward}
          disabled={!canBringForward}
          title={labels.bringForward}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect
              x="5"
              y="5"
              width="12"
              height="12"
              rx="2"
              fill="currentColor"
              fillOpacity="0.5"
            />
            <path d="M9 19h8a2 2 0 0 0 2-2v-8" />
            <rect
              x="9"
              y="9"
              width="12"
              height="12"
              rx="2"
              stroke="currentColor"
              fill="none"
            />
          </svg>
        </IconButton>
      </div>

      <div className="flex items-center space-x-2 border-r border-[var(--color-border)] pr-2">
        <label
          className={`flex items-center ${
            disableSelectionActions
              ? "opacity-60 pointer-events-none"
              : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            checked={isMirror}
            onChange={toggleMirror}
            className="sr-only peer"
            disabled={disableSelectionActions}
          />
          <div className="relative w-11 h-6 bg-[var(--color-bg)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary-accent)] rounded-full peer border border-[var(--color-border)] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary-accent)]"></div>
          <span className="ml-2 text-sm font-medium">{labels.mirror}</span>
        </label>
        <label
          className={`flex items-center ${
            disableSelectionActions
              ? "opacity-60 pointer-events-none"
              : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            checked={isOutline}
            onChange={toggleOutline}
            className="sr-only peer"
            disabled={disableSelectionActions}
          />
          <div className="relative w-11 h-6 bg-[var(--color-bg)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary-accent)] rounded-full peer border border-[var(--color-border)] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary-accent)]"></div>
          <span className="ml-2 text-sm font-medium">{labels.outline}</span>
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <label
          className={`flex items-center space-x-2 ${
            disableSelectionActions ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <span className="text-sm font-medium">{labels.weight}:</span>
          <input
            type="range"
            min="100"
            max="900"
            step="100"
            value={fontWeight}
            onChange={(e) => onFontWeightChange(Number(e.target.value))}
            className="w-20 h-2 bg-[var(--color-bg)] rounded-lg appearance-none cursor-pointer border border-[var(--color-border)]
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary-accent)] 
              [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--color-primary-accent)] [&::-moz-range-thumb]:border-0 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ touchAction: "none" }}
            disabled={disableSelectionActions}
          />
          <span className="text-xs text-[var(--color-text-secondary)] min-w-[2rem]">
            {fontWeight}
          </span>
        </label>
      </div>
    </div>
  );
};

export default Toolbar;
