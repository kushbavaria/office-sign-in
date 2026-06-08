'use client';

import { useEffect, useRef, useState } from 'react';

interface SignatureGeneratorProps {
  name: string;
  onSignatureGenerated: (signature: string) => void;
}

export default function SignatureGenerator({ name, onSignatureGenerated }: SignatureGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signatureGenerated, setSignatureGenerated] = useState(false);

  useEffect(() => {
    if (name && canvasRef.current) {
      generateSignature();
    }
  }, [name]);

  const generateSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font for signature
    ctx.font = 'italic 400 32px "Bradley Hand", "Comic Sans MS", cursive, serif';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw signature
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

    // Convert to base64
    const signatureData = canvas.toDataURL('image/png');
    onSignatureGenerated(signatureData);
    setSignatureGenerated(true);
  };

  const handleRegenerate = () => {
    if (name) {
      generateSignature();
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
      <canvas
        ref={canvasRef}
        width={400}
        height={100}
        className="w-full bg-white rounded border border-gray-200"
      />
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-600">
          {signatureGenerated ? 'Signature generated from your name' : 'Enter your name to generate signature'}
        </p>
        {name && (
          <button
            type="button"
            onClick={handleRegenerate}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Regenerate
          </button>
        )}
      </div>
    </div>
  );
}