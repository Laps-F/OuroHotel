import Card from "../Card";

function CardList({hospedagens}) {
    return (
      hospedagens.map((hospedagem) => {
        return (
          <Card 
            nome={hospedagem.Hotel} 
            endereco={hospedagem.Endereco} 
            preco={hospedagem.PrecoDiaria} 
            qtdcamas={hospedagem.QtdCamas} 
            tipocama={hospedagem.TipoCamas}
            foto={hospedagem.Foto}
          />
        );
      })
    );
}

export default CardList;