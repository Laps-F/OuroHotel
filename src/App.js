import React from 'react';

import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";

import { DB } from "./constants/Database";

import Modal from './components/Modal';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

import CardList from './components/CardList';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [currForm, setCurrentForm] = useState('register');
  const [hospedagens, setHospedagens] = useState([]);
  const [userLogged, setUserLogged] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const hospendagensCollection = collection(DB, "hospedagens");
  const usersCollection = collection(DB, "users");

  useEffect(() => {
    const getHospedagens = async () => {
      const data = await getDocs(hospendagensCollection);
      console.log(data);
      setHospedagens(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      console.log(data);
      setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    getUsers();
    getHospedagens();
  }, []);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  function opModalRegistro() {
    setOpenModal(!openModal);
    if(currForm === 'login')
      setCurrentForm('register');
  }

  function opModalLogin() {
    setOpenModal(!openModal);
    if(currForm === 'register')
      setCurrentForm('login');
  }

  function loginHandler(email) {
    setUserLogged(true);
    handleName(email);
  }

  function loggoutHandler() {
    setUserLogged(false);
  }

  function handleName(email) {
    users.map((user) => {
      console.log(user.email)
      console.log(email)
      if(user.email === email){
        setName(user.username)
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">

        <div className="header-container">
          <div className="logo-container">
            <img src={require("./constants/images/Logo.jpeg")} alt="Logo" width="100" className="logo"/>
          </div> 
          {
            userLogged ? 
            <div className='logged-container'>
              <p className='textLog'>{name},</p>
              <button className='link-btn' 
                onClick={loggoutHandler}>Deseja Sair?
              </button>
            </div> :
            <div>
              <button className='login-btn'
                onClick={()=> {setOpenModal(true); setCurrentForm('login')}}>
                Login
              </button>
              <button className='cadastro-btn' 
                onClick={()=> {setOpenModal(true); setCurrentForm('register')}}>
                Cadastro
              </button>
            </div>
          }
        </div>
      </header>
      <Modal isOpen={openModal}>
          {
            currForm === 'register' ?  
            <Register 
              onFormSwitch={toggleForm} 
              closeAfter={opModalRegistro}
            /> : 
            <Login 
              onFormSwitch={toggleForm} 
              closeAfter={opModalLogin} 
              loginHandle={loginHandler} 
            />
          }
        </Modal>
      <CardList hospedagens={hospedagens} />

    </div>
  );
}

export default App;
