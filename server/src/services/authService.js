import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

//CONVERSA COM BD, BCRYPT E JWT

// Parte do codigo de login que vai pro service

// const user = await prisma.user.findUnique({
//             where: { email: trimmedEmail }
//         })

//         if (!user) {
//             return res.status(401).json({ message: 'Email ou senha invalidos' })
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password)

//         if (!passwordMatch) {
//             return res.status(401).json({ message: 'Email ou senha invalidos' })
//         }

//         const token = jwt.sign(
//             {id:user.id, email: user.email, name: user.name},
//             JWT_SECRET,
//             {expiresIn: '1d'}
//         )

//         return res.status(200).json({
//             message: 'login realizado com sucesso',
//             token,
//             user: {id:user.id, email: user.email, name: user.name}
//         })

//         return res.status(200).json({ message: 'Login realizado com sucesso' })
//     }
//     catch (error) {
//         console.error((error))
//         return res.status(500).json({ message: 'Erro interno no servidor' })
//     }

// })

export const authenticatedUser = async (email, password) => {

    //acha o usuario no banco pelo prisma
    const user = await prisma.user.findUnique({
        where: { email }
    });

    //se o user n existir no banco
    if (!user) {
        throw new Error('Email ou senha invalidos');
    }

    //compara o password do bd com o que foi POSTado
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Email ou senha invalidos');
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        process.env.JWT_SECRET || 'secret_temporario',
        { expiresIn: '30d' }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
}
