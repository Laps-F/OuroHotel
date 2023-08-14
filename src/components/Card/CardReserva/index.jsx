/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Modal from '../../Modal';
import Edit from '../../Edit';
import Rating from '../../Rating/RatingCart';

import { CreateOutline } from 'react-ionicons'
import { FaSpinner } from 'react-icons/fa';

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
    username,
    datas,
    deleteReserva,
    editReserva,
    avalia,
    rateArray,
    }){

    const [openModal, setOpenModal] = useState(false);
    const [fDatas, setfDatas] = useState();
    const [fVagas, setfVagas] = useState([]);
    const [isLoading, setisLoading] = useState(false);

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
        setisLoading(true);

        if(fDatas.length === 0 || username===""){
            return;
        }
        deleteReserva(id, fDatas, username);
        
        setTimeout(() => {
            setisLoading(false);
        }, 5000); 
    }

    function handleEdit() {
        const newArray = []
        vagas.map((vaga) => {
            const dt = `${vaga.data.toDate().getDate()}/${vaga.data.toDate().getMonth() + 1}/${vaga.data.toDate().getFullYear()}`;
            if(dt !== fDatas && vaga.reservado === false){
                newArray.push(dt);
            }
        })
        setfVagas(newArray);
        setOpenModal(true);    
    }

    return (
        <div className="card">
            <div className="image-container">
                <img src={foto} alt="Foto" width="250" className="imagem"/>
            </div>
            <div className='edit-container'>
                <CreateOutline
                    onClick={handleEdit}
                    color={'#000000'} 
                    height="25px"
                    width="25px"
                />
            </div>
            <div>
                <div className="title-container">
                    <h1 className="text">{nome}</h1>    
                </div>
                <div className="info-container">
                    <p key={fDatas} className='text info'>Data Reservada: {fDatas}</p>
                    <p className="text info">{qtdcamas} cama(s) de {tipocama}</p>
                    <p className="text info">{endereco}</p>

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
                    {isLoading ? <FaSpinner className="spinner" /> : <p className="text">Cancelar Reserva</p>}
                    
                </div>
                <div className="rating">
                    <Rating avalia={avalia} hotel={nome} array={rateArray}/>
                </div>

            </div>
            <Modal isOpen={openModal}>
                <Edit 
                    datadb={fDatas}
                    vagas={fVagas} 
                    edit={editReserva} 
                    id={id} 
                    username={username} 
                    closeModal={closeModal}
                    nome={nome} 
                    preco={preco}
                    qtdcamas={qtdcamas}
                    tipocama={tipocama} 
                />
            </Modal>
        </div>
    );
}

export default CardReserva;