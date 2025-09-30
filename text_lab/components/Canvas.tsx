import React, { useRef, useState, useCallback } from "react";
import type { CanvasElement, GlyphName } from "../../types";

interface CanvasProps {
  elements: CanvasElement[];
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  addElement: (
    glyph: GlyphName,
    char: string,
    x: number,
    y: number,
    fontWeight?: number,
    options?: { isMirror?: boolean; isOutline?: boolean }
  ) => string;
}

type TransformInfo =
  | {
      mode: "move";
      id: string;
      startX: number;
      startY: number;
      elStartX: number;
      elStartY: number;
    }
  | {
      mode: "rotate";
      id: string;
      centerX: number;
      centerY: number;
      startAngle: number;
      elStartRotation: number;
    }
  | {
      mode: "scale";
      id: string;
      centerX: number;
      centerY: number;
      startDist: number;
      elStartScale: number;
    };

const Canvas: React.FC<CanvasProps> = ({
  elements,
  selectedElementId,
  setSelectedElementId,
  updateElement,
  addElement,
}) => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [transformInfo, setTransformInfo] = useState<TransformInfo | null>(
    null
  );
  const activePointerIdRef = useRef<number | null>(null);

  const getPointerPos = useCallback(
    (e: React.PointerEvent): { x: number; y: number } => {
      if (!canvasRef.current) return { x: 0, y: 0 };
      const rect = canvasRef.current.getBoundingClientRect();
      const scale = 300 / rect.width;
      const x = (e.clientX - rect.left) * scale;
      const y = (e.clientY - rect.top) * scale;
      return { x, y };
    },
    []
  );

  const handleDrop = (e: React.DragEvent<SVGSVGElement>) => {
    e.preventDefault();
    const glyph = e.dataTransfer.getData("glyph") as GlyphName;
    const glyphChar = e.dataTransfer.getData("glyphChar");

    if (glyph && glyphChar && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const scale = 300 / rect.width;
      const x = (e.clientX - rect.left) * scale;
      const y = (e.clientY - rect.top) * scale;
      addElement(glyph, glyphChar, x, y);
    }
  };

  const handleElementPointerDown = (
    e: React.PointerEvent,
    el: CanvasElement
  ) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    activePointerIdRef.current = e.pointerId;
    setSelectedElementId(el.id);
    const pos = getPointerPos(e);
    setTransformInfo({
      mode: "move",
      id: el.id,
      startX: pos.x,
      startY: pos.y,
      elStartX: el.x,
      elStartY: el.y,
    });
    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const handleRotatePointerDown = (
    e: React.PointerEvent,
    el: CanvasElement
  ) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    activePointerIdRef.current = e.pointerId;
    const pos = getPointerPos(e);
    const dx = pos.x - el.x;
    const dy = pos.y - el.y;
    setTransformInfo({
      mode: "rotate",
      id: el.id,
      centerX: el.x,
      centerY: el.y,
      startAngle: Math.atan2(dy, dx) * (180 / Math.PI),
      elStartRotation: el.rotation,
    });
    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const handleScalePointerDown = (e: React.PointerEvent, el: CanvasElement) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    activePointerIdRef.current = e.pointerId;
    const pos = getPointerPos(e);
    const dx = pos.x - el.x;
    const dy = pos.y - el.y;
    setTransformInfo({
      mode: "scale",
      id: el.id,
      centerX: el.x,
      centerY: el.y,
      startDist: Math.hypot(dx, dy),
      elStartScale: el.scale,
    });
    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!transformInfo) return;
    if (
      activePointerIdRef.current !== null &&
      e.pointerId !== activePointerIdRef.current
    )
      return;

    const pos = getPointerPos(e);
    const { id } = transformInfo;

    switch (transformInfo.mode) {
      case "move":
        const dx = pos.x - transformInfo.startX;
        const dy = pos.y - transformInfo.startY;
        updateElement(id, {
          x: transformInfo.elStartX + dx,
          y: transformInfo.elStartY + dy,
        });
        break;

      case "rotate":
        const rdx = pos.x - transformInfo.centerX;
        const rdy = pos.y - transformInfo.centerY;
        const currentAngle = Math.atan2(rdy, rdx) * (180 / Math.PI);
        const rotation =
          transformInfo.elStartRotation +
          (currentAngle - transformInfo.startAngle);
        updateElement(id, { rotation });
        break;

      case "scale":
        const s_dx = pos.x - transformInfo.centerX;
        const s_dy = pos.y - transformInfo.centerY;
        const currentDist = Math.hypot(s_dx, s_dy);
        const scale =
          (currentDist / transformInfo.startDist) * transformInfo.elStartScale;
        if (scale > 0.1) {
          // Prevent inverting/disappearing
          updateElement(id, { scale });
        }
        break;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (
      activePointerIdRef.current !== null &&
      e.pointerId !== activePointerIdRef.current
    ) {
      return;
    }
    setTransformInfo(null);
    if (activePointerIdRef.current !== null && canvasRef.current) {
      try {
        canvasRef.current.releasePointerCapture(activePointerIdRef.current);
      } catch {
        // Ignore if pointer capture was already released
      }
    }
    activePointerIdRef.current = null;
  };

  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="flex-1 bg-[var(--color-surface)] rounded-lg shadow-md p-4 flex items-center justify-center aspect-square border border-[var(--color-border)]">
      <svg
        id="canvas-svg"
        ref={canvasRef}
        viewBox="0 0 300 300"
        className="w-full h-full bg-[var(--color-bg)] cursor-default touch-none"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          setSelectedElementId(null);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Grid Lines */}
        <defs>
          <pattern
            id="grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <line
          x1="150"
          y1="0"
          x2="150"
          y2="300"
          stroke="var(--color-border)"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="150"
          x2="300"
          y2="150"
          stroke="var(--color-border)"
          strokeWidth="0.5"
        />

        {/* Elements with content and selection UI */}
        {sortedElements.map((el) => {
          const isSelected = selectedElementId === el.id;
          const assumedSize = 48; // Corresponds to font-size
          const halfSize = assumedSize / 2;
          const outline = el.isOutline;

          return (
            <g key={el.id}>
              {/* Element content */}
              <g
                transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation}) scale(${el.scale})`}
                onPointerDown={(e) => handleElementPointerDown(e, el)}
                className="cursor-move"
              >
                <g transform={el.isMirror ? "scale(-1, 1)" : undefined}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="select-none"
                    style={{
                      fontFamily: '"Noto Serif SC", serif',
                      fontWeight: el.fontWeight,
                      fontSize: `${assumedSize}px`,
                      fill: outline ? "none" : "var(--color-text-primary)",
                      stroke: outline ? "var(--color-text-primary)" : "none",
                      strokeWidth: outline ? 1.5 / el.scale : 0,
                      paintOrder: "stroke",
                    }}
                  >
                    {el.char}
                  </text>
                </g>
              </g>

              {/* Selection UI */}
              {isSelected && (
                <g
                  transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation}) scale(${el.scale})`}
                >
                  <rect
                    x={-halfSize}
                    y={-halfSize}
                    width={assumedSize}
                    height={assumedSize}
                    fill="none"
                    style={{ stroke: "var(--color-primary-accent)" }}
                    strokeWidth={1.5 / el.scale}
                    strokeDasharray={`${4 / el.scale} ${2 / el.scale}`}
                  />
                  <circle
                    cx={halfSize}
                    cy={-halfSize}
                    r={6 / el.scale}
                    className="cursor-alias"
                    style={{
                      fill: "var(--color-surface)",
                      stroke: "var(--color-primary-accent)",
                    }}
                    strokeWidth={1.5 / el.scale}
                    onPointerDown={(e) => {
                      handleRotatePointerDown(e, el);
                    }}
                  />
                  <rect
                    x={halfSize - 5 / el.scale}
                    y={halfSize - 5 / el.scale}
                    width={10 / el.scale}
                    height={10 / el.scale}
                    className="cursor-nwse-resize"
                    style={{
                      fill: "var(--color-surface)",
                      stroke: "var(--color-primary-accent)",
                    }}
                    strokeWidth={1.5 / el.scale}
                    onPointerDown={(e) => {
                      handleScalePointerDown(e, el);
                    }}
                  />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Canvas;
