import React, {useState, useEffect} from 'react';
import './styles.css';

const Register = (props, {closeAfter}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conf_password, setConfPassword] = useState('');

  const [errorConf, setErrorConf] = useState(false);
  const [errorPassDif, setErrorPassDif] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassConf, setErrorPassConf] = useState(false); 
  
  const[handleOpen, setHandleOpen] = useState(false);


  useEffect(() => {
    setHandleOpen(false);
  }, []);

 function handleSubmit (e) {
    setHandleOpen(true);
    e.preventDefault();

    if(username.length === 0)
      setErrorName(true);
    if(email.length === 0)
      setErrorEmail(true);
    if(password.length === 0)
      setErrorPassConf(true);
    if(conf_password.length === 0)
      setErrorConf(true);
    if(password !== conf_password)
      setErrorPassDif(true);


    if(username.length === 0 | password.length === 0 | email.length === 0 | conf_password.length === 0 | password !== conf_password)
      return ;
    
    alert("Usuário cadatrado com sucesso!");
    closeAfter();
  }

  function confirmPassword(e){
    console.log("PASS",password);
    console.log("conf",e.target.value);
    if(password === e.target.value)
      setErrorPassDif(false);
  }

  return (
    <div className='auth-form-conteiner'>
        <>
            <label htmlFor="username">Nome de usuário</label>
            <input 
              value={username} 
              onChange={(e) => {setUsername(e.target.value); setErrorName(false)}}
              type="username" 
              placeholder="Username" 
              id='username' 
              name='username'
            />
            {errorName & handleOpen === true ? <a>É necessário fornecer um nome de usuário</a> :<a></a>}

            <label htmlFor="email">Email</label>
            <input value={email} 
              onChange={(e) => {setEmail(e.target.value); setErrorEmail(false)}}  
              type="email" 
              placeholder="youremail@example.com" 
              id='email' 
              name='email'
            />
            {errorEmail & handleOpen === true ? <a>É necessário fornecer um e-mail</a> :<a></a>}

            <label htmlFor="password">Password</label>
            <input value={password} 
              onChange={(e) => {setPassword(e.target.value); setErrorPassConf(false)}}  
              type="password" 
              placeholder="Password" 
              id='password' 
              name='password'
            />
            {errorPassConf & handleOpen === true ? <a>É necessário digitar uma senha</a> :<a></a>}

            <label htmlFor="passwordConfirm">Confirme a senha</label>
            <input value={conf_password} 
              onChange={(e) => {setConfPassword(e.target.value); setErrorConf(false); confirmPassword(e)}} 
              type="password_conf" 
              placeholder="Confirm Password" 
              id='password_conf' 
              name='password_conf'
            />
            {errorConf & handleOpen === true ? <a>É necessário confirmar a senha</a> : <a></a>}

            <button type='register' onClick={handleSubmit}>Registre-se</button>
            {errorPassDif & handleOpen === true ? <a>Senhas diferentes</a> : <a></a>}
        </>
        <button className='link-btn'
          onClick={() => props.onFormSwitch('login')}>Já tem uma conta? Faça Login
        </button>
    </div>
  )
}

export default Register