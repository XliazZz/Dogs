import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from '../Card/Card';
import { searchDog } from "../../redux/actions/actions";

const Cards = ({ match }) => { 

  const [showSpinner, setShowSpinner] = useState(true);
  const dispatch = useDispatch();
  let search = useSelector((state) => state.search);
  let errorSearchDogs = useSelector((state) => state.errorSearchDogs);
  
  useEffect(() => {
    dispatch(searchDog(match));

    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch, match]);

  console.log(errorSearchDogs);

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>

        {showSpinner && (
          <div className="text-center">
            <div className="spinner-border text-secondary" role="status"></div>
            <p className="mt-2">Loading...</p>
          </div>
        )}

        {!showSpinner && (
          <div className="row row-cols-1 row-cols-md-2">
            {search.map((dog) => (
              <div className="col mb-4 mt-3" key={dog.id}>
                <Card 
                  id={dog.id}
                  key={dog.id}
                  image={dog.image}
                  name={dog.name}
                />
              </div>
            ))}
          </div>
        )}

        {errorSearchDogs && !showSpinner && (
          <div className="alert alert-danger fs-6 py-2 px-3" role="alert">
            {errorSearchDogs.response.data.error}
          </div>
        )}

      </div>
    </div>
  );
};

export default Cards;
