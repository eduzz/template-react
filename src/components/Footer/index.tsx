import React from 'react';

const eduzinho = require('assets/img/eduzinho.png');
const styles = require('./styles.css');

const footer = () => (
  <footer className={styles.component}>
    <span>Tecnologia desenvolvida pela</span>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='logo-footer'
      viewBox='0 0 260 82'
    >
      <g fill='none' fillRule='evenodd'>
        <path
          className='yellow'
          fill='#FFCD2B'
          d='M41,0.8 C63.3,0.8 81.3,18.9 81.3,41.1 C81.3,63.3 63.2,81.4 41,81.4 C18.7,81.4 0.7,63.3 0.7,41.1 C0.7,18.9 18.7,0.8 41,0.8'
        />
        <path
          className='blue blue-logo'
          fill='#1F3255'
          d='M53.2,21.6 L22.1,21.6 L22.1,18.8 L53.2,18.8 C56.9,18.8 60,21.8 60,25.6 C60,29.3 57,32.4 53.2,32.4 L22.1,32.4 L22.1,29.6 L53.2,29.6 C55.4,29.6 57.1,27.8 57.1,25.7 C57.1,23.6 55.3,21.6 53.2,21.6 L53.2,21.6 Z M47.5,37.2 L22.1,37.2 L22.1,34.4 L47.5,34.4 C51.2,34.4 54.3,37.4 54.3,41.2 C54.3,44.9 51.3,48 47.5,48 L22.1,48 L22.1,45.2 L47.5,45.2 C49.7,45.2 51.4,43.4 51.4,41.3 C51.4,39 49.6,37.2 47.5,37.2 Z M53.2,52.9 L22.1,52.9 L22.1,50.1 L53.2,50.1 C56.9,50.1 60,53.1 60,56.9 C60,60.6 57,63.7 53.2,63.7 L22.1,63.7 L22.1,60.9 L53.2,60.9 C55.4,60.9 57.1,59.1 57.1,57 C57.1,54.7 55.3,52.9 53.2,52.9 Z'
        />
        <g
          className='blue'
          fill='#002B5C'
          fillRule='nonzero'
          transform='translate(92 4)'
        >
          <path d='M6.6 40.3C6.9 45.9 8.3 50.1 10.8 52.8 13.3 55.5 16 56.8 19.1 56.8 21.5 56.8 23.6 56.2 25.5 54.9 27.3 53.6 28.9 51.9 30.3 49.7 30.6 49.2 30.9 48.7 31.1 48.4 31.3 48.1 31.5 47.8 31.6 47.7 31.8 47.6 31.9 47.5 32.1 47.5 32.3 47.4 32.4 47.4 32.7 47.4 32.8 47.4 32.9 47.4 33 47.4 33.1 47.4 33.2 47.5 33.4 47.5 33.6 47.6 33.8 47.8 34 48.1 34.2 48.4 34.3 48.8 34.3 49.3 34.3 49.8 34.1 50.7 33.7 52 33.3 53.3 32.6 54.7 31.6 56.2 30.4 58 28.7 59.6 26.6 61.1 24.4 62.6 21.6 63.3 18.2 63.3 17.3 63.3 16.3 63.2 15.4 63.1 14.4 63 13.4 62.7 12.4 62.4 10.7 61.8 9 60.9 7.4 59.5 5.8 58.2 4.4 56.3 3.2 54 2.8 53.2 2.4 52.3 2.1 51.5 1.8 50.6 1.5 49.7 1.3 48.9 1 47.7.8 46.4.7 45.2.6 44 .5 42.8.5 41.7.5 38.8.8 36.3 1.3 34.2 1.8 32.1 2.5 30.3 3.3 28.8 3.5 28.4 3.9 27.8 4.4 27 4.9 26.2 5.6 25.4 6.5 24.5 7.7 23.3 9.2 22.2 11.1 21.3 13 20.3 15.4 19.8 18.2 19.8 22 19.8 24.9 20.6 27 22.2 29.1 23.8 30.7 25.5 31.7 27.5 32.5 28.8 33 30.1 33.2 31.3 33.5 32.5 33.6 33.5 33.6 34.2 33.6 35.1 33.4 35.7 33.1 36 32.8 36.3 32.4 36.5 32 36.6 31.8 36.7 31.7 36.7 31.6 36.7 31.5 36.7 31.4 36.7 31.3 36.7L6.6 40.3zM25.9 33.3C25.7 30.7 24.8 28.6 23.2 26.8 21.6 25.1 19.6 24.2 17.3 24.2 14 24.2 11.5 25.3 9.8 27.6 8.1 29.9 7 32.7 6.6 36.2L25.9 33.3zM70.9 53.9C70.9 54.3 70.9 54.7 70.9 55 70.9 55.4 70.8 55.8 70.7 56.1 70.6 56.5 70.5 56.9 70.4 57.2 70.2 57.6 70 58 69.8 58.3 69 59.4 67.8 60.3 66.3 61 64.8 61.7 63.1 62.2 61.4 62.5 60.2 62.8 59 63 57.9 63.1 56.7 63.2 55.7 63.3 54.9 63.3 49.2 63.3 44.6 61.6 41.2 58.1 37.7 54.6 36 49.5 36 42.9 36 42.5 36 42 36 41.6 36 41.1 36.1 40.7 36.1 40.3 36.5 35.2 38.3 30.5 41.5 26.2 44.7 21.9 49.1 19.8 54.9 19.8 56.9 19.8 58.5 20.1 59.9 20.6 61.2 21.1 62.4 21.7 63.4 22.3 63.5 22.4 63.5 22.4 63.6 22.4 63.7 22.4 63.7 22.5 63.8 22.5L63.8 2.7C63.8 2.1 63.9 1.6 64 1.3 64.2 1 64.6.9 65.3.9L69.4.9C70 .9 70.4 1 70.6 1.1 70.8 1.3 71 1.6 71 2.2 71 2.3 71 2.3 71 2.3 71 2.3 71 2.4 71 2.4L71 53.9 70.9 53.9zM63.6 26.9C63.4 26.8 63.3 26.7 63.1 26.5 62.9 26.4 62.8 26.2 62.6 26.1 61.8 25.6 60.9 25.1 59.9 24.6 58.8 24.1 57.5 23.9 55.9 23.9 52.2 23.9 49.1 25.5 46.8 28.7 44.4 31.9 43.2 36 43.2 40.9 43.2 46.5 44.5 50.8 47 53.8 49.5 56.8 52.7 58.4 56.6 58.4 59.1 58.4 60.8 58 61.7 57.1 62.6 56.3 63.2 55.3 63.5 54.3 63.6 53.9 63.7 53.5 63.7 53.1 63.7 52.7 63.7 52.3 63.7 52L63.7 26.9 63.6 26.9zM108.1 52.4C108 54.4 107.9 56 107.5 57.3 107.2 58.6 106.2 59.7 104.7 60.6 104.4 60.7 104 60.9 103.5 61.1 103 61.3 102.3 61.6 101.5 61.9 100.3 62.3 98.9 62.6 97.2 62.9 95.5 63.2 93.6 63.3 91.4 63.3 88.3 63.3 85.9 63 84.2 62.4 82.5 61.8 81.2 61.2 80.2 60.5 80.1 60.4 80.1 60.4 80 60.4 79.9 60.4 79.9 60.3 79.8 60.3 78.3 59.1 77.3 57.7 76.8 56.1 76.3 54.5 76.1 52.7 76.1 50.7L76.1 22.2C76.1 21.7 76.2 21.3 76.4 21.1 76.6 20.9 77 20.8 77.6 20.8L81.8 20.8C82.4 20.8 82.8 20.9 83.1 21 83.3 21.2 83.5 21.6 83.5 22.3L83.5 49C83.5 49.5 83.5 50 83.5 50.5 83.5 51 83.6 51.6 83.7 52.2 83.9 53.8 84.6 55.2 85.8 56.6 87 57.9 89.2 58.6 92.5 58.6 96 58.6 98.2 57.9 99.2 56.5 100.2 55.1 100.7 53.5 100.8 51.8 100.8 51.5 100.8 51.2 100.8 50.9 100.8 50.6 100.8 50.3 100.8 50L100.8 22.4C100.8 22 100.9 21.6 101 21.3 101.1 21 101.4 20.8 101.8 20.8 101.9 20.7 102.2 20.7 102.8 20.7 103.3 20.7 103.9 20.7 104.6 20.7 104.9 20.7 105.2 20.7 105.5 20.7 105.8 20.7 106 20.7 106.3 20.7 106.9 20.7 107.4 20.8 107.6 21 107.8 21.2 108 21.6 108 22.2L108 52.4 108.1 52.4zM120.2 58L137.9 58C138 58 138 58 138.1 58 138.2 58 138.2 58 138.3 58 138.5 58.1 138.7 58.2 138.9 58.3 139.1 58.4 139.1 58.7 139.1 59.1L139.1 61.4C139.1 61.9 139 62.2 138.7 62.3 138.5 62.4 138.1 62.4 137.7 62.4L112.1 62.4 112 62.4C111.9 62.4 111.9 62.4 111.8 62.4 111.7 62.4 111.7 62.4 111.6 62.4 111.4 62.4 111.2 62.3 111 62.2 110.8 62.1 110.8 61.9 110.8 61.6 110.8 61.5 110.8 61.5 110.8 61.4 110.8 61.3 110.8 61.2 110.9 61 111 60.8 111.1 60.5 111.3 60.1L129.9 25.1 113.5 25.1C113.2 25.1 113 25.1 112.8 25.1 112.6 25.1 112.4 25 112.3 24.9 112.2 24.8 112.1 24.5 112.1 24.1 112 23.7 112 23.3 112 22.9 112 22.7 112 22.6 112 22.4 112 22.2 112 22 112 21.9 112 21.4 112.1 21 112.3 20.9 112.5 20.8 112.8 20.7 113.3 20.7 113.4 20.7 113.4 20.7 113.4 20.7 113.4 20.7 113.5 20.7 113.5 20.7L137.4 20.7C137.5 20.7 137.6 20.7 137.7 20.7 137.8 20.7 137.9 20.7 138 20.8 138.2 20.8 138.4 20.9 138.6 21 138.8 21.1 138.9 21.4 138.9 21.7L138.9 21.8C138.9 21.9 138.9 22 138.8 22.2 138.7 22.4 138.6 22.7 138.3 23.2L120.2 58zM148.9 58L166.6 58C166.7 58 166.7 58 166.8 58 166.9 58 166.9 58 167 58 167.2 58.1 167.4 58.2 167.6 58.3 167.8 58.4 167.8 58.7 167.8 59.1L167.8 61.4C167.8 61.9 167.7 62.2 167.4 62.3 167.2 62.4 166.8 62.4 166.4 62.4L140.8 62.4 140.7 62.4C140.6 62.4 140.6 62.4 140.5 62.4 140.4 62.4 140.3 62.4 140.3 62.4 140.1 62.4 139.9 62.3 139.7 62.2 139.5 62.1 139.5 61.9 139.5 61.6 139.5 61.5 139.5 61.5 139.5 61.4 139.5 61.3 139.5 61.2 139.6 61 139.7 60.8 139.8 60.5 140 60.1L158.6 25.1 142.2 25.1C141.9 25.1 141.7 25.1 141.5 25.1 141.3 25.1 141.1 25 141 24.9 140.9 24.8 140.8 24.5 140.8 24.1 140.7 23.7 140.7 23.3 140.7 22.9 140.7 22.7 140.7 22.6 140.7 22.4 140.7 22.2 140.7 22 140.7 21.9 140.7 21.4 140.8 21 141 20.9 141.2 20.8 141.5 20.7 142 20.7 142.1 20.7 142.1 20.7 142.1 20.7 142.1 20.7 142.2 20.7 142.2 20.7L166.1 20.7C166.2 20.7 166.3 20.7 166.4 20.7 166.5 20.7 166.6 20.7 166.7 20.8 166.9 20.8 167.1 20.9 167.3 21 167.5 21.1 167.6 21.4 167.6 21.7L167.6 21.8C167.6 21.9 167.6 22 167.5 22.2 167.4 22.4 167.3 22.7 167 23.2L148.9 58z' />
        </g>
      </g>
    </svg>
    <img src={eduzinho} alt='Eduzz' className='avatar' />
  </footer>
);

export default footer;
