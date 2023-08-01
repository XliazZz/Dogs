import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
import validateLogin from "../../utils/validateLogin";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import { LiaEyeSolid, LiaEyeSlash } from "react-icons/lia"

const LogIn = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null);
  const [access, setAccess] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setUserData({
      ...userData,
      [name]: value
    });
  
    // Actualizar los errores solo para el campo de entrada actual
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateLogin({ ...userData, [name]: value })[name]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = userData;
    const URL = 'http://localhost:3001/login';

    try {
      const { data } = await axios.post(URL, { email, password });

      // Procesar la respuesta y guardar el token si es necesario
      if (data && data.token) {
        localStorage.setItem('token', data.token); // Almacenar el token en localStorage
        setAccess(true);
        setError(null);
      }  

    } catch (error) {
      setError(error.response.data);
      setAccess(false);
    }
  };

  useEffect(() => {
    if (access) {
      navigate('/home')
    }
  }, [access])

  const isFormValid =
  !userData.email ||
  !userData.password 

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  console.log(error);

  return (
    <div className='container p-1'       
      style={{ 
        width: "100%",
        maxWidth: "1200px",
        height: "100vh", 
        backgroundColor: "#2a2a2a" 
    }}>

      <div className='d-flex justify-content-center'>
        <form 
          className="needs-validation bg-secondary mt-4 mb-5 p-2" 
          style={{ 
            borderRadius: "13px",
            width:"40%",
          }}
          onSubmit={handleSubmit}
        >

          <div className="mb-2" style={{ padding: '0rem 5rem 0rem 5rem' }}>
            <div className="d-flex justify-content-center">
              <label htmlFor="email" className="form-label text-light">Email</label>
            </div>
            <input 
              value={userData.email}
              onChange={handleChange}
              name="email"
              type="email" 
              required
              className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
              id="email" 
              style={{ height: "30px", fontSize: "17px" }}
            />
            {errors?.email && <div className="invalid-feedback d-flex justify-content-center">{errors?.email}</div>}
          </div>

          <div className="mb-3 d-flex flex-column align-items-center" style={{ padding: "0rem 5rem 0rem 5rem" }}>
            <label htmlFor="password" className="form-label text-light">Password</label>
            <div className="d-flex align-items-center">
              <input
                value={userData.password}
                onChange={handleChange}
                name="password"
                required
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors?.password ? "is-invalid" : ""}`}
                id="password"
                style={{ height: "30px", fontSize: "17px" }}
              />
              <button 
                className="btn btn-light"
                type="button" 
                onClick={handleShowPassword} 
                style={{ fontSize: "30px", height: "30px", padding: "0" }}
              >
                {
                showPassword ? <LiaEyeSolid style={{ paddingBottom: "25px", fontSize: "55px", width: "35px" }}
                /> 
                : <LiaEyeSlash style={{ paddingBottom: "22px", fontSize: "50px", width: "35px" }}
                />
                }
              </button>
            </div>
            {errors?.password && <div className="invalid-feedback d-flex justify-content-center">{errors?.password}</div>}
          </div>

          {error && (
            <div className="alert alert-danger fs-6 py-2 px-3" role="alert">
              {error.message ? error.message : error}
            </div>
          )}


          <div className="d-flex justify-content-center mt-4">
            <button 
              type="submit" 
              className="btn btn-light"
              disabled={isFormValid}
            >Log In</button>
          </div>

          <div className="d-flex justify-content-center">
            <h4 className="fs-6 mt-3 text-light">Do you not have a account? <NavLink to='/register' className='link-body-emphasis'>Register</NavLink></h4>
          </div>

          <div className="d-flex justify-content-center">
            <hr style={{ width: "90%" }}/>
          </div>

          <div className="d-flex justify-content-center mb-4">
            <FacebookLogin />
          </div>

        </form>
      </div>
    </div>
  )
};

export default LogIn;