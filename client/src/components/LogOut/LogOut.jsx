import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../../redux/actions/actions";
import { RiLogoutBoxRLine } from "react-icons/ri";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUserData());
    navigate('/');
  };

  return(
    <button
      type='button'
      className="btn btn-danger pb-2"
      onClick={handleLogout}
    >
      <RiLogoutBoxRLine />
    </button>
  );
};

export default LogOut;