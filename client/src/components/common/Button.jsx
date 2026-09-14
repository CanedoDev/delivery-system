

export default function Button({ 
    text = "Enviar", 
    children, 
    loading = false, 
    type = 'button', 
    onClick, 
    variant = 'primary', 
    className = '', 
    disabled = false,
    fullWidth = true,
    icon: Icon,
    ...props 
}) {
    const baseStyles = "py-3.5 px-4 font-semibold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]";

    const variants = {
        primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
        outline: "border border-purple-600 text-purple-600 hover:bg-purple-50",
        danger: "bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20",
    };

    const widthStyle = fullWidth ? "w-full" : "w-auto";
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            className={`${widthStyle} ${baseStyles} ${variants[variant] || variants.primary} ${isDisabled ? 'opacity-70 cursor-not-allowed active:scale-100' : ''} ${className}`}
            {...props}
        >
            {loading ? (
                <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Carregando...</span>
                </>
            ) : (
                <>
                    {Icon && <Icon className="w-5 h-5" />}
                    {children || text}
                </>
            )}
        </button>
    );
}