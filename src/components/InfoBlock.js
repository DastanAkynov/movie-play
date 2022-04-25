import React from 'react';
import Cinema from '../assets/cinema.png';
import './InfoBlock.scss'

const Infoblock = () => {
  return (
      <div className='container'>
        <div className='info-block' sx={{ color: '#003F65' }}>
          <div className='info-block__text'>
            <div>Смотри любимые</div>
            <div>фильмы вместе</div>
            <div>с нами!</div>
          </div>
         <img className='info-block__img' src={Cinema} alt="cinema"/>
        </div> 
      </div>
    
  );
}

export default Infoblock;
