import Card from "../Card";

import './style.css';

function CardList({hospedagens, reservar, username}) {
    return (
      <div className="card-list">
        {hospedagens.map((hospedagem) => {
          return(
            hospedagem.Reservas.some(reserv => reserv.reservado === false) ? 
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
              vagas={hospedagem.Reservas}
              username={username}
              screen={0}
              rate={hospedagem.Rate}
            /> : 
            <div key={hospedagem.id}></div>
          );
        })}
      </div>
    );
}

export default CardList;