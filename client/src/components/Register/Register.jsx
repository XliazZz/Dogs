import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postUser } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import validateRegister from '../../utils/validateRegister';
import FacebookRegister from '../FacebookRegister/FacebookRegister';
import { LiaEyeSolid, LiaEyeSlash } from "react-icons/lia"
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loadingRegister);
  const error = useSelector((state) => state.errorgRegister);
  const success = useSelector((state) => state.successRegister);

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [errorLogin, setErrorLogin] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setUserData({
      ...userData,
      [name]: value
    });
  
    // Actualizar los errores solo para el campo de entrada actual
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateRegister({ ...userData, [name]: value })[name]
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(postUser(userData));


  };

  const login = async () => {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/login';
  
      try {
        const { data } = await axios.post(URL, { email, password });
  
        if (data && data.token) {
          localStorage.setItem('token', data.token); // Almacenar el token en localStorage
          navigate('/home')
        }  
      } catch (error) {
        setErrorLogin(error)
      };
    
  }

  useEffect(() => {
    if (success) {
      login();
    }
  }, [success])

  const isFormValid =
  !userData.name ||
  !userData.email ||
  !userData.password 
  ;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  console.log(error);
  // console.log(errorLogin);

  return (
    <div className='container'       
      style={{ 
        width: "100%",
        maxWidth: "1200px",
        height: "100vh", 
        backgroundColor: "#2a2a2a" 
    }}>
      
      <div className='d-flex justify-content-center'>
        <form 
          onSubmit={handleSubmit}
          className="needs-validation mt-4 mb-5 p-2 bg-secondary"
          noValidate
          style={{ 
            padding: '10px 10px 20px 10px', 
            borderRadius: '15px', 
            width: "50%"
            
          }}
        >

          <div className="mb-2">
            <label htmlFor="name" className="form-label">Name:</label>
            <input 
              style={{ height: "30px", fontSize: "15px" }}
              type="text" 
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              required
              name='name'
              onChange={handleChange}
              value={userData.name}
            />
            {errors.name && <div className="invalid-feedback" style={{fontSize: "15px"}}>{errors.name}</div>}
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3 form-group">
                <label htmlFor="inputEmail1" className="form-label">Email:</label>
                <input 
                  style={{ height: "30px", fontSize: "15px" }}
                  type="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="inputEmail1" 
                  required
                  name='email'
                  onChange={handleChange}
                  value={userData.email}
                  aria-describedby="emailHelp" 
                />
                <div 
                  id="emailHelp"
                  className="form-text "
                  style={{ fontSize: '13px' }}
                >We will not share it with anyone.</div>
                {errors.email && <div className="invalid-feedback" style={{fontSize: "15px"}}>{errors.email}</div>}
              </div>
            </div>

            <div className="col">
                <label htmlFor="inputPassword1" className="form-label">Password</label>
              <div className="mb-3 form-group d-flex flex-column align-items-center">
                <div className="d-flex align-items-center">
                  <input
                    style={{ height: "30px", fontSize: "15px" }}
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="inputPassword1"
                    required
                    name="password"
                    onChange={handleChange}
                    value={userData.password}
                  />
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={handleShowPassword}
                    style={{ fontSize: "30px", height: "30px", padding: "0" }}
                  >
                    {showPassword ? <LiaEyeSolid style={{ paddingBottom: "25px", fontSize: "55px", width: "35px" }} />
                      : <LiaEyeSlash style={{ paddingBottom: "22px", fontSize: "50px", width: "35px" }} />
                    }
                  </button>
                </div>
                {errors.password && <div className="invalid-feedback d-flex justify-content-center" style={{fontSize: "15px"}}>{errors.password}</div>}
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger fs-6 py-2 px-3" role="alert">
              {error.response.data.error}
            </div>
          )}

          <div className='d-flex justify-content-center mt-1'>
            <div className="mb-2 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
              <label className="form-check-label " htmlFor="exampleCheck1">
                <NavLink to='/terms' className='link-body-emphasis' >
                  I accept the terms and conditions
                </NavLink>
              </label>
            </div>
          </div>

          <div className='d-flex justify-content-center '>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isFormValid}
            >Register</button>
          </div>

        <div className='d-flex justify-content-center'>
          <h4 className='fs-6 mt-2'>Do you have a account? <NavLink to='/login' className="text-light">Log in</NavLink></h4>
        </div>

        <hr style={{margin: "15px"}}/>

        <div className='d-flex justify-content-center'>
          <FacebookRegister></FacebookRegister>
        </div>

        </form>
      </div>
    </div>
  )
};

export default Register;