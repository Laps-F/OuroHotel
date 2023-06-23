import React, {useState, useEffect} from 'react';
import './styles.css';

const Register = ({onFormSwitch}) => {
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

  useEffect( () => {
    // if(username.length === 0) {
    //   setErrorName(true);
    //   console.log("Please enter");
    // }
    // if (password !== conf_password)
    //   setErrorPassDif(true);
    

  }, [username, password, email, conf_password])

  useEffect(() => {
    setHandleOpen(false);
  }, []);

  function updateUsername(e){
    setUsername(e.target.value);
    setErrorName(false);
  }

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
  }

  function kl(e){
    console.log("PASS",password);
    console.log("conf",e.target.value);
    if(password === e.target.value)
      setErrorPassDif(false);
  }

  return (
    <div className='global'>
        <>
            <label htmlFor="username">Username</label>
            <input 
              value={username} 
              // onChange={(e) => {setUsername(e.target.value); setErrorName(false)}}
              onChange={updateUsername}
              type="username" 
              placeholder="Username" 
              id='username' 
              name='username'
            />
            {errorName & handleOpen === true ? <a>error</a> : <a></a>}

            <label htmlFor="email">Email</label>
            <input value={email} 
              onChange={(e) => {setEmail(e.target.value); setErrorEmail(false)}}  
              type="email" 
              placeholder="youremail@example.com" 
              id='email' 
              name='email'
            />


            <label htmlFor="password">Password</label>
            <input value={password} 
              onChange={(e) => {setPassword(e.target.value); setErrorPassConf(false)}}  
              type="password" 
              placeholder="Password" 
              id='password' 
              name='password'
            />

            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input value={conf_password} 
              onChange={(e) => {setConfPassword(e.target.value); setErrorConf(false); kl(e)}} 
              type="password_conf" 
              placeholder="Confirm Password" 
              id='password_conf' 
              name='password_conf'
            />

            <button type='register' onClick={handleSubmit}>Registre-se</button>
            {errorPassDif & handleOpen === true ? <a>error</a> : <a></a>}
        </>
        <button className='alreadyacc-button'
          onClick={()=>onFormSwitch('login')}>Já tem uma conta? Faça Login
        </button>
    </div>
  )
}

export default Register