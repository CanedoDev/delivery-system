import { authenticatedUser } from '../services/authService.js';

//VALIDACAO DE ENRTADA E RESPOSTA HTTP
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Parte do codigo de login que vai pro controller

// app.post('/api/auth/login', async (req, res) => {
//     // buscar por email
//     // comparar senha com bcrypt.compare
//     // retornar sucesso ou erro
//     try {
//         const { email, password } = req.body

//         if (typeof email !== 'string' || typeof password !== 'string') {
//             return res.status(400).json({ message: 'Dados invalidos' })
//         }

//         const trimmedEmail = email.trim().toLowerCase()

//         if (!trimmedEmail || !password) {
//             return res.status(400).json({ message: 'Preencha todos os campos' })
//         }

//         if (!emailRegex.test(trimmedEmail)) {
//             return res.status(400).json({ message: 'Email invalido' })
//         }

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //trata se email e password sao strings
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Dados inválidos' });
    }

    //trata o email pra jogar tudo pra lowercase e tirar espaços eventuais
    const trimmedEmail = email.trim().toLowerCase()

    //trata os dados pra que nao envie nada com lacunas
    if (!trimmedEmail || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos' })
    }

    //expressão regular usada para validar se um texto tem formato de email.
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ message: 'Email invalido' })
    }

    //chama o service pra validar a senha e gerar token(a outra metade do codigo colocado em authen...)
    const result = await authenticatedUser(trimmedEmail, password);

    return res.status(200).json({
      message: 'login realizado com sucesso',
      token: result.token,
      user: result.user
    });

  } catch (error) {

    if (error.message === 'Email ou senha invalidos') {
      return res.status(400).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'erro interno no servidor' })
  }
};