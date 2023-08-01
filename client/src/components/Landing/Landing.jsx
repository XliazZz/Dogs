import DogsLanding from '../../assets/DogsLanding.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import { IoMdCreate } from "react-icons/io"
import { MdOutlineFavorite } from "react-icons/md"
import { FaSearchLocation } from "react-icons/fa"
import { RiCompassDiscoverFill } from "react-icons/ri"
import Affenpinscher from '../../assets/Dogs/Affenpinscher.jpg';
import Afghan_Hound from '../../assets/Dogs/Afghan_Hound.jpg';
import African_Hunting_Dog from '../../assets/Dogs/African_Hunting_Dog.jpg';
import { NavLink } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="text-center">
      <div>
        <h1 className="p-4">Welcome to The Bark Side 🐶</h1>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="text-start me-3 p-2">
          <span>Discover everything you want to know about dogs from around the world.</span>
          <p>You can also create a new breed and add your favorite dogs to your favorites list.</p>
        </div>
        <img src={DogsLanding} className="w-50 h-auto" alt="DogsLanding" />
      </div>

      <div className="bg-secondary-subtle pt-5 pb-4">
        <h2 className='pb-3 pt-3'>Some of the dogs that you will find on this website 🐶</h2>
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div id="carouselExampleIndicators" className="carousel slide w-50 h-auto">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner rounded">
              <div className="carousel-item active">
                <img src={Afghan_Hound} className="d-block w-100 rounded" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={Affenpinscher} className="d-block w-100 rounded" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={African_Hunting_Dog} className="d-block w-100 rounded" alt="..." />
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className='row m-0 pb-5 bg-dark bg-light w-100 text-light'>
        <h2 className='mt-5 mb-4'>Discover what sets in The Bark Side apart</h2>

        <div className="col-lg-3 d-flex flex-column align-items-center">
          <ul className='list-unstyled'>
            <li > 
              <IoMdCreate  className='fs-2'/> 
              <h3 style={{ fontWeight: '900', fontSize: '26px' }}> Create your new raze </h3>
              <span style={{ fontSize: '17px' }} >This option allows you to create your new breed of dog that fits your tastes and preferences.
              </span>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 d-flex flex-column align-items-center">
          <ul className='list-unstyled'>
            <li  > 
              <MdOutlineFavorite className='fs-2'/> 
              <h3 style={{ fontWeight: '900', fontSize: '26px'  }}> Choose your favorite dogs </h3>
              <span style={{ fontSize: '17px' }} >
              This option allows you to save your favorite dogs for quick and easy access in the future.
              </span>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 d-flex flex-column align-items-center">
          <ul className='list-unstyled'>
            <li> 
              <FaSearchLocation className='fs-2'/> 
              <h3 style={{ fontWeight: '900', fontSize: '26px'  }}>Search all the breed of dog in the world</h3>
              <span style={{ fontSize: '17px' }} >This option allows you to explore different dog breeds and discover unknown ones.  
              </span>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 d-flex flex-column align-items-center">
          <ul className='list-unstyled'>
            <li> 
              <RiCompassDiscoverFill className='fs-2'/> 
              <h3 style={{ fontWeight: '900', fontSize: '26px'  }}>Discover new breed of dog</h3>
              <span style={{ fontSize: '17px' }} >This option invites you to venture into the unknown and discover new breed of dog.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className='pt-5 pb-5 bg-black'>
        <h3 className='mb-5 text-light'>Join Our community of The Bark Side! 🐶</h3>
        <NavLink to='/login'>
          <button type="button" class="btn btn-outline-light ">Log In</button>
        </NavLink>

        <NavLink to='register'>
          <button type="button" class="btn btn-success ms-5">Register</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;