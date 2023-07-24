import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';
import './styles.css';


const Confirmation = ({datadb, reserva, id, closeModal, username, nome, endereco, preco, qtdcamas, tipocama}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [errorDate, setErrorDate] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setErrorDate(false);
    };
      
    async function confirmReserva () {
        if(selectedDate) {
            await reserva(id, selectedDate, username);
            alert("Reserva feita!");
            closeModal();
        }
        else {
            setErrorDate(true);
        }
    };
  return (
    <div className='global_confirm'>
        <p className="confirmation_Tittle">Confirmação de Reserva</p>
        <div className='conf_infos'>
            <p className='text'>{nome}</p>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                filterDate={(date) => datadb.some((datadb) => (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`).toString() === datadb)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione uma data"
                customInput={<TextField />}
            />
            <p className="text">{qtdcamas} cama(s) de {tipocama}</p>
            <p className='text'>{preco}</p>
        </div>
        <div className='datepicker_wrapper'>
            
        </div>
        {errorDate ? <a>É necessário selecionar uma data</a> :<a></a>}
        <button className='confirmation_button'
            onClick={confirmReserva}
        >
            Confirmar
        </button>
        <button className='cancel_button'
            onClick={closeModal}
        >
            Cancelar
        </button>

    </div>
  )
}

export default Confirmation