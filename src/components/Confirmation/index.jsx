import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';

const Confirmation = ({datadb, reserva, id}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    // const allowedDates = [
    //     new Date(2023, 6, 1), // 1 de julho de 2023
    //     new Date(2023, 6, 15), // 15 de julho de 2023
    //     new Date(2023, 6, 30) // 30 de julho de 2023
    // ];

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
      
    async function confirmReserva () {
        await reserva(id, selectedDate);
        alert("cu");
    };
  return (
    <div>
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            filterDate={(date) => datadb.some((datadb) => (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`).toString() === datadb)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecione uma data"
            customInput={<TextField />}
        />
        <button
            onClick={confirmReserva}
        >
            Confirmar
        </button>

    </div>
  )
}

export default Confirmation