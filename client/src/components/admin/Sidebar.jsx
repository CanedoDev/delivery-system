import { NavLink } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    UtensilsCrossed, 
    Layers, 
    TrendingUp, 
    Settings, 
    X,
    Flame
} from 'lucide-react';

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/orders', label: 'Pedidos', icon: ShoppingBag, badge: '12' },
        { path: '/products', label: 'Produtos', icon: UtensilsCrossed },
        { path: '/categories', label: 'Categorias', icon: Layers },
        { path: '/financial', label: 'Financeiro', icon: TrendingUp },
        { path: '/settings', label: 'Configurações', icon: Settings },
    ];

    return (
        <>
            {isOpen && (
                <div 
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
                />
            )}

            <aside className={`
                fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 
                flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                
                <div>
                    <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-600/30">
                                <Flame className="w-5 h-5 fill-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-slate-100 text-base leading-none">DeliveryAdmin</h1>
                                <span className="text-[10px] uppercase font-semibold text-orange-500 tracking-wider">Painel de Controle</span>
                            </div>
                        </div>

                        {onClose && (
                            <button 
                                onClick={onClose}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 md:hidden transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <nav className="p-4 space-y-1.5">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
                            Menu Principal
                        </p>

                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) => `
                                        flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                        ${isActive 
                                            ? 'bg-orange-500/15 text-orange-400 font-semibold border border-orange-500/20' 
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                        <span>{item.label}</span>
                                    </div>

                                    {item.badge && (
                                        <span className="px-2 py-0.5 text-xs font-bold bg-orange-500/20 text-orange-400 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

            </aside>
        </>
    );
}
