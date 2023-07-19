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
    const [fDatas, setfDatas] = useState([]);

    useEffect(() => {
        const value = vagas.filter((vaga) => { return vaga.reservado === true}).length;
        if(value < datas.length){
            setDisabled(false);
        }
        else
            setDisabled(true);
    }, [vagas]);

    useEffect(() => {
        formatData();
    }, []);

    function formatData(){
        var newDate = [];
        datas.map(async (data) => {
            const fdata = `${data.toDate().getDate()}/${data.toDate().getMonth() + 1}/${data.toDate().getFullYear()}`;
            newDate = [...newDate, fdata];
        })
        //const filtered = newDate.filter((item, index) => newDate.indexOf(item) === index);
        const filtered = [...new Set(newDate)];
        // const availableDatas = filtered.filter(item => vagas.map((vaga) => {
        //     const tempdata = `${vaga.data.data.toDate().getDate()}/${vaga.data.data.toDate().getMonth() + 1}/${vaga.data.data.toDate().getFullYear()}`;
        //     console.log(tempdata);
        //     return tempdata === item;
        // }));
        var availableDatas = [];
        for(var i = 0; i < filtered.length; i++) {
            var tempfiltered = filtered[i];
            for(var j = 0; j < vagas.length; j++) {
                var tempdata = `${vagas[j].data.data.toDate().getDate()}/${vagas[j].data.data.toDate().getMonth() + 1}/${vagas[j].data.data.toDate().getFullYear()}`
                if (tempfiltered === tempdata){
                    availableDatas = [...availableDatas, tempdata];
                }
            }
        }
        const newArray = filtered.filter(item => !availableDatas.includes(item));
        setfDatas(newArray);
    }

    // async function handleReserva(){
    //     var value = vagas.filter((vaga) => { return vaga.reservado === true}).length;
    //     if(value < datas.length){
    //         setDisabled(false);
    //         // await reservar(id, datas[0]);
    //         // alert("Reserva feita");
    //     }
    //     else
    //         setDisabled(true);
    // }

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
                    {/* {datas.map((data) => {
                        const fdata = `${data.toDate().getDate()}/${data.toDate().getMonth() + 1}/${data.toDate().getFullYear()}`;
                        const newDate = [...fDatas, fdata];
                        return <p key={fdata} className='text info'>{fdata}</p>;
                    })} */}
                    {fDatas.map((fDatas) => {
                        return <p key={fDatas} className='text info'>{fDatas}</p>;
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
                <Confirmation datadb={fDatas} reserva={reservar} id={id}></Confirmation>
            </Modal>
        </div>
    );
}

export default Card;