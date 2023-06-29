import React, {useState, useEffect} from 'react';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className='auth-form-conteiner'>
            <h2>Login</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="email">Digite seu e-mail</label>
                <input value={email} 
                  onChange={(e) => {setEmail(e.target.value); setErrorEmail(false)}} 
                  type="email" 
                  placeholder="e-mail" 
                  id="email" 
                  name="email"
                />
                <label htmlFor="password">Digite sua senha</label>
                <input value={pass} 
                  onChange={(e) => {setPass(e.target.value); setErrorPassConf(false)}} 
                  type="password" 
                  placeholder="*******" 
                  id="password" 
                  name="password"
                />
                <button type="submit"> Entrar </button>
            </form>
            <button className='link-btn' 
              onClick={() => props.onFormSwitch('register')}>Não possui uma conta? Crie uma aqui
            </button>
        </div>
    )
}

export default Login