import Card from "../Card";

import './style.css';

function CartList({hospedagens, user}) {

    return (
        <div className="list">
            {hospedagens.map((hospedagem) => {
                return(
                    hospedagem.Reservas.length > 0 ?
                        hospedagem.Reservas.map((reserva) => {
                            console.log(user)
                            console.log("bd", reserva.username.username)
                            console.log(reserva.username.username === user ? "aaaaa" : "bbbbb")
                            return (
                                reserva.username.username === user ? 
                                <Card 
                                    key={hospedagem.id}
                                    id={hospedagem.id}
                                    nome={hospedagem.Hotel} 
                                    endereco={hospedagem.Endereco} 
                                    preco={hospedagem.PrecoDiaria} 
                                    qtdcamas={hospedagem.QtdCamas} 
                                    tipocama={hospedagem.TipoCamas}
                                    foto={hospedagem.Foto}
                                    datas={hospedagem.Datas}
                                    vagas={hospedagem.Reservas}
                                    username={user}
                                /> :
                                <div></div>
                            );
                        }) :
                    <div></div>
                );
            })}
        </div>
    )
}

export default CartList;