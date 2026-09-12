import { useState } from 'react';
import { useEffect } from 'react';
import { Package } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import { getCategoriesService, createCategoriesService } from '../../services/categoryService.js';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';


export default function Categories() {

    //mostrar as categorias get

    //botao criar categorias
    //formulario
    //handlechange
    //input pro nome
    //handlesubmit

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategoriesService();
                setCategories(data);
            } catch (err) {
                console.error('erro ao buscar categorias', err);
            }
        }

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryName = category.name;
        const categoryDescription = category.description;

        if (!categoryName.trim()) {
            setError('Por favor, preencha o nome da categoria!');
            return;
        }

        setLoading(true);

        try {
            const newCategory = await createCategoriesService(categoryName, categoryDescription);

            setCategories([...categories, newCategory]);
            setSuccess('Categoria criada com sucesso!');
            setCategory({ name: '', description: '' });

        } catch (err) {
            console.log('erro na requisição', err);
            const msg = err.response?.data?.message || 'Erro ao criar categoria!';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Gerenciador de Categorias">
            <div className="space-y-6">

                {/* Card de Métrica */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-400 uppercase font-semibold">Total de Categorias</span>
                            <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
                        </div>
                    </div>
                </div>

                {/* Layout Grid: Lista na esquerda, Formulário na direita */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Lista de Categorias */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">Categorias Cadastradas</h3>

                        {categories.length === 0 ? (
                            <p className="text-gray-400 text-sm py-4 text-center">Nenhuma categoria cadastrada ainda.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="p-4 bg-gray-50/80 rounded-xl flex justify-between items-center border border-gray-100 hover:border-purple-200 transition-colors">
                                        <div>
                                            <span className="font-semibold text-gray-800 block">{cat.name}</span>
                                            {cat.description && <span className="text-xs text-gray-500">{cat.description}</span>}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cat.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {cat.active ? 'Ativa' : 'Inativa'}
                                            </span>
                                            <span className="text-xs text-gray-400 font-medium">
                                                Produtos: {cat.products?.length || cat._count?.products || 0}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Formulário de Cadastro de Categoria */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">Nova Categoria</h3>

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-medium">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-xs font-medium">
                                    {success}
                                </div>
                            )}

                            <Input
                                type="text"
                                name="name"
                                text="Nome da Categoria"
                                placeholder="Ex: Lanches, Bebidas, Sobremesas"
                                value={category.name}
                                handleOnChange={handleChange}
                            />

                            <Input
                                type="text"
                                name="description"
                                text="Descrição (Opcional)"
                                placeholder="Ex: Hambúrgueres artesanais e combos"
                                value={category.description}
                                handleOnChange={handleChange}
                            />

                            <Button text="Cadastrar Categoria" loading={loading} />
                        </form>
                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}