import { useState, useEffect } from 'react';
import { Package, Plus, Pencil, Trash2, Power } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import {
    getCategoriesService,
    createCategoriesService,
    editCategoriesService,
    deleteCategoriesService,
    switchCategoriesService
} from '../../services/categoryService.js';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import Modal from '../../components/common/Modal.jsx';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({ name: '' });
    const [editingCategory, setEditingCategory] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    // 1.abrir pra CRIAR
    const handleOpenCreate = () => {
        setEditingCategory(null);
        setCategory({ name: '' });
        setError('');
        setSuccess('');
        setIsModalOpen(true);
    };

    // 2. abrir pra EDITAR
    const handleOpenEdit = (cat) => {
        setEditingCategory(cat);
        setCategory({ name: cat.name });
        setError('');
        setSuccess('');
        setIsModalOpen(true);
    };

    const handleOpenAdd = (cat) => {
        setAddProduct(cat);
        setCategory({ name: cat.name });
        setError('');
        setSuccess('');
        setIsModalOpen(true);
    };

    // 3. deletar 
    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) return;

        try {
            await deleteCategoriesService(id);
            setCategories(categories.filter(cat => cat.id !== id && cat._id !== id));
        } catch (err) {
            console.error('Erro ao deletar categoria', err);
            alert('Erro ao deletar categoria!');
        }
    };

    // 4. alternar status 
    const handleToggleActive = async (id) => {//o id veio ali de baixo do cat do map
        try {
            const res = await switchCategoriesService(id);
            const updated = res.category || res;
            setCategories(categories.map(cat => (cat.id === id || cat._id === id) ? updated : cat));
        } catch (err) {
            console.error('Erro ao alterar status da categoria', err);
        }
    };

    //salva as ateracoes digitadas nos inputs no setcategory -> category momentaneamente
    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    // 5. Submit (Criar ou Editar)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingCategory) {//ele descobre pelo valor da seteditingcategory que ta na funcao de quem abriu(criador ou editor)

            //o editingCategory é o cat que ta no handleEdit, que por sua vez veio do map do categories lá debaixo
            //que veio do categories, que veio do getCategories la no fetch do useeffect
            const response = await editCategoriesService(editingCategory.id, category.name);//aqui manda pro banco pelo categoryService
            const updatedCategory = response.category;//extrai a categoria do pacote inteiro(o response vem message e category)
            setCategories(categories.map(c => c.id === editingCategory.id ? updatedCategory : c));//aqui ele vai atualizar os dados visuais 
        } else {
            // Se está criando
            const created = await createCategoriesService(category.name);
            setCategories([...categories, created]);
        }

        setIsModalOpen(false);
    };


    return (
        <AdminLayout title="Gerenciador de Categorias">
            <div className="space-y-6">

                {/* Top Actions e Métricas */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4 hover:border-slate-700 transition-all min-w-[260px]">
                        <div className="w-12 h-12 bg-purple-950/80 text-purple-400 border border-purple-800/40 rounded-xl flex items-center justify-center font-bold">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 uppercase font-semibold">Total de Categorias</span>
                            <p className="text-2xl font-bold text-slate-100">{categories.length}</p>
                        </div>
                    </div>

                    <Button
                        text="Nova Categoria"
                        icon={Plus}
                        fullWidth={false}
                        onClick={handleOpenCreate}
                    />
                </div>

                {/* Lista de Categorias */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                    <h3 className="font-bold text-slate-100 text-lg mb-4">Categorias Cadastradas</h3>

                    {categories.length === 0 ? (
                        <p className="text-slate-400 text-sm py-4 text-center">Nenhuma categoria cadastrada ainda.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {categories.map((cat) => {
                                const catId = cat.id || cat._id;
                                const isActive = cat.active !== false;

                                return (
                                    <div key={catId} className="p-4 bg-slate-800/60 rounded-xl flex justify-between items-center border border-slate-700/60 hover:border-purple-500/40 transition-colors">
                                        <div>
                                            <span className="font-semibold text-slate-100 block">{cat.name}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* Botão de Toggle */}
                                            <button
                                                onClick={() => handleToggleActive(catId)}
                                                className={`text-xs px-2.5 py-1 rounded-full font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${isActive
                                                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60'
                                                    : 'bg-red-950/80 text-red-400 border border-red-800/50 hover:bg-red-900/60'
                                                    }`}
                                                title="Clique para alternar status"
                                            >
                                                <Power className="w-3.5 h-3.5" />
                                                {isActive ? 'Ativa' : 'Inativa'}
                                            </button>

                                            <span className="text-xs text-slate-400 font-medium">
                                                Produtos: {cat.products?.length || cat._count?.products || 0}
                                            </span>

                                            {/* Botão Editar */}
                                            <button
                                                onClick={() => handleOpenEdit(cat)}
                                                className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer"
                                                title="Editar categoria"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>

                                            {/* botao adicionar produto */}
                                            <button
                                                onClick={() => handleOpenAdd(cat)}
                                                className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer"
                                                title="Editar categoria"
                                            >
                                                Adicionar Produtos
                                            </button>

                                            {/* Botão Deletar */}
                                            <button
                                                onClick={() => handleDelete(catId)}
                                                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                                                title="Excluir categoria"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Modal de Cadastro/Edição de Categoria */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setError('');
                        setSuccess('');
                        setEditingCategory(null);
                    }}
                    title={editingCategory ? "Editar Categoria" : "Nova Categoria"}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-950/80 border border-red-800/50 text-red-300 rounded-xl text-xs font-medium">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 bg-emerald-950/80 border border-emerald-800/50 text-emerald-300 rounded-xl text-xs font-medium">
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

                        <Button
                            type="submit"
                            text={editingCategory ? "Salvar Alterações" : "Cadastrar Categoria"}
                            loading={loading}
                        />
                    </form>
                </Modal>

            </div>
        </AdminLayout>
    );
}