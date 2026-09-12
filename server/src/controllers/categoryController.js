import * as categoryService from '../services/categoryService.js';


export const getCategory = async (req, res) => {

    try {
        const categories = await categoryService.getAllCategories();
        return res.status(200).json(categories);//ele traz as categorias em json

    } catch (err) {
        return res.status(500).json({ message: 'erro ao buscar categorias' })
    }
};

export const createCategory = async (req, res) => {

    try {
        const { name } = req.body;

        if (!name || typeof name !== 'string') return res.status(400).json({ message: 'o nome da categoria e obrigatorio' })

        const newCategory = await categoryService.createCategory(name.trim());
        return res.status(201).json(newCategory);


    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

};