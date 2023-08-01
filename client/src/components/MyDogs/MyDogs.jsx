import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCreateDog } from "../../redux/actions/actions";
import Card from "../Card/Card";
import CardLoading from "../CardLoading/CardLoading";

const MyDogs = () => {
  const dispatch = useDispatch();
  
  const myCreateDogs = useSelector((state) => state.myCreateDogs); 
  const loadingGetCreateDog = useSelector((state) => state.loadingGetCreateDog); 
  const successGetCreateDog = useSelector((state) => state.successGetCreateDog); 

  useEffect(() => {
    dispatch(getCreateDog());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row mt-2 ">
        <div className="d-flex justify-content-center">
          <h3>My dogs created</h3>
        </div>
      </div>
      {loadingGetCreateDog && !successGetCreateDog &&
        <div className="row row-cols-2 pt-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="col mb-4" key={index}>
              <CardLoading />
            </div>
          ))}
        </div>
      }

      {successGetCreateDog &&       
        <div className="row row-cols-2">
          {myCreateDogs?.map((createDog) => (
            <div className="col mb-4 pt-3" key={createDog.id}>
              <Card
                key={createDog.id}
                _id={createDog._id}
                id={createDog.id}
                image={createDog.image}
                name={createDog.name}
                height={createDog.height}
                weight={createDog.weight}
                life_span={createDog.life_span}
                showButton={false} 
              />
            </div>
          ))}
        </div>
      }

      {myCreateDogs.length === 0 && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 200px)" }}>
          <span className="fs-1">You haven't created any dogs yet</span>
        </div>
      )}
    </div>  
  );
};

export default MyDogs;
