/* eslint-disable no-unused-vars */
import React from 'react';
import './style.css'

function Card({nome, endereco, preco, qtdcamas, tipocama, foto}) {
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
                    <p className="text info">{endereco}</p>
                    <p className="text info">{qtdcamas} cama(s) de {tipocama}</p>
                </div>
            </div>
            <div className="price-container">
                <p className="text">R$ {preco}</p>
            </div>
        </div>
    );
}

export default Card;