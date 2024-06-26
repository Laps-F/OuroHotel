import React, {useState, useEffect} from 'react';

import "./styles.css";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [handleOpen, setHandleOpen] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassConf, setErrorPassConf] = useState(false); 
    const [errorLogin, setErrorLogin] = useState(false);

    useEffect(() => {
      setHandleOpen(false);
    }, []);

    const handleSubmit = (e) => {
        setHandleOpen(true);
        e.preventDefault();
        
        if(email.length === 0){
          setErrorEmail(true);
        }
        if(pass.length === 0)
          setErrorPassConf(true);
    
        if(pass.length === 0 | email.length === 0)
          return ;
        
        var verif = 0;
        props.users.map((user) => {
          if(email === user.email && pass === user.password)
            verif = 1;
        })

        if(verif === 1){
          props.closeAfter();
          props.loginHandle(email, pass);
        }
        else {
          setErrorLogin(true);
        }
    }

    return (
        <div className='auth-form-conteiner'>
            <div className="modal-header">
              <h2>Login</h2>
              <button onClick={props.closeAfter} className="close-btn">
                <img src={require("../../constants/images/CloseRed.webp")} width="30"/>
              </button>
            </div>
            
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="email">Digite seu e-mail</label>
                <input value={email} 
                  onChange={(e) => {setEmail(e.target.value); setErrorEmail(false)}} 
                  type="email" 
                  placeholder="e-mail" 
                  id="email" 
                  name="email"
                />
                {errorEmail & handleOpen === true ? <a>É necessário fornecer um email</a> :<a></a>}
                <label htmlFor="password">Digite sua senha</label>
                <input value={pass} 
                  onChange={(e) => {setPass(e.target.value); setErrorPassConf(false)}} 
                  type="password" 
                  placeholder="*******" 
                  id="password" 
                  name="password"
                />
                {errorPassConf & handleOpen === true ? <a>É necessário digitar uma senha</a> :<a></a>}
                <button type="submit"> Entrar </button>
                {errorLogin & handleOpen === true ? <a>Email ou Senha incorretos</a> :<a></a>}
            </form>
            <button className='link-btn' 
              onClick={() => props.onFormSwitch('register')}>Não possui uma conta? Crie uma aqui
            </button>
        </div>
    )
}

export default Login