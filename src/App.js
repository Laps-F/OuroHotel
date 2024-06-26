import React from 'react';

import { useEffect, useState } from 'react';
import { collection, getDocs, getDoc, setDoc, addDoc, doc, arrayUnion, Firestore, arrayRemove, updateDoc, FieldValue, deleteField} from "firebase/firestore";
import { CartOutline, HomeOutline, HeartOutline } from 'react-ionicons'

import { DB } from "./constants/Database";

import Modal from './components/Modal';
import Register from './components/Register';
import Login from './components/Login';
import MapPage from './Pages/MapPage.tsx';

import './App.css';

import CardList from './components/CardList';
import CartList from './components/CartList';
import FavoriteList from './components/FavoriteList';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [currForm, setCurrentForm] = useState('register');
  const [hospedagens, setHospedagens] = useState([]);
  const [userLogged, setUserLogged] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [rateArray, setRateArray] = useState([]);
  const [password, setPassword] = useState("");
  const [cartList, setCartList] = useState(false);
  const [favoriteList, setFavoriteList] = useState(false);
  const [actualFavorite, setActualFavorite] = useState([]);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertCancel, setAlertCancel] = useState(false);
  const [alertEdit, setAlertEdit] = useState(false);
  const [alertRate, setAlertRate] = useState(false);
  const [coords, setCoords] = useState([]);

  const hospendagensCollection = collection(DB, "hospedagens");
  const usersCollection = collection(DB, "users");

  const localEmail = localStorage.getItem("email");
  const localPassword = localStorage.getItem("password");
  const localName = localStorage.getItem("name");
  const localRate = JSON.parse(localStorage.getItem("rate") || null);
  const localFav = JSON.parse(localStorage.getItem("favorite") || null);
  
  useEffect(() => {
    const getHospedagens = async () => {
      const data = await getDocs(hospendagensCollection);
      console.log(data);
      handleCoords(data);
      setHospedagens(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      console.log(data);
      setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    if(localEmail){
      setUserLogged(true);
      setPassword(localPassword);
      setName(localName);
      setRateArray(localRate);
      setActualFavorite(localFav);
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

  function loginHandler(email, pass) {
    setUserLogged(true);
    setPassword(pass);
    handleName(email);
    localStorage.setItem('email', email);
    localStorage.setItem('password', pass);
  }

  function loggoutHandler() {
    setUserLogged(false);
    setCartList(false);
    setName("");
    setPassword("");
    setRateArray([]);
    setActualFavorite([]);
    localStorage.clear();
    window.location.reload();
  }

  function handleCoords(data) {
    let lat, lng, txt;
    let array = []
    data.docs.map((dt) => {
      lat = dt._document.data.value.mapValue.fields.Coords.mapValue.fields.latitude;
      lng = dt._document.data.value.mapValue.fields.Coords.mapValue.fields.longitude;
      txt = dt._document.data.value.mapValue.fields.Hotel.stringValue;
      array.push({lat, lng, txt});
    });
    setCoords(array);
  }

  function handleName(email) {
    users.map((user) => {
      if(user.email === email){
        setName(user.username);
        setRateArray(user.avalia);
        setActualFavorite(user.favorites);
        window.location.reload();
        localStorage.setItem("name", user.username);
        localStorage.setItem("rate", JSON.stringify(user.avalia));
        localStorage.setItem("favorite", JSON.stringify(user.favorites));
      }
    })
  }

  function handleCart() {
    setCartList(true);
  }

  function handleFavoriteList() {
    setFavoriteList(true);
  }

  function handleHomeCart() {
    setCartList(false);
  }

  function handleHomeFav() {
    setFavoriteList(false);
  }

  async function rateHandle(rating, hotel) {
    let userId;
    users.map((user) => {
      if(user.username === name){
        userId = user.id;
      }
    })

    const userv = await getDoc(doc(DB, 'users', userId));
    let array = userv._document.data.value.mapValue.fields.avalia;
    let uservArray = [];
    for(let i = 0; i < array.arrayValue.values.length; i++){
      if(hotel === array.arrayValue.values[i].mapValue.fields.nome.stringValue){
        array.arrayValue.values[i].mapValue.fields.rate.integerValue = rating;
      }
      const nome = array.arrayValue.values[i].mapValue.fields.nome.stringValue;
      const rate = parseInt(array.arrayValue.values[i].mapValue.fields.rate.integerValue);
      uservArray.push({rate, nome})
    }

    await updateDoc(doc(DB, 'users', userId),{
      avalia: deleteField()
    }).then(async () => {
      await setDoc(doc(DB, 'users', userId), {
        avalia: uservArray
      }, {merge: true});
    })

    let notaTotal = 0;
    let contador = 0;
    for(let i = 0; i < users.length; i++) {
      for(let j = 0; j < users[i].avalia.length; j++) {
        if(users[i].avalia[j].nome === hotel && users[i].username === name){
          notaTotal = notaTotal + rating;
          contador = contador + 1;
        }
        else if(users[i].avalia[j].nome === hotel && users[i].avalia[j].rate > 0){
          notaTotal = notaTotal + users[i].avalia[j].rate;
          contador = contador + 1;
        }
      }
    }

    const rate = Math.round(notaTotal / contador);
    
    let hospId;
    hospedagens.map((hospedagem) => {
      if(hospedagem.Hotel === hotel){
        hospId = hospedagem.id;
      }
    })

    await updateDoc(doc(DB, 'hospedagens', hospId),{
      Rate: rate
    }, {merge: true});
    recarregaPag();

    users.map((user) => {
      if(user.username === name){
        setRateArray(uservArray)
        localStorage.setItem("rate", JSON.stringify(uservArray));
      }
    })

    setAlertRate(true);
    setTimeout(() => {
      setAlertRate(false);
    }, 3000);
  }

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
    setAlertConfirm(true);
    setTimeout(() => {
      setAlertConfirm(false);
    }, 3000);
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
    setAlertCancel(true); 
    setTimeout(() => {
      setAlertCancel(false);
    }, 3000);
  }

  async function editReserva(reserva, Newdate, oldDate, user){
    const reserv = await getDoc(doc(DB, 'hospedagens', reserva));
   
    let array = reserv._document.data.value.mapValue.fields.Reservas;
    let reservArray = [];
    for(let i = 0; i < array.arrayValue.values.length; i++){
      let dt = array.arrayValue.values[i].mapValue.fields.data.timestampValue;
      dt = new Date(dt)
      const fdata = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
      const fNewdate = `${Newdate.getDate()}/${Newdate.getMonth() + 1}/${Newdate.getFullYear()}`;
  
      if(fNewdate === fdata){
        array.arrayValue.values[i].mapValue.fields.reservado.booleanValue = true;
        array.arrayValue.values[i].mapValue.fields.username.stringValue = user;
      }

      if(oldDate === fdata){
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
    })
    recarregaPag();
    setAlertEdit(true); 
    setTimeout(() => {
      setAlertEdit(false);
    }, 3000);
  }

  async function favoriteHandle(hotelName) {
    let userId;
    users.map((user) => {
      if(user.username === name){
        userId = user.id;
      }
    })

    const userv = await getDoc(doc(DB, 'users', userId));
    console.log(userv)
    let array = userv._document.data.value.mapValue.fields.favorites;
    let uservArray = [];
    let favoritado = false;
    for(let i = 0; i < array.arrayValue.values.length; i++){
      const nome = array.arrayValue.values[i].mapValue.fields.nome.stringValue;
      const fav = Boolean(array.arrayValue.values[i].mapValue.fields.favoritado.booleanValue);
      if(nome === hotelName){
        favoritado = !fav;
      }
      else{
        favoritado = fav;
      }
      uservArray.push({favoritado, nome})
    }
    setActualFavorite(uservArray);
    // for( let i = 0; i < users.length; i++){
    //   await setDoc(doc(DB, 'users', users[i].id), {
    //     favorites: uservArray
    //   }, {merge: true});
    // }

    await updateDoc(doc(DB, 'users', userId),{
      favorites: deleteField()
    }).then(async () => {
      await setDoc(doc(DB, 'users', userId), {
        favorites: uservArray
      }, {merge: true});
    })
    recarregaPag();

    users.map((user) => {
      if(user.username === name){
        setActualFavorite(uservArray);
        localStorage.setItem("favorite", JSON.stringify(uservArray));
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
              { !cartList && !favoriteList? 
                <div className="titulo-container">
                  <p className='titulo'>Home</p>
                  <button onClick={handleCart} className="cart-outline">
                    <CartOutline
                      color={'#225,225,225'} 
                      height="40px"
                      width="40px"
                    />
                  </button>
                  <button onClick={handleFavoriteList} className="cart-outline">
                    <HeartOutline
                      color={'#225,225,225'} 
                      height="40px"
                      width="40px"
                    />
                  </button>
                </div> :
                cartList ?
                <div className='titulo-container'>
                  <p className='titulo'>Carrinho</p>
                  <button onClick={handleHomeCart} className="cart-outline">
                    <HomeOutline
                      color={'#225,225,225'} 
                      height="40px"
                      width="40px"
                    />
                  </button>
                </div> :
                favoriteList ?
                <div className='titulo-container'>
                  <p className='titulo'>Favoritos</p>
                  <button onClick={handleHomeFav} className="cart-outline">
                    <HomeOutline
                      color={'#225,225,225'} 
                      height="40px"
                      width="40px"
                    />
                  </button>
                </div> :
                <div className="titulo-container">
                <p className='titulo'>Home</p>
                <button onClick={handleCart} className="cart-outline">
                  <CartOutline
                    color={'#225,225,225'} 
                    height="40px"
                    width="40px"
                  />
                </button>
                <button onClick={handleFavoriteList} className="cart-outline">
                  <HeartOutline
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
            hospedagens={hospedagens}
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
        <CartList 
          hospedagens={hospedagens} 
          user={name} 
          deleteReserva={deleteReserva} 
          editReserva={editReserva} 
          avalia={rateHandle}
          rateArray={rateArray}
        /> :
        favoriteList ? 
        <FavoriteList 
          hospedagens={hospedagens} 
          reservar={reservaHandle} 
          username={name} 
          favorites={favoriteHandle} 
          actFavorited={actualFavorite}
          recarrega={recarregaPag}
        />
        :
        <div>
          <div>
          <CardList 
            hospedagens={hospedagens} 
            reservar={reservaHandle} 
            username={name} 
            favorites={favoriteHandle} 
            actFavorited={actualFavorite}
            recarrega={recarregaPag}
          />
          </div>
          <div className='map-container'>
            <MapPage coords={coords} hospedagens={hospedagens} /> 
          </div>  
        </div>
      }  
      {alertConfirm && <div className="alert">Reserva Confirmada com Sucesso!</div>}
      {alertCancel && <div className="alert">Reserva Cancelada com Sucesso!</div>}
      {alertEdit && <div className="alert">Reserva Editada com Sucesso!</div>}
      {alertRate && <div className="alert">Hotel Avaliado com Sucesso!</div>}

    </div>
  )
};

export default App;
