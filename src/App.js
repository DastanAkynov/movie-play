import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Main from './pages/Main';
import Menu from './components/Menu';

import './App.scss';
import { Context } from './context/Context';
import { MovieService } from './services/MovieService';
import Detail from './components/Detail';
import Selected from './pages/Selected';
import Footer from './components/Footer';
import Infoblock from './components/InfoBlock';

function App() {
  const movieService = MovieService()

  return (
    <Context.Provider value={movieService}>
      <BrowserRouter>
        <div id='app'>
            <Menu />
            <main id='main'>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/detail/:id' element={<Detail />} />
              <Route path='/selected' element={<Selected />} />
            </Routes>
            </main>
            <Infoblock />
          <footer id='footer'><Footer /></footer>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
