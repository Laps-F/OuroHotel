import Card from "../Card";

import './style.css';

function CardList({hospedagens}) {
    return (
      <div className="list">
        {hospedagens.map((hospedagem) => {
        return (
          <Card 
            key={hospedagem.id}
            nome={hospedagem.Hotel} 
            endereco={hospedagem.Endereco} 
            preco={hospedagem.PrecoDiaria} 
            qtdcamas={hospedagem.QtdCamas} 
            tipocama={hospedagem.TipoCamas}
            foto={hospedagem.Foto}
          />
        );
      })}
      </div>
    );
}

export default CardList;