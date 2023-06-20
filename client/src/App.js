import './App.css';
import { React } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';


function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav />}
      <Routes>
        <Route exact path='/dogs/newdog' element={<Create />} />
        <Route exact path='dogs/:idBreed' element={<Detail />} />
        <Route exact path='/dogs' element={<Home />} />
        <Route exact path='/' element={<Landing />} />
        {/* <Route exact path='/temperaments' element={<Temperaments />} /> */}
      </Routes>
    </div>
  );
}

export default App;
