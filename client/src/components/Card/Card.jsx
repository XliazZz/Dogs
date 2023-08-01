import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postFavorite, deleteFavorite, getFavorite } from "../../redux/actions/actions";
import "./Card.css";

const Card = ({ id, image, name, height, weight, life_span, temperament, origin, _id, showButton = true }) => {
  const isLocalImage = !image?.startsWith("http");

  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);
  
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(_id))
    } else {
      setIsFav(true);
      dispatch(postFavorite({ id, image, name, height, weight, life_span, temperament, origin, _id }));
    };
  };
  

  useEffect(() => {
    dispatch(getFavorite());
  }, [dispatch])

  useEffect(() => {
    if (Array.isArray(myFavorites)) {
      myFavorites.forEach((fav) => {
        if (fav && fav.id === id) {
          setIsFav(true);
        };
      });
    };
  }, [myFavorites])
  
  return (
    <div className="card h-100 p-1 "  style={{ width: '22rem' }}>
      {showButton && (
        <button className="buttonFav" onClick={handleFavorite}>
          <span>{isFav ? "❤️" : "🤍"}</span>
        </button>
      )}      
      <img 
        src={isLocalImage ? `http://localhost:3001/${image}` : image}
        alt={name} 
        className="card-img-top img-fluid" 
        style={{ objectFit: 'cover', height: '350px' }} 
      />
      <div className="card-body d-flex flex-column">
        <h1 className="card-title fs-5">{name}</h1>
        <div className="mt-auto">
          <NavLink to={`/detail/${id}`} className="btn btn-primary w-100">More</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
