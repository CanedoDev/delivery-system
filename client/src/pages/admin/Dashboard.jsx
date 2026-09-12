import AdminLayout from '../../components/layout/AdminLayout.jsx';
import { ShoppingBag, DollarSign, Package } from 'lucide-react';

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard">
            {/* Cards de Métricas / Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 uppercase font-semibold">Pedidos Hoje</span>
                        <p className="text-2xl font-bold text-gray-800">12</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 uppercase font-semibold">Faturamento</span>
                        <p className="text-2xl font-bold text-gray-800">R$ 540,00</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 uppercase font-semibold">Produtos Ativos</span>
                        <p className="text-2xl font-bold text-gray-800">28</p>
                    </div>
                </div>

            </div>

            {/* Área Principal de Boas-Vindas */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs text-center py-16 space-y-2 mt-6">
                <h2 className="text-xl font-bold text-gray-800">Tudo pronto por aqui! 🎉</h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Você está autenticado com sucesso e dentro do painel protegido. O cabeçalho acima gerencia seu perfil, notificações e logout.
                </p>
            </div>
        </AdminLayout>
    );
}

