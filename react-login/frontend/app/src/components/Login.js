import axios from 'axios';
import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, password);

        try {
            const response = await axios.post('http://localhost:3000/login',
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }            
            );

            console.log(response.data);
            setUser(response.data);

        } catch (error) {
            if (!error?.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response.status == 401) {
                setError('Usuário ou senha inválidos');
            }
        }

    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setUser(null);
        setError('');
    };

    return (
      <div>
        {user == null ? (
            <div className='formulario-app'>
                <h1 id="titulo-acima">Olá, seja</h1>
                <h1>bem-vindo!</h1>
                <p id="frase">Para acessar a plataforma,</p>
                <p id="frase">faça seu login.</p>

                <form className='login-form'>

                    <p id='email'>E-MAIL</p>
                    <input type="email" 
                            name="email" 
                            placeholder="Email" 
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            />

                    <p id='senha'>SENHA</p>
                    <input type="password" 
                            name="password" 
                            placeholder="Password" 
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                    

                    <button type="submit" 
                            className='btn-login'
                            onClick={(e) => handleLogin(e)}>ENTRAR</button>
                    
                    <div id='rodape-form'>
                        <p>Esqueceu seu login ou senha?</p>
                        Clique <a href="#esqueciasenha">aqui</a>
                    </div>
                    

                </form>
                <p>{error}</p>
            </div>
        ) : (
            <div>
                <h2>Olá, {user.email}, clique no botão para sair</h2>
                <button type="button" 
                        className='btn-login'
                        onClick={(e) => handleLogout(e)}>Logout</button> 
            </div>
        )}
      </div>
    );
  }

  export default Login;