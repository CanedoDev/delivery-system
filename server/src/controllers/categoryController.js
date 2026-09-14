import * as categoryService from '../services/categoryService.js';

export const getCategory = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || typeof name !== 'string') {
            return res.status(400).json({ message: 'O nome da categoria é obrigatório' });
        }

        const newCategory = await categoryService.createCategory(name.trim());
        return res.status(201).json(newCategory);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(id);
        return res.status(200).json({ message: 'Categoria deletada com sucesso' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const switchActivationCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategory = await categoryService.switchActivationCategory(id);

        const message = updatedCategory.active
            ? 'Categoria ativada com sucesso'
            : 'Categoria desativada com sucesso';

        return res.status(200).json({ message, category: updatedCategory });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || typeof name !== 'string') {
            return res.status(400).json({ message: 'O nome da categoria é obrigatório' });
        }

        const editedCategory = await categoryService.editCategory(id, name.trim());
        return res.status(200).json({ message: 'Categoria editada com sucesso', category: editedCategory });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};