import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions/actions';

const Detail = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs)

  const { id } = useParams();
  const [dog, setDog] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/dogs/${id}`)
        if (data.name) {
          setDog(data)
        } else {
          throw new Error('Dog not found.')
        }
      } catch (error) {
        console.log('Error updating dog in useEffect in Detail component', error);
      }
    }

    dispatch(getDogs());
    fetchData();

    return () => {
      setDog({});
    }
  }, [dispatch, id])

  const getDescription = () => {
    let description = "This dog has";
    
    if (dog.weight) {
      description += ` a weight of ${dog.weight} kg,`;
    }
    
    if (dog.height) {
      description += ` a height of ${dog.height} cm,`;
    }
    
    if (dog.life_span) {
      description += ` a life span of ${dog.life_span}.`;
    }
    
    if (dog.origin) {
      description += ` and originates from ${dog.origin}.`;
    }
  
    // Unir los temperamentos con un espacio en blanco
    if (dog.temperament) {
      description += ` Its temperament is ${dog.temperament.join(', ')}.`;
    }
  
    return description;
  };
  
  //randoms dogs
  const randomDogs = [];

  while (randomDogs.length < 3) {
    const randomIndex = Math.floor(Math.random() * dogs.length);
    const randomDog = dogs[randomIndex];

    if (!randomDogs.includes(randomDog)) {
      randomDogs.push(randomDog)
    }
  }

  const isLocalImage = !dog.image?.startsWith("http");

  return (
    <div className="container">
      <div className="row ">
        <div className="col-lg-5 mb-3">
          <div className="card h-90 mt-4">
            <img         
              src={isLocalImage ? `http://localhost:3001/${dog.image}` : dog.image}
              className="card-img-top" 
              alt={dog.name} 
              style={{ maxHeight: "350px" }} 
            />
            <div className="card-body">
              <h5 className="card-title" style={{ fontWeight: '900' }}>{dog.name}</h5>
              <p className="card-text">{getDescription()}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-5 ms-auto">
          <h3 className="text-center">Meet more dogs</h3>
          {randomDogs.map((index) => (
            <div key={index.id} className="card mb-2" style={{ width: "450px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={index.image} className="img-fluid rounded-start card-img-left" alt="..." style={{ height: "150px", width: '400px' }} />
                </div>
                <div className="col-md-8 d-flex flex-column">
                  <div className="card-body flex-grow-1">
                    <h5 className="card-title fs-6">{index.name}</h5>
                  </div>
                  <div className="card-footer">
                    <NavLink to={`/detail/${index.id}`} style={{ height: "40px" }} className="btn btn-primary w-100">More</NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Detail;

/////////////