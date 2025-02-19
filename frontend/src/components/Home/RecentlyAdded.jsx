import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from '../Bookcard/BookCard.jsx';
import Loader from '../Loader/Loader.jsx'
const RecentlyAdded = () => {
  const [Data, setData] = useState();
  useEffect(() =>{
    const fetch = async () => {
      const response = await axios.get("https://pothighar-mern-backend.onrender.com/api/getrecentbooks");
      setData(response.data.data);
    }
    fetch();
  }, []);
  return (
    <div className='mt-8 px-4'>
    <h4 className='text-4xl text-pink-500'>Recently added books</h4>
    {!Data && (
      <div className='flex items-center justify-center my-8'>
        <Loader />
      </div>
    )}
    <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
    {Data && Data.map((items,i)=>(
      <div key={i}><BookCard data={items}/></div>
    ))}
    </div>
    </div>
  )
}

export default RecentlyAdded
