
import { useState } from 'react';
import './App.css';
import Modal from './components/modal';
import Register from './components/register';
import Login from './components/login';

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

        <button onClick={()=> setOpenModal(true)}>
          Cadastro
        </button>

        {/* <Modal isOpen={openModal} setClose={()=>{setOpenModal(!openModal)}}> */}
        <Modal isOpen={openModal} setClose={opModal}>
          {
            currForm === 'register' ?  <Register onFormSwitch={toggleForm} /> : <Login />
          }
        </Modal>

      </header>

      <div>
      </div>
    </div>
  );
}

export default App;
