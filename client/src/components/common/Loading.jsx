import { Loader2 } from 'lucide-react';

export default function Loading({ 
  text = 'Carregando...', 
  fullScreen = false, 
  size = 'md' 
}) {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-50 flex flex-col items-center justify-center'
    : 'flex flex-col items-center justify-center p-8 w-full';

  return (
    <div className={containerClasses}>
      <Loader2 className={`${sizeMap[size] || sizeMap.md} animate-spin text-purple-600`} />
      {text && (
        <p className="mt-3 text-sm font-medium text-slate-500 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
