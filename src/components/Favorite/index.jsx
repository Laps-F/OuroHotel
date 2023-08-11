import React, {useState, useEffect} from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './styles.css'

const Favorite = ({favorites, hotelName, actFavorited, recarrega}) => {
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    actFavorited.map((fav)=> {
      if (fav.nome === hotelName){
        setFavoritado(fav.favoritado);
      }
      // else
      //   setFavoritado(false)
    })
  },[])

  const toggleFavorito = () => {
    favorites(hotelName);
    setFavoritado(!favoritado);
    recarrega();
  };
  
  return (
    <div>
      <button
      className={`favorito-button ${favoritado ? 'favoritado' : ''}`}
      onClick={toggleFavorito}
      >
      {favoritado ? (
        <AiFillHeart className="heart-icon" />
      ) : (
        <AiOutlineHeart className="heart-icon" />
      )}
    </button>
    </div>
  )
}

export default Favorite