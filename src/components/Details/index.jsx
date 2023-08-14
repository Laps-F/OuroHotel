import React, { useState, useEffect } from 'react';

import "./style.css";

function Details({closeModal, hotel}) {

    useEffect(() => {
        console.log("aaaa", hotel);
    }, [])
      
    async function confirm () {
        closeModal();
    };

    return (
        <div className='global_confirm'>
            <p className="confirmation_Tittle">{hotel.Hotel}</p>
            <div className='conf_infos'>
                <p className='text'>{hotel.Endereco}</p>
                <p className="text">{hotel.QtdCamas} cama(s) de {hotel.TipoCamas}</p>
                <p className='text'>R$ {hotel.PrecoDiaria} ao Dia</p>
            </div>
            <button className='confirmation_button'
                onClick={confirm}
            >
                Ok
            </button>
        </div>
    )
}

export default Details;