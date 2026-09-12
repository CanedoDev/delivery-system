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

    // Itens de navegação do painel
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
            {/* Backdrop escuro no Mobile quando o menu abre */}
            {isOpen && (
                <div 
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
                />
            )}

            {/* Conteúdo da Sidebar */}
            <aside className={`
                fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200/80 
                flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                
                {/* Topo: Logo & Marca */}
                <div>
                    <div className="h-16 px-6 flex items-center justify-between border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-600/30">
                                <Flame className="w-5 h-5 fill-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-gray-900 text-base leading-none">DeliveryAdmin</h1>
                                <span className="text-[10px] uppercase font-semibold text-orange-600 tracking-wider">Painel de Controle</span>
                            </div>
                        </div>

                        {/* Botão fechar (visível apenas em telas pequenas) */}
                        {onClose && (
                            <button 
                                onClick={onClose}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 md:hidden transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Lista de Navegação */}
                    <nav className="p-4 space-y-1.5">
                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
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
                                            ? 'bg-orange-50 text-orange-600 font-semibold shadow-xs' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                        <span>{item.label}</span>
                                    </div>

                                    {/* Badge opcional de destaque (ex: pedidos pendentes) */}
                                    {item.badge && (
                                        <span className="px-2 py-0.5 text-xs font-bold bg-orange-100 text-orange-600 rounded-full">
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
