/* eslint-disable no-unused-vars */
import React from 'react';
import './style.css'

function Card({nome, endereco, preco, qtdcamas, tipocama, foto}) {
    return (
        <div className="card">
            <h1>Hotel: {nome}</h1>
            <p>Endereço: {endereco}</p>
            <p>Preço: R$ {preco}</p>
            <p>Número de Camas: {qtdcamas}</p>
            <p>Tipo das Camas: {tipocama}</p>
            <img src={foto} alt="Foto" width="250"/>
        </div>
    );
}

export default Card;