import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import FormCreateDog from './components/FormCreateDog/FormCreateDog';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing'
import LogIn from './components/LogIn/LogIn';
import NavBar from './components/NavBar/NavBar';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import Cards from './components/Cards/Cards';
import MyDogs from './components/MyDogs/MyDogs';
import Contact from './components/Contact/Contact';
import FAQ from './components/FAQ/FQA';
import Terms from './components/Terms/Terms';
import MyFavorite from './components/MyFavorite/MyFavorite';
import Error from './components/Error/Error';

function App() {
  
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const access = localStorage.getItem('token') !== null;

  useEffect(() => {
    if (!access && (pathname !== '/' && pathname !== '/register' && pathname !== '/login' && pathname !== '/about' && pathname !== '/contact' && pathname !== '/home' && pathname !== '/cards' && pathname !== '/terms' && pathname !== '/faq')) {
      navigate('/login')
    }
  }, [navigate, pathname])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/*' element={<Error />} />
        <Route path='/' element={<Landing />} />
        <Route path='/favorites' element={<MyFavorite />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/mydogs' element={<MyDogs />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/create' element={<FormCreateDog />} />
        <Route path='/cards' element={<Cards />} />
      </Routes>
      <Footer />    
    </>
  )
}

export default App
