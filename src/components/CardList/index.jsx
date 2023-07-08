import Card from "../Card";

import "./style.css";

function CardList({hospedagens, reservar}) {
    return (
      <div className="list">
        {hospedagens.map((hospedagem) => {
          return (
            hospedagem.Reservas.some((reserva) => reserva.reservado === false) ?
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
              reservar={reservar}
            /> : <div></div>
          );
        })}
      </div>
    );
}

export default CardList;