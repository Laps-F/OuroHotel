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

  const hospendagensCollection = collection(DB, "hospedagens");

  useEffect(() => {
    const getHospedagens = async () => {
      const data = await getDocs(hospendagensCollection);
      console.log(data);
      setHospedagens(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

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
  
  function closeModal(){
    setOpenModal(!openModal);
  }

  return (

    <div className="App">
      <header className="App-header">

        <button onClick={()=> {setOpenModal(true); setCurrentForm("register")}}>
          Cadastro
        </button>
        <button onClick={()=> {setOpenModal(true); setCurrentForm("login")}}>
          Login
        </button>

        <Modal isOpen={openModal} setClose={opModalRegistro}>
          {
            currForm === 'register' ?  <Register onFormSwitch={toggleForm} closeAfter={closeModal}/> : <Login />
          }
        </Modal>
        {/* <Modal isOpen={openModal} setClose={opModalLogin}>
          {
            currForm === 'login' ?  <Login/> : <Register onFormSwitch={toggleForm} closeAfter={closeModal}/>
          }
        </Modal> */}

      </header>
        
      <CardList hospedagens={hospedagens}/>
    </div>
  );
}

export default App;
