import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { Link } from 'react-router-dom';
import './Selected.scss'

const Selected = () => {
  const [selectedIds, setSelectedIds] = useState([])
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const ids = localStorage.getItem('selected');
    if (ids) {
      const arrIds = JSON.parse(ids)
      setSelectedIds(arrIds)
    }
  }, []);

  useEffect(() => {
    const getMovieById = async () => {
      if (selectedIds.length > 0) {
        selectedIds.map(async id => {
          const res = await axios.get(`/3/movie/${id}`, { params: { 'language': 'ru-RU' } })
          setMovies((prev) => [...prev, res.data])
        })
      }
    }
    getMovieById()
  }, [selectedIds]);



  

  return (
    <div className="container">
      {console.log(movies)}
      <div className="section selected">
        {movies && movies.length > 0 
          ? 
          <ul className='cards' style={{justifyContent: 'start', margin: '10px 0'}}>
            {
              movies.map(el => (
                <li key={el.id} style={{ margin: '0 10px' }}>
                  <Card props={el} />
                </li>
              ))
            }
          </ul>
          : 
          <div className='selected-add'>
            <div className='selected-add__text'>Добавть в список избранных</div>
            <Link className='selected-add__link' to="/"><BookmarkAddOutlinedIcon sx={{ fontSize: '70px', color: '#7DA2EE' }} /></Link>
          </div>
        }
        
      </div>
    </div>
  );
}

export default Selected;