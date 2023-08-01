import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './NavBar.css'; // Archivo CSS personalizado
import { NavLink , useLocation} from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import { RiContactsLine, RiHomeLine } from "react-icons/ri"
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai"
import { IoCreateOutline } from "react-icons/io5"
import { PiDog } from "react-icons/pi"
import LogOut from '../LogOut/LogOut';

const NavBar = () => {
  const { pathname } = useLocation();
  const isPage = pathname === '/login' || pathname === '/register';

  const access = localStorage.getItem('token') !== null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary" style={{maxHeight: "65px"}}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav text-light">
          <ul className="navbar-nav">
            <li className="nav-item active ">
              <NavLink className="nav-link text-light" to="/home"> <RiHomeLine className='fs-2 pb-1' title='Home'/> </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/about"> <RiContactsLine className='fs-2 pb-1' title='About'/> </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/contact"> <AiOutlineMessage className='fs-2 pb-1' title='Contact us'/> </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link text-light ${isPage ? 'disabled' : ''}`} to="/create">
                <IoCreateOutline className='fs-2 pb-1' title='Create Dog' />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link text-light ${isPage ? 'disabled' : ''}`} to="/mydogs">
                <PiDog className='fs-3 ' title='My dogs' />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link text-light ${isPage ? 'disabled' : ''}`} to="/favorites">
                <AiOutlineHeart className='fs-3 ' title='Favorites' />
              </NavLink>
            </li>
          </ul>

          {access ? (
            <div className="ms-auto">
              <div className="d-flex">
                <SearchBar />
              </div>
            </div>
          ) : (
            <div className="d-flex" >
              <SearchBar />
            </div>
          )}
          
          { !access && 

            <div className="ms-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/login">
                    <button className="btn btn-outline-light me-2">Log In</button>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register">
                    <button className="btn btn-dark">Register</button>
                  </NavLink>
                </li>
              </ul>
            </div>
          }

          { access &&
            <LogOut />
          }

        </div>
      </div>
    </nav>
  );
};

export default NavBar;