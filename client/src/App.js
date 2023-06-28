import './App.css';
import { React } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import Landing from './components/Landing/Landing';


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav />}
      <Routes>
        <Route exact path='/dogs/newdog' element={<Create />} />
        <Route exact path='dogs/:idBreed' element={<Detail />} />
        <Route exact path='/dogs' element={<Home />} />
        <Route exact path='/' element={<Landing />} />
        <Route exact path="/404notFound" element={<Error />} />
        <Route path="/:any" element={<Navigate to='/404notFound' />} />
      </Routes>
    </div>
  );
}

export default App;
