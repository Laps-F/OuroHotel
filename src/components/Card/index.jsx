/* eslint-disable no-unused-vars */
import React , {useEffect} from 'react';

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
    favorites,
    actFavorited,
    recarrega,
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
            favorites={favorites}
            actFavorited={actFavorited}
            recarrega={recarrega}
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