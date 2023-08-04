/* eslint-disable no-unused-vars */
import React from 'react';

import CardPadrao from './CardPadrao';
import CardReserva from './CardReserva';

function Card({
    id,
    nome, 
    endereco, 
    preco, 
    qtdcamas, 
    tipocama, 
    foto, 
    vagas,
    reservar,
    username,
    datas,
    deleteReserva,
    editReserva,
    screen,
    rate,
    avalia,
    rateArray,
    }){

    return (
        screen === 0 ?
        <CardPadrao
            id={id}
            nome={nome} 
            endereco={endereco} 
            preco={preco} 
            qtdcamas={qtdcamas} 
            tipocama={tipocama}
            foto={foto}
            datas={datas}
            reservar={reservar}
            vagas={vagas}
            username={username}
            rate={rate}
        /> :
        <CardReserva 
            id={id}
            nome={nome} 
            endereco={endereco} 
            preco={preco} 
            qtdcamas={qtdcamas} 
            tipocama={tipocama}
            foto={foto}
            datas={datas}
            reservar={reservar}
            vagas={vagas}
            username={username}
            deleteReserva={deleteReserva}
            editReserva={editReserva}
            avalia={avalia}
            rateArray={rateArray}
        />
    );
}

export default Card;