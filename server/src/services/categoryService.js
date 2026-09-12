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