'use client';

import { generateNDAText } from '@/lib/nda-text';

interface NDAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  visitorName: string;
  visitorCompany: string;
  visitDate: string;
}

export default function NDAModal({ isOpen, onClose, onAgree, visitorName, visitorCompany, visitDate }: NDAModalProps) {
  if (!isOpen) return null;

  const ndaText = generateNDAText({
    visitorName: visitorName || '[Your Name]',
    visitorCompany: visitorCompany || '',
    visitDate: visitDate || new Date().toLocaleDateString(),
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b-2 border-black flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">Non-Disclosure Agreement</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-black text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="prose max-w-none">
            <p className="text-sm text-black mb-4">
              Please read the following Non-Disclosure Agreement carefully. By signing in to ORNN AI INC, you agree to be bound by its terms.
            </p>
            <pre className="whitespace-pre-wrap font-sans text-sm text-black leading-relaxed bg-white p-4 rounded-lg border-2 border-black">
              {ndaText}
            </pre>
          </div>
        </div>

        <div className="p-6 border-t-2 border-black flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border-2 border-black rounded-lg text-black hover:bg-white transition"
          >
            Decline
          </button>
          <button
            onClick={onAgree}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
}
