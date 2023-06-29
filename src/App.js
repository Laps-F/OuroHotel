
import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [currForm, setCurrentForm] = useState('register');
    

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  function opModal() {
    setOpenModal(!openModal);
  }
  return (
    <div className="App">
      <header className="App-header">

        <button className='initial-btn'
          onClick={()=> {setOpenModal(true); setCurrentForm('login')}}>
          Login
        </button>
        <button className='initial-btn' 
          onClick={()=> {setOpenModal(true); setCurrentForm('register')}}>
          Cadastro
        </button>

        {/* <Modal isOpen={openModal} setClose={()=>{setOpenModal(!openModal)}}> */}
        <Modal isOpen={openModal} setClose={opModal}>
          {
            currForm === 'register' ?  <Register onFormSwitch={toggleForm} closeAfter={opModal}/> : <Login onFormSwitch={toggleForm}/>
          }
        </Modal>

      </header>

      <div>
      </div>
    </div>
  );
}

export default App;
