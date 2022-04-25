import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  useParams,
} from "react-router-dom";
import './Detail.scss'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';


const Detail = () => {
  const [movie, setMovie] = useState({})
  const { title, backdrop_path, overview, vote_average, vote_count, genres, revenue, production_companies, budget} = movie
  const {id} = useParams()


  useEffect(() => {
    const getMovieDetail = async () => {
      const res = await axios.get(`/3/movie/${id}`, { params: { 'language': 'ru-RU' } })
      setMovie(res.data)
    }
    getMovieDetail()
  }, [id]);



  const imageUrl = 'https://image.tmdb.org/t/p/w500/'

  return (
    <div className='detail container'>
      <section className='section'>
        <div className='section-title'>{title}</div>
        <div style={{ marginBottom: '20px' }}>
          {genres?.length > 0 ? genres.map(el => (
            <Button key={el.id} variant="contained" sx={{ fontSize: '10px', margin: '5px', backgroundColor: '#4D556E ' }}>{el.name}</Button>
          )): null}
        </div>
        <div className='detail__info'>
          <img className='detail__img' src={imageUrl + backdrop_path} alt="movie" />
          <div className='detail__descripton'>
            <div className='detail__rating'>
              <div className='detail__title'>Рейтинг:</div>
              <div className='detail__rating__icon detail__overview'>
                <Rating sx={{marginRight: '8px'}} name="customized-10" value={Number(vote_average)} max={10} readOnly/>
                {vote_average}
              </div>
              <div className='detail__overview'>
                <div className='detail__title'>Бюджет:</div>
                {budget} $
              </div>
              <div className='detail__overview'>
                <div className='detail__title'>Доход:</div>
                {revenue} $
              </div>
              <div className='detail__overview'>
                <div className='detail__title'>Компании:</div>
                {production_companies?.length > 0 ? production_companies.map(el => el.name).join(', ') : null} $
              </div>
            </div>
            <div>
              {vote_count}
            </div>
          </div>
        </div>
        <div className='detail__overview' style={{ fontSize: '16px', marginTop: '20px'}}>
          <div className='detail__title'>Описание:</div>
          {overview}
        </div>
      </section>
      {/* <section className='reviews section'>
        <Paper square sx={{ pb: '50px' }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            Отзыв
          </Typography>
          <List sx={{ mb: 2 }}>
            {messages.map(({ id, primary, secondary, person }) => (
              <React.Fragment key={id}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person} />
                  </ListItemAvatar>
                  <ListItemText primary={primary} secondary={secondary} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </section> */}
    </div>
  );
}

export default Detail;
