/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Modal from '../../Modal';
import Confirmation from '../../Confirmation';

import './style.css'

function CardReserva({
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
    }){

    const [openModal, setOpenModal] = useState(false);
    const [fDatas, setfDatas] = useState();

    useEffect(() => {
        formatData();
    }, [datas]);

    function formatData(){
        const fdata = `${datas.toDate().getDate()}/${datas.toDate().getMonth() + 1}/${datas.toDate().getFullYear()}`;
        setfDatas(fdata);

    }

    function closeModal() {
        setOpenModal(!openModal);
    }    

    const handleButton = () => {
        if(fDatas.length === 0 || username===""){
            return;
        }
        deleteReserva(id, fDatas, username);
        alert("Reserva Cancelada!");  
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
                    <p key={fDatas} className='text info'>{fDatas}</p>;
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
                    onClick={handleButton} 
                    style={{backgroundColor: "#e70d0d"}}
                >
                    <p className="text">Cancelar Reserva</p>
                </div>
            </div>
            <Modal isOpen={openModal}>
                <Confirmation datadb={fDatas} reserva={reservar} id={id} username={username} closeModal={closeModal}></Confirmation>
            </Modal>
        </div>
    );
}

export default CardReserva;