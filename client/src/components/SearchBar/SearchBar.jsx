import { FaSearch } from "react-icons/fa";
import { searchDog } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    if (name) {
      dispatch(searchDog(name, navigate));
      setName('');
    };
  };

  return(
    <div className="container-fluid">
      <form className="d-flex" role="search">
        <input className="form-control-sm me-2 bg-white text-dark" type="search" placeholder="Search breed of dog" aria-label="Search" onChange={handleChange} value={name}/>
        
        <NavLink to='/cards'>
          <button className="btn btn-outline-light"  onClick={handleClick} type="submit"><FaSearch style={{ fontSize: '25px' }}  onClick={handleClick}/></button>
        </NavLink>
    </form>
  </div>
  )
};

export default SearchBar