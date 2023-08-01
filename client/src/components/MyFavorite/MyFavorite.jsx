import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFavorite } from "../../redux/actions/actions";


const MyFavorite = () => {
  const dispatch = useDispatch();

  const myFavorites = useSelector((state) => state.myFavorites); 

  useEffect(() => {
    dispatch(getFavorite());
  }, [dispatch]);

  return(
    <div className="container">
      <div className="row mt-2 ">
        <div className="d-flex justify-content-center">
          <h3>My favorites</h3>
        </div>
      </div>
      <div className="row row-cols-2">
        {myFavorites?.map((favoriteDog) => (
          <div className="col mb-4" key={favoriteDog.id}>
            <Card
              key={favoriteDog.id}
              _id={favoriteDog._id}
              id={favoriteDog.id}
              image={favoriteDog.image}
              name={favoriteDog.name}
              height={favoriteDog.height}
              weight={favoriteDog.weight}
              life_span={favoriteDog.life_span}
            />
          </div>
        ))}
      </div>

      {myFavorites.length === 0 && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 200px)" }}>
          <span className="fs-1">You have not added any favorites.</span>
        </div>
      )}
    </div>
  );
};

export default MyFavorite;