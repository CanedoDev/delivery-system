function EmptyState({
  iconUrl = 'https://api.iconify.design/lucide:package-open.svg?color=%2394a3b8',
  title = 'Nenhum item encontrado',
  message = 'Não há dados disponíveis no momento.',
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-dashed border-slate-300 my-5">
      {iconUrl && (
        <img 
          src={iconUrl} 
          alt="Ícone de estado vazio" 
          className="w-12 h-12 mb-4 opacity-70" 
        />
      )}

      <h3 className="text-lg font-bold text-slate-800 mb-1.5">
        {title}
      </h3>
      
      <p className="text-sm text-slate-500 max-w-sm mb-0">
        {message}
      </p>

      {action && (
        <div className="mt-3.5">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
