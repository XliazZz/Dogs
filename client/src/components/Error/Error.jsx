import { TbAlertTriangle } from "react-icons/tb"
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div 
      className="container d-flex flex-column justify-content-center align-items-center text-white" 
      style={{ 
        width: "100%",
        maxWidth: "1200px",
        height: "100vh", 
        backgroundColor: "#2a2a2a" 
    }}
    >
      <div className="fs-1 ">
        <TbAlertTriangle className="text-danger"/>
      </div>
      <h1 className="text-center">
        Page not found.
      </h1>

      <div className="d-flex flex-column align-items-center pt-5">
        <NavLink className="d-flex justify-content-center " to='/home'>
          <button type="button" class="btn btn-light">Go to home</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
