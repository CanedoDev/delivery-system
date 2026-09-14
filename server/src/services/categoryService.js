import prisma from '../lib/prisma.js';

export const getAllCategories = async () => {

    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        }
    });
    return categories;

};


export const getActiveCategories = async () => {

    //pega todas as activadas
    const categories = await prisma.category.findMany({
        where: {
            active: true
        },
        orderBy: {
            order: 'asc' //ordenacao menor pro maior
        }
    });

    return categories
};

export const createCategory = async (name) => {

    const newCategory = await prisma.category.create({
        data: {
            name,
            active: true
        }
    });

    return newCategory
};

export const deleteCategory = async (id) => {

    const deletedCategory = await prisma.category.delete({
        where: {
            id
        }
    });

    return deletedCategory;

};

export const switchActivationCategory = async (id, active) => {

    const category = await prisma.category.findUnique({
        where:{id}
    });

    if(!category){
        throw new Error('categoria nao encontrada');
    }

    const updatedCategory = await prisma.category.update({
        where: { id },
        data: { active: !category.active }
    });
    return updatedCategory;
};

export const editCategory = async (id, name) => {
    const editedCategory = await prisma.category.update({
        where: { id },
        data: { name }
    });

    return editedCategory;
};
