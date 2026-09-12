

export default function Button({ text = "Enviar", loading = false, type = 'submit' }) {
    return (<button
        type={type}
        disabled={loading}
        className={`w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 active:scale-[0.99] transition-all duration-200 cursor-pointer mt-2 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
        {loading ? (
            <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Carregando...</span>
            </>
        ) : (
            text
        )}
    </button>)
}