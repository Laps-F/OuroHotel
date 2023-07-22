import Card from "../Card";

import './style.css';

function CardList({hospedagens, reservar, username}) {
    return (
      <div className="list">
        {hospedagens.map((hospedagem) => {
          return(
          hospedagem.Datas.length === hospedagem.Reservas.length ? <div></div> : 
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
              />
          );
        })}
      </div>
    );
}

export default CardList;