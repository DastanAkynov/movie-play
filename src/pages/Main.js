import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Pagination } from '@mui/material'
import './Main.scss'

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';

const Main = () => {
  const baseCategory = { code: 'popular', title: 'Популярные' }
  const categories = [
    { code: 'popular', title: 'Популярные' },
    { code: 'top_rated', title: 'Топ по рейтингу' },
    { code: 'upcoming', title: 'Премьеры' },
    { code: 'now_playing', title: 'Смотрят щас' },
  ]

  const [popularList, setPopularList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCarrentPage] = useState(1)
  const [category, setCategory] = useState(baseCategory)
  
  useEffect(() => {
    const getPopularData = async (page) => {
    try {
      const res = await axios.get(`/3/movie/${category.code}`, { params: { 'language': 'ru-RU', page } })
      setPopularList(res.data.results || [])
      setTotalPages(res.data.total_pages)
    } catch (err) {
      console.log(err)
    }
  }
    getPopularData(currentPage)
    getGenresData()
  }, [currentPage, category]);



  const getGenresData = async () => {
    try {
      const res = await axios.get(`/3/genre/movie/list`, { params: { 'language': 'ru-RU' } })
      setGenresList(res.data.genres)
    } catch (err) {
      console.log(err)
    }
  }

  const selectCategory = (e) => {
    setCategory(e.target.value || baseCategory)
  }

  


  return (
    <div className="section main">
      <div className="container">
        <Box sx={{ maxWidth: 200, margin: '0 auto 20px' }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={category}
              renderValue={el => el.title}
              onChange={selectCategory}
            > 
              {categories.map(el => (
                <MenuItem key={el.code} value={el}>{el.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <div style={{marginBottom: '20px'}}>
          {genresList.map(el => (
            <Button key={el.id} variant="contained" sx={{ fontSize: '10px', margin: '5px', backgroundColor: '#4D556E '}}>{el.name}</Button>
          ))}
        </div>

        <h1 className="section__title">{category.title}</h1>
        <ul className='cards'>
          {
            popularList.map(el => (
              <li key={el.id}>
                <Card props={el} />
              </li>
              
            ))
          }
        </ul>
        <Pagination 
          className='pagination' 
          count={totalPages} 
          page={currentPage} 
          color="primary" 
          onChange={(e, value) => setCarrentPage(value)} 
        /> 
      </div>
    </div>
  );
}

export default Main;
