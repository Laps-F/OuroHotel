/* eslint-disable no-unused-vars */
import React from 'react';
import './style.css'

function Card({
    id,
    nome, 
    endereco, 
    preco, 
    qtdcamas, 
    tipocama, 
    foto, 
    datas, 
    reservar
    }) {

    function teste(){
        reservar(id);
    }
    return (
        <div className="card">
            <div className="image-container">
                <img src={foto} alt="Foto" width="250" className="imagem"/>
            </div>
            <div>
                <div className="title-container">
                    <h1 className="text">{nome}</h1>
                </div>
                <div className="info-container">
                    {datas.map((data) => {
                        const fdata = `${data.toDate().getDate()}/${data.toDate().getMonth() + 1}/${data.toDate().getFullYear()}`;
                        return <p key={fdata} className='text info'>{fdata}</p>;
                    })}
                    <p className="text info">{endereco}</p>
                    <p className="text info">{qtdcamas} cama(s) de {tipocama}</p>
                </div>
            </div>
            <div className='buttons'>
                <div className="price-container">
                    <p className="text">R$ {preco}</p>
                </div>
                <div className="price-container" onClick={teste}>
                    <p className="text">Reservar</p>
                </div>
            </div>
        </div>
    );
}

export default Card;