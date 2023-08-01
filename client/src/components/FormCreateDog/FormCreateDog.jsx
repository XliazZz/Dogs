import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from "../../redux/actions/actions";
import { TiDelete }  from "react-icons/ti";
import iconoImg from '../../assets/iconoimg.jpg'
import style from './FormCreate.module.css';
import axios from 'axios';
import validateFormDog from "../../utils/validateFormDog"

const FormCreateDog = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments)

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch])

  const [isImageSelected, setIsImageSelected] = useState(false);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);    
  const [activityData, setActivityData] = useState({
    image: null,
    name: '',
    height: '',
    weight: '',
    life_span: '',
    temperament: selectedTemperaments,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setActivityData({
      ...activityData,
      [event.target.name]: event.target.value
    });

    const { name, value } = event.target;

    setActivityData({
      ...activityData,
      [name]: value
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateFormDog({ ...activityData, [name]: value })[name]
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setActivityData({
      ...activityData,
      image: file
    })
    setIsImageSelected(true);
  };

  const handleTemperamentsSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map((option) => option.value);

    // Filtra los temperamentos seleccionados sin necesidad de comparar objetos
    const newSelectedTemperaments = selectedOptions.filter((option) => {
      return !selectedTemperaments.includes(option);
    });

    setSelectedTemperaments([...selectedTemperaments, ...newSelectedTemperaments]);

    setActivityData({
      ...activityData,
      selectedTemperaments: [...selectedTemperaments, ...newSelectedTemperaments],
    });
  };

  const handleTemperamentDelete = (temperamentName) => {
    const updatedSelectedTemperaments = selectedTemperaments.filter(
      (temperament) => temperament !== temperamentName
    );

    setSelectedTemperaments(updatedSelectedTemperaments);
    setActivityData({
      ...activityData,
      selectedTemperaments: updatedSelectedTemperaments,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token'); 
    try {
      axios.post('http://localhost:3001/dogs', activityData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': token, 
        },
      })
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid =
  activityData.image === null ||
  !activityData.name ||
  !activityData.height ||
  !activityData.weight ||
  !activityData.life_span ||
  !activityData.temperament;

  return (
    <div className="container">
      <div className={`d-flex justify-content-center mt-2`}           
        // style={{ margin: '0px', padding: '0px' }}
      >
        <h3 
          className="text-align"
        >
          Create a New Breed 🐶
        </h3>
      </div>
      <form  
        encType="multipart/form-data"
        className="needs-validation m-5 p-3 mt-0"
        style={{ 
          borderRadius: '15px', 
          backgroundColor: '#e2e2e2'
        }}
      >
        <div className={`d-flex justify-content-center`}>
          <div className={`form-group ${style.imageContainer} ${style.imageContainerHover}`}>
            <input
              className={`form-control `}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              name="image"
              id="image"
            />        
            {
              !activityData.image ? (
                <div className={style.profileIcon}>
                  <img 
                    className={style.profileImage}
                    src={iconoImg} 
                    alt="Default Profile Image" 
                  />
                </div>
              ) : (
                <img 
                  className={style.image}
                  src={URL.createObjectURL(activityData.image)}
                  alt="Profile Image Preview"
                />
              )
            }
            {
              !isImageSelected && (
                <div className={style.hoverText}>Dog picture</div>
              )
            }
          </div>
        </div>
        <div 
          id="emailHelp"
          className="form-text d-flex justify-content-center p-0 m-0"
          style={{ fontSize: '13px' }}
        >Please select a image.</div>

      <div className="form-group">
        <label>Name:</label>
        <input
          style={{ width: "100%", height: "30px" }}
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          required
          id="name"
          name="name"
          value={activityData.name}
          onChange={handleChange}
        />        
        {errors.name && <div className="invalid-feedback" style={{fontSize: "15px"}}>{errors.name}</div>}
      </div>

      <div className="row">
          <div className="col">
            <div className="form-group">
              <label>Height:</label>
              <input          
                style={{ height: "30px" }}
                type="number"
                className={`form-control ${errors.height ? 'is-invalid' : ''}`}
                placeholder="cm"
                min={10}
                required
                name="height"
                value={activityData.height}
                onChange={handleChange}
              />        
              {errors.height && <div className="invalid-feedback" style={{fontSize: "15px"}}>{errors.height}</div>}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Weight:</label>
              <input
                style={{ height: "30px" }}
                type="number"
                placeholder="kg"
                min={5}
                className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                required
                name="weight"
                value={activityData.weight}
                onChange={handleChange}
              />
              {errors.weight && <div className="invalid-feedback" style={{fontSize: "15px"}}>{errors.weight}</div>}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Lifespan:</label>
              <input           
                style={{ height: "30px" }}
                className={`form-control ${errors.life_span ? 'is-invalid' : ''}`}
                type="number"
                min={1}
                placeholder="0"
                required
                name="life_span"
                value={activityData.life_span}
                onChange={handleChange}
              />
              {errors.life_span && <div className="invalid-feedback" style={{fontSize: "15px"}}>{errors.life_span}</div>}
            </div>
          </div>
        </div>

      <div className="form-group">
          <label htmlFor="temperament">Temperaments:</label>
          <select
            className={`form-control ${errors.temperament ? 'is-invalid' : ''}`}
            multiple
            required
            value={selectedTemperaments} 
            onChange={handleTemperamentsSelect}
          >
            {temperaments.map((temperament, index) => (
              <option key={index} value={temperament}             
                style={{ fontSize: '15px'}}
              >
                {temperament}
              </option>
            ))}
          </select>
          {errors.temperament && <div className="invalid-feedback" style={{fontSize: "15px"}}>{errors.temperament}</div>}
      </div>

      <h4>
          You selected:
          {selectedTemperaments.map((temperament, index) => (
            <button
              style={{ backgroundColor: 'white',  height: '0%', borderRadius: '10px' }}
              className="p-2 fs-6"
              key={index}
              type="button"
              onClick={() => handleTemperamentDelete(temperament)} // Pasa el nombre del temperamento a eliminar
            >
              {temperament} | <TiDelete className="fs-4" style={{ color: 'red', backgroundColor: 'white',}}/>
            </button>
          ))}
        </h4>

      <div className={`d-flex justify-content-center`}>
        <button 
          type="submit" 
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isFormValid}
        >Create Breed</button>
      </div>

    </form>
  </div>
  )
};

export default FormCreateDog;