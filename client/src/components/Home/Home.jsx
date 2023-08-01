import { getDogs } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Paginate from '../Paginate/Paginate';

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
  console.log(dogs);
  return (
    <div className="container">
      <div className="row g-5 mt-3 ">
        <Paginate items={dogs} />
      </div>

    </div>
  );
};

export default Home;
