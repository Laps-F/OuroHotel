import React, {useState} from 'react';
import './styles.css';

const Register = (prop) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conf_password, setConfPassword] = useState('');  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className='global'>
        <form className='regform' onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input value={username} onChange={(e) => [setUsername(e.target.value)]} type="username" placeholder="Username" id='username' name='username'/>
            
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => [setEmail(e.target.value)]} type="email" placeholder="youremail@example.com" id='email' name='email'/>

            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => [setPassword(e.target.value)]} type="password" placeholder="Password" id='password' name='password'/>

            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input value={conf_password} onChange={(e) => [setConfPassword(e.target.value)]} type="password_conf" placeholder="Confirm Password" id='password_conf' name='password_conf'/>

            <button type='register'>Registre-se</button>
        </form>
        <button className='alreadyacc-button'onClick={()=>prop.onFormSwitch('login')}>Já tem uma conta? Faça Login</button>
    </div>
  )
}

export default Register