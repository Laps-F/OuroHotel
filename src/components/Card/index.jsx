/* eslint-disable no-unused-vars */
import React from 'react';
import './style.css'

function Card({nome, endereco, preco, qtdcamas, tipocama, foto}) {
    return (
        <div className="card">
            <div className="image-container">
                <img src={foto} alt="Foto" width="250"/>
            </div>
            <div className="title-container">
                <h1 className="text">Hotel: {nome}</h1>
            </div>
            <div className="info-container">
                <p className="text">Endereço: {endereco}</p>
                <p className="text">Número de Camas: {qtdcamas}</p>
                <p className="text">Tipo das Camas: {tipocama}</p>
            </div>
            <div className="price-container">
                <p className="text">Preço: R$ {preco}</p>
            </div>
        </div>
    );
}

export default Card;