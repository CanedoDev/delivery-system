import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, User, Store } from 'lucide-react';

export default function AdminHeader({ onToggleSidebar, title = "Painel" }) {
    const navigate = useNavigate();

    // Recupera os dados do usuário salvos no login
    const [user] = useState(() => {
        try {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : { name: 'Administrador', email: 'admin@delivery.com' };
        } catch {
            return { name: 'Administrador', email: 'admin@delivery.com' };
        }
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-20 h-16 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 md:px-8 flex items-center justify-between shadow-xs transition-all">
            
            {/* Lado Esquerdo: Botão Hambúrguer (Mobile) e Título */}
            <div className="flex items-center gap-3">
                {onToggleSidebar && (
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="p-2 -ml-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden transition-colors cursor-pointer"
                        title="Abrir Menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                )}
                
                <div>
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">{title}</h2>
                    <p className="text-xs text-gray-400 hidden sm:block">Gerenciador do Delivery</p>
                </div>
            </div>

            {/* Lado Direito: Status da Loja, Notificações e Perfil */}
            <div className="flex items-center gap-3 sm:gap-4">
                
                {/* Indicador de Loja Aberta */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-xs font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <Store className="w-3.5 h-3.5" />
                    <span>Loja Aberta</span>
                </div>

                {/* Sino de Notificações de Pedidos */}
                <button
                    type="button"
                    className="relative p-2 rounded-xl text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                    title="Notificações de Novos Pedidos"
                >
                    <Bell className="w-5 h-5" />
                    {/* Badge com contador */}
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

                {/* Informações do Administrador */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm shadow-purple-600/20">
                        {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                    </div>

                    <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-800 leading-none">{user.name || 'Admin'}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{user.role || 'Administrador'}</p>
                    </div>
                </div>

                {/* Botão de Logout */}
                <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer ml-1"
                    title="Sair da Conta"
                >
                    <LogOut className="w-5 h-5" />
                </button>

            </div>

        </header>
    );
}
