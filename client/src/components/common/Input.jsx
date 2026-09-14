export default function Input({ type, name, text, placeholder, value, handleOnChange }) {
    return (
        <div className="flex flex-col mb-4 text-left">
            <label
                htmlFor={name}
                className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
            >{text}</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={handleOnChange} 
                className="w-full px-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
        </div>
    );
}