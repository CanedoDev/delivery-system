import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fundo escuro desfocado (Overlay) */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Container do Modal */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 text-slate-100">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h3 className="text-lg font-bold text-slate-100">
            {title}
          </h3>
          <button
            onClick={onClose}
            type="button"
            aria-label="Fechar modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="p-5 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}