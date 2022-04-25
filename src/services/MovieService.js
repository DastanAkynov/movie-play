import { useState } from 'react';

export const MovieService = () => {
  const [searchList, setSearchList] = useState([]);

  return { 
    searchList, 
    setSearchList
  }
}


