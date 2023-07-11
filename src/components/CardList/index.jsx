import Card from "../Card";

import "./style.css";

function CardList({hospedagens, reservar}) {
    return (
      <div className="list">
        {hospedagens.map((hospedagem) => {
          return (
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
            />
          );
        })}
      </div>
    );
}

export default CardList;