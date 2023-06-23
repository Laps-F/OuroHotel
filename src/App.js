/* eslint-disable no-unused-vars */

import React from 'react';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';

import Modal from './Components/Modal';
import Register from './Components/Register';
import Login from './Components/Login';
import Card from "./Components/Card";

import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyBOSSUxqm3Hqh-aXSmUTOLwDS_2Rimx1Zc",
  authDomain: "ourohotel-df08d.firebaseapp.com",
  projectId: "ourohotel-df08d",
  storageBucket: "ourohotel-df08d.appspot.com",
  messagingSenderId: "882292019392",
  appId: "1:882292019392:web:099e13532f50bb77479d25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [currForm, setCurrentForm] = useState('register');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [hospedagens, setHospedagens] = useState([]);

  const db = getFirestore(app);
  const userCollectionRef = collection(db, "users");

  const hospedagensCollection = collection(db, "hospedagens");

  useEffect(() => {
    const getUsers = async () => {
      var data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    
    getUsers();
  }, [userCollectionRef]);

  useEffect(() => {
    const getHospedagens = async () => {
      var data = await getDocs(hospedagensCollection);
      setHospedagens(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    getHospedagens();
  }, [hospedagensCollection]);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  function opModal() {
    setOpenModal(!openModal);
  }
  
  function createUser(){
    addDoc(userCollectionRef, {name, email});
  }

  return (
    <div className="App">
      <header className="App-header">

        <button onClick={()=> setOpenModal(true)}>
          Cadastro
        </button>

        {/* <Modal isOpen={openModal} setClose={()=>{setOpenModal(!openModal)}}> */}
        <Modal isOpen={openModal} setClose={opModal}>
          {
            currForm === 'register' ?  <Register onFormSwitch={toggleForm} closeAfter={opModal}/> : <Login />
          }
        </Modal>

      </header>
      {/* <input type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)}/>
      <input type="text" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
      <button onClick={createUser}>Create User</button> */}
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
