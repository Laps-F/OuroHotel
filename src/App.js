/* eslint-disable no-unused-vars */

import React from 'react';

import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";

import { DB } from "./constants/Database";

import Modal from './components/Modal';
import Register from './components/Register';
import Login from './components/Login';
import Card from "./components/Card";
import './App.css';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [currForm, setCurrentForm] = useState('register');
  const [hospedagens, setHospedagens] = useState([]);

  // const hospendagensCollection = collection(DB, "hospedagens");

  useEffect(() => {
    const getHospedagens = async () => {
      // const data = await getDocs(hospendagensCollection);
      // setHospedagens(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    getHospedagens();
  }, []);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  function opModal() {
    setOpenModal(!openModal);
    if(currForm === 'login')
      setCurrentForm('register');
    else
      setCurrentForm('login');
  }
  
  function closeModal(){
    setOpenModal(!openModal);
  }

  return (
    <div className="App">
      <header className="App-header">

        <button onClick={()=> setOpenModal(true)}>
          Cadastro
        </button>

        <Modal isOpen={openModal} setClose={opModal}>
          {
            currForm === 'register' ?  <Register onFormSwitch={toggleForm} closeAfter={closeModal}/> : <Login />
          }
        </Modal>

      </header>
      {
        hospedagens.map((hospedagem) => {
          return (
            <Card 
              nome={hospedagem.Hotel} 
              endereco={hospedagem.Endereco} 
              preco={hospedagem.PrecoDiaria} 
              qtdcamas={hospedagem.QtdCamas} 
              tipocama={hospedagem.TipoCamas}
              foto={hospedagem.Foto}
            />
          );
        })
      }
      
    </div>
  );
}

export default App;
