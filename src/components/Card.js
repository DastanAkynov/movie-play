import React, { useState, useEffect } from 'react';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import './Card.scss'
import { Link } from 'react-router-dom';
import StarRateIcon from '@mui/icons-material/StarRate';


const CardItem = ({ props }) => {

  const { title, poster_path, id, vote_average } = props
  const imageUrl = 'https://image.tmdb.org/t/p/w500/' + poster_path

  const [showInfo, setShowInfo] = useState(false);
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    const ids = localStorage.getItem('selected');
    if (ids) {
      const arrIds = JSON.parse(ids)
      setSelectedIds(arrIds)
    }
  }, []);

  const saveMySelected = (id) => {
    const selectedMovies = localStorage.getItem('selected')
    if (selectedMovies) {
      const arr = JSON.parse(selectedMovies)
      if (arr.some(el => el === id)) {
        const removedIds = arr.filter(el => el !== id)
        localStorage.removeItem('selected')
        localStorage.setItem('selected', JSON.stringify(removedIds))
        setSelectedIds(removedIds)
      } else {
        localStorage.setItem('selected', JSON.stringify([...arr, id]))
        setSelectedIds(prev => [...prev, id])
      }
    } else {
      localStorage.setItem('selected', JSON.stringify([id]))
    }
  }

  return (
    <div className="card">
      <div className="card__main" onMouseLeave={() => setShowInfo(false)} onMouseEnter={() => setShowInfo(true)} >
        <Link to={"/detail/" + id}>
          <img src={imageUrl} className="card__img" alt="img" style={{ opacity: showInfo ? '0.3' : '1' }}/>
          <div className="card__detail" style={{ display: showInfo ? 'block': 'none'}} >
            <div className="card__detail__title">{title}</div>
            <div className="card__detail__rating">Рейтинг: <StarRateIcon sx={{color: 'yellow'}}/>{vote_average}</div>
            <p className="card__detail__title"></p>
          </div>
        </Link>
        <span className="card__save">
          {selectedIds && selectedIds.some(selectedId => selectedId === id) 
            ? <BookmarkAddedIcon sx={{ fontSize: 30, color: '#95DEAC' }} onClick={() => saveMySelected(id)} />
            : <BookmarkAddOutlinedIcon sx={{ fontSize: 30, color: '#fff' }} onClick={() => saveMySelected(id)} />
          }
          
          
        </span>
        
      </div>
      
      <div className="card__footer">
        <h5 className='card__name'>{title}</h5>
      </div>
    </div>
  );
}

export default CardItem;


