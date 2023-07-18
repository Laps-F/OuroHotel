/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import Confirmation from '../Confirmation';
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
    vagas,
    reservar
    }) {

    const [disabled, setDisabled] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const value = vagas.filter((vaga) => { return vaga.reservado === true}).length;
        if(value < datas.length){
            setDisabled(false);
        }
        else
            setDisabled(true);
    }, [vagas]);

    async function handleReserva(){
        var value = vagas.filter((vaga) => { return vaga.reservado === true}).length;
        if(value < datas.length){
            setDisabled(false);
            await reservar(id, datas[0]);
            alert("Reserva feita");
        }
        else
            setDisabled(true);
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
                <div 
                    className="price-container" 
                    //onClick={handleReserva}
                    onClick={()=> setOpenModal(true)} 
                    style={ disabled ? {backgroundColor: "#e70d0d"} : {backgroundColor: "#1cb41c"}}
                >
                    <p className="text">Reservar</p>
                </div>
            </div>
            <Modal isOpen={openModal}>
                <Confirmation></Confirmation>
            </Modal>
        </div>
    );
}

export default Card;