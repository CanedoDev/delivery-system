import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import { loginService } from '../../services/authService.js';



function Login({ btnText }) {

    const [user, setUser] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanEmail = user.email.trim();
        const cleanPassword = user.password.trim();
        const cleanName = user.name ? user.name.trim() : '';

        if (!cleanEmail || !cleanPassword) {
            setError('Por favor, preencha todos os campos!')
            return
        }

        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(cleanEmail)) {
            setError('Insira um e-mail válido (ex: usuario@email.com)!')
            return
        }

        setLoading(true)

        try {
            //chamada da api. dispara http pro servidor(endpointURL) levando o corpo(dataToSend)
            //tudo o q o servidor responder é guardado no response
            const data = await loginService(cleanEmail, cleanPassword);

            if (data.token) {
                //guarda o token no localstorage pra proximos acessos restritos como ver pedidos
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            setSuccess(data.message || 'login concluido')
            
            navigate('/dashboard')

        } catch (err) {
            console.log('erro na requisição', err)
            const msg = err.response?.data?.message || 'Erro ao conectar com o servidor. Verifique se o backend está rodando!'
            setError(msg)
        } finally {
            setLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-1">
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl mb-4 text-center">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium rounded-xl mb-4 text-center">
                    {success}
                </div>
            )}

            <Input type="email"
                name="email"
                text="E-mail"
                placeholder="Digite seu e-mail"
                value={user.email}
                handleOnChange={handleChange}
            />
            <Input type="password"
                name="password"
                text="Senha"
                placeholder="Digite sua senha"
                value={user.password}
                handleOnChange={handleChange}
            />
            <Button text={btnText} loading={loading} type="submit" />
        </form>
    );
}

export default Login;