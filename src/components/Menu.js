import React, {useState} from 'react';
import './Menu.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Menu = () => {
  const [searchList, setSearchList] = useState([]);

  const debounce = (fn, ms) => {
    let timeout;
    return function (e) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(e), ms)
    }
  }

  const searchMovies = async (e) => {
    try {
      const value = e.target.value
      if (value) {
        const res = await axios.get('/3/search/movie?', {
          params: {
            'language': 'ru-RU',
            'page': '1',
            'query': value
          }
        })
        setSearchList(res.data.results || [])
      } else {
        setSearchList([])
      }
    } catch (err) {}
  }

  const imageUrl = 'https://image.tmdb.org/t/p/w500/'

  return (
    <div className="container">
      {console.log(searchList)}
      <div className="menu">
        <div className="menu__left">
          <div className="logo">
            <span className='logo__box'>M</span>
            <span className='logo__text'>Play</span>
          </div>
          <nav className="nav">
            <Link to="/" className='nav__item'>Главная</Link>
            <Link to="/selected" className='nav__item'>Избанные</Link>
          </nav>
        </div>

        <div className="search">
          <InputBase
            sx={{ ml: 1, flex: 1, borderBottom: '1px solid #000', width: '300px'}}
            placeholder="Поиск по названию"
            inputProps={{ 'aria-label': 'Поиск по названию' }}
            onChange={debounce(searchMovies, 200)}
          />
          <IconButton type="submit" sx={{ p: '10px'}} aria-label="search" >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Link to="/selected" >
            <IconButton color="primary" sx={{ p: '10px', color: '#003F65' }} aria-label="directions">
            <BookmarkAddedOutlinedIcon />
          </IconButton>
          </Link>
          <IconButton color="primary" sx={{ p: '10px', color: '#003F65' }} aria-label="directions">
            <PersonOutlineIcon />
          </IconButton>
         
        </div>
      </div>
      <div className="search__list">
          {searchList.map(({ id, title, backdrop_path }) => (
              <Link to={"/detail/" + id} className="search__item" key={id}>
                  <img src={imageUrl + backdrop_path} alt="film"/>
                  <span>{title}</span>
              </Link>
          ))}
      </div>
    </div>
  );
}

export default Menu;