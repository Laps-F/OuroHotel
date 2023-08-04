import Card from "../Card";

import './style.css';

function CartList({hospedagens, user, deleteReserva, editReserva, avalia, rateArray}) {

    return (
        <div className="list">
            {hospedagens.map((hospedagem) => {
                return(
                    hospedagem.Reservas.length > 0 ?
                        hospedagem.Reservas.map((reserva) => {
                            return (
                                reserva.username === user ? 
                                <Card 
                                    key={reserva.data}
                                    id={hospedagem.id}
                                    nome={hospedagem.Hotel} 
                                    endereco={hospedagem.Endereco} 
                                    preco={hospedagem.PrecoDiaria} 
                                    qtdcamas={hospedagem.QtdCamas} 
                                    tipocama={hospedagem.TipoCamas}
                                    foto={hospedagem.Foto}
                                    datas={reserva.data}
                                    vagas={hospedagem.Reservas}
                                    username={user}
                                    deleteReserva={deleteReserva}
                                    editReserva={editReserva}
                                    screen={1}
                                    avalia={avalia}
                                    rateArray={rateArray}
                                /> :
                                <div key={reserva.data}></div>
                            );
                        }) :
                    <div key={hospedagem.id}></div>
                );
            })}
        </div>
    )
}

export default CartList;