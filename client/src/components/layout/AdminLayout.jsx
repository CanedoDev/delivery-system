import AdminHeader from '../admin/AdminHeader.jsx';
import Sidebar from '../admin/Sidebar.jsx';

export default function AdminLayout({ children, title = 'Painel Admin' }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Cabeçalho do Admin */}
            <AdminHeader title={title} />

            <div className="flex flex-1">
                {/* Menu Lateral */}
                <Sidebar />

                {/* Área principal onde o conteúdo de cada página é renderizado */}
                <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
