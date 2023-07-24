import React from 'react';

import { useEffect, useState } from 'react';
import { collection, getDocs, getDoc, setDoc, addDoc, doc, arrayUnion, Firestore, arrayRemove, updateDoc, FieldValue, deleteField} from "firebase/firestore";
import { CartOutline, HomeOutline } from 'react-ionicons'

import { DB } from "./constants/Database";

import Modal from './components/Modal';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

import CardList from './components/CardList';
import CartList from './components/CartList';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [currForm, setCurrentForm] = useState('register');
  const [hospedagens, setHospedagens] = useState([]);
  const [userLogged, setUserLogged] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [cartList, setCartList] = useState(false);

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

  function recarregaPag(){
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
    setCartList(false);
    setName("");
  }

  function handleName(email) {
    users.map((user) => {
      if(user.email === email){
        setName(user.username);
      }
    })
  }

  function handleCart() {
    console.log("clicou no carrinho");
    setCartList(true);
  }

  function handleHome() {
    setCartList(false);
  }

  // async function teste(){
  //   await setDoc(doc(DB, 'users', 'S8Myn07MxPCch1GYddmE'), {
  //     email: 'maurolaps@gmail.com',
  //     password: "345",
  //     username: 'Laps',
  //   });
  // }

  async function reservaHandle(reserva, date, user) {
    const reserv = await getDoc(doc(DB, 'hospedagens', reserva));
   
    let array = reserv._document.data.value.mapValue.fields.Reservas;
    let reservArray = [];
    for(let i = 0; i < array.arrayValue.values.length; i++){
      let dt = array.arrayValue.values[i].mapValue.fields.data.timestampValue;
      dt = new Date(dt)
      const fdata = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
      const fdate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      if(fdate === fdata){
        array.arrayValue.values[i].mapValue.fields.reservado.booleanValue = true;
        array.arrayValue.values[i].mapValue.fields.username.stringValue = user;
      }
      const reservado = array.arrayValue.values[i].mapValue.fields.reservado.booleanValue;
      const username = array.arrayValue.values[i].mapValue.fields.username.stringValue;
      const data = dt;
      reservArray.push({reservado, username, data})
    }


    await updateDoc(doc(DB, 'hospedagens', reserva),{
      Reservas: deleteField()
    }).then(async () => {
      await setDoc(doc(DB, 'hospedagens', reserva), {
        Reservas: reservArray
      }, {merge: true});
    })
    recarregaPag();
  }

  async function deleteReserva(reserva, date) {
    const reserv = await getDoc(doc(DB, 'hospedagens', reserva));
   
    let array = reserv._document.data.value.mapValue.fields.Reservas;
    let reservArray = [];
    for(let i = 0; i < array.arrayValue.values.length; i++){
      let dt = array.arrayValue.values[i].mapValue.fields.data.timestampValue;
      dt = new Date(dt)
      const fdata = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
      if(date === fdata){
        array.arrayValue.values[i].mapValue.fields.reservado.booleanValue = false;
        array.arrayValue.values[i].mapValue.fields.username.stringValue = "";
      }
      const reservado = array.arrayValue.values[i].mapValue.fields.reservado.booleanValue;
      const username = array.arrayValue.values[i].mapValue.fields.username.stringValue;
      const data = dt;
      reservArray.push({reservado, username, data})
    }

    await updateDoc(doc(DB, 'hospedagens', reserva),{
      Reservas: deleteField()
    }).then(async () => {
      await setDoc(doc(DB, 'hospedagens', reserva), {
        Reservas: reservArray
      }, {merge: true});
    });

    recarregaPag();
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
              { !cartList ? 
                <div className="titulo-container">
                  <p className='titulo'>Home</p>
                  <button onClick={handleCart} className="cart-outline">
                    <CartOutline
                      color={'#225,225,225'} 
                      height="40px"
                      width="40px"
                    />
                  </button>
                </div> :
                <div className='titulo-container'>
                  <p className='titulo'>Carrinho</p>
                  <button onClick={handleHome} className="cart-outline">
                    <HomeOutline
                      color={'#225,225,225'} 
                      height="40px"
                      width="40px"
                    />
                  </button>
                </div>
              }
              
              <p className='textLog'>{name},</p>
              <button className='link-btn' 
                onClick={loggoutHandler}>Deseja sair?
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
            users={users}
            recarrega={recarregaPag}
          /> : 
          <Login 
            onFormSwitch={toggleForm} 
            closeAfter={opModalLogin} 
            loginHandle={loginHandler} 
            users={users}
          />
        }
      </Modal>
      { cartList ?
        <CartList hospedagens={hospedagens} user={name} deleteReserva={deleteReserva}/> :
        <CardList hospedagens={hospedagens} reservar={reservaHandle} username={name}/>
      }
      
    </div>
  );
}

export default App;
