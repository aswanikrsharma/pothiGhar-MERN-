import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const UpdateBook = () => {
    
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: "",
      })
      
      const {id} = useParams();
      const navigate = useNavigate();
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      }
    
      const change = (e) => {
        setData({...Data, [e.target.name]: e.target.value });
      };
    
      const submit = async () => {
        try {
          if(
            Data.url === "" ||
            Data.title === "" ||
            Data.author === "" ||
            Data.price === "" ||
            Data.description === "" ||
            Data.language === ""
          ){
            alert("All fields are required");
          }
          else{
              const response = await axios.put(
                "https://pothighar-mern-backend.onrender.com/api/updatebook", Data, {headers}
              );
              setData({
                  url: "",
                  title: "",
                  author: "",
                  price: "",
                  description: "",
                  language: "",
              });
              alert(response.data.message);
              navigate(`/book-details/${id}`)
          }
        }
        catch (error) {
          alert(error.response.data.message)
        }
      };

      useEffect(() => {
        const fetch = async () => {
          const response = await axios.get(
            `https://pothighar-mern-backend.onrender.com/api/getbookbyid/${id}`
          );
          setData(response.data.data);
        };
        fetch();
      }, []);
  return (
    <div className='bg-zinc-900 h-[100%] p-0 md:p-4'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Update Book</h1>
    <div className='p-4 bg-zinc-800 rounded'>
      <div>
        <label htmlFor="" className='text-zinc-400'>Image</label>
        <input type="text"
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='url of image'
        name='url'
        required
        value={Data.url}
        onChange={change}
         />
      </div>
      <div>
        <label htmlFor="" className='text-zinc-400'>Title of book</label>
        <input type="text"
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='title of book'
        name='title'
        required
        value={Data.title}
        onChange={change}
         />
      </div>
      <div>
        <label htmlFor="" className='text-zinc-400'>Author of book</label>
        <input type="text"
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='author of book'
        name='author'
        required
        value={Data.author}
        onChange={change}
         />
      </div>
      <div className='mt-4 flex gap-4'>
      <div className='w-3/6'>
        <label htmlFor="" className='text-zinc-400'>Price</label>
        <input type="number"
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='price'
        name='price'
        required
        value={Data.price}
        onChange={change}
         />
      </div>
      <div className='3/6'>
        <label htmlFor="" className='text-zinc-400'>Language</label>
        <input type="text"
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='language'
        name='language'
        required
        value={Data.language}
        onChange={change}
         />
      </div>
      </div>
      <div>
        <label htmlFor="" className='text-zinc-400'>Description</label>
        <textarea type="text"
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='description of book'
        name='description'
        required
        value={Data.description}
        onChange={change}
         />
      </div>
      <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={submit}>Update Book</button>
    </div>
      
    </div>
  )
}

export default UpdateBook
