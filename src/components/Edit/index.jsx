import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';

import './style.css';


const Edit = ({datadb, edit, id, closeModal, username, nome, vagas, preco, qtdcamas, tipocama}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [errorDate, setErrorDate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setErrorDate(false);
    };
      
    async function editReserva () {
        setIsLoading(true);

        if(selectedDate) {
            await edit(id, selectedDate, datadb, username);
            closeModal();
        }
        else {
            setErrorDate(true);
        }

        setIsLoading(false);
    };
  return (
    <div className='global_confirm'>
        <p className="confirmation_Tittle">&nbsp;&nbsp;&nbsp;&nbsp;Edição de Reserva&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <div className='conf_infos'>
            <p className='text'>{nome}</p>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                filterDate={(date) => vagas.some((vagas) => (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`).toString() === vagas)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione outra data"
                customInput={<TextField />}
            />
            <p className="text">{qtdcamas} cama(s) de {tipocama}</p>
            <p className='text'>{preco}</p>
        </div>
        <div className='datepicker_wrapper'>
            
        </div>
        {errorDate ? <a>É necessário selecionar uma data</a> :<a></a>}
        <button className='confirmation_button'
            onClick={editReserva}
        >
            {isLoading? <FaSpinner className="spinner_edit" />: 'Confirmar'}
        </button>
        <button className='cancel_button'
            onClick={closeModal}
        >
            Cancelar
        </button>

    </div>
  )
}

export default Edit;