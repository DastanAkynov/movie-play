import React from 'react';
import './Footer.scss'
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <section className='footer'>
      <div className='container section'>
        <h1 className='footer-name'>Movie Play</h1>
        
        <div style={{border: '0.1px solid white', opacity: '0.2', marginTop: '50px'}}></div>
        <div className='footer-media'>
          <TelegramIcon sx={{ fontSize: '38px' }} />
          <InstagramIcon sx={{ fontSize: '38px', marginX: '12px'}}/>
          <FacebookIcon sx={{ fontSize: '38px' }}/>
        </div>
      </div>
    </section>
  );
}

export default Footer;
