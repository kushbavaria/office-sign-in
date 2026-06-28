'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface SignaturePadProps {
  onSignatureChange: (signature: string | null) => void;
}

export default function SignaturePad({ onSignatureChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  // Set up canvas with proper resolution for retina displays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(ratio, ratio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    ctxRef.current = ctx;
  }, []);

  const getPointerPos = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const startDrawing = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const ctx = ctxRef.current;
    if (!ctx) return;

    isDrawingRef.current = true;
    const pos = getPointerPos(e);
    lastPointRef.current = pos;

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [getPointerPos]);

  const draw = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();

    const ctx = ctxRef.current;
    if (!ctx || !lastPointRef.current) return;

    const pos = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPointRef.current = pos;

    if (isEmpty) {
      setIsEmpty(false);
    }
  }, [getPointerPos, isEmpty]);

  const stopDrawing = useCallback(() => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    setHasSignature(true);
    onSignatureChange(dataUrl);
  }, [onSignatureChange]);

  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setIsEmpty(true);
    onSignatureChange(null);
  }, [onSignatureChange]);

  return (
    <div className="border-2 border-dashed border-black rounded-lg p-4 bg-white">
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        className="w-full bg-white rounded border border-gray-300 touch-none cursor-crosshair"
        style={{ height: '150px' }}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerLeave={stopDrawing}
      />
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-black">
          {hasSignature ? 'Signature captured' : 'Draw your signature above'}
        </p>
        {hasSignature && (
          <button
            type="button"
            onClick={clearSignature}
            className="text-sm text-black hover:text-black underline"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
