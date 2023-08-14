import Card from "../Card";

import './style.css';

function FavoriteList({hospedagens, reservar, username, favorites, actFavorited, recarrega}) {

    return (
        <div className="list">
            {hospedagens.map((hospedagem) => {
                return (
                    actFavorited && actFavorited.map((fav) => {
                        return (
                            fav.nome === hospedagem.Hotel && fav.favoritado === true ?
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
                                favorites={favorites}
                                actFavorited={actFavorited}
                                recarrega={recarrega}
                            /> : 
                            <div key={hospedagem.id}></div>
                        );
                    })
                );
            })}
        </div>
    );
}

export default FavoriteList;