import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BookCard = ({ data, fav }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveFav = async () => {
    const response = await axios.put("https://pothighar-mern-backend.onrender.com/api/remove-favourite-books", {}, {headers});
    alert(response.data.message);
  }
  return (
    <div className="shadow-lg rouded p-4 flex flex-col">
      <Link to={`/book-details/${data._id}`}>
        <div className="">
          <div className=" rounded flex items-center justify-center flex-col">
            <img src={data.url} alt="/" className="h-[30vh]" />
            <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
            <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
            <p className="mt-2 text-black font-semibold text-xl">
              ₹ {data.price}
            </p>
          </div>
        </div>
      </Link>
      {fav && (
        <button
          className="px-4 py-2 rounded border border-pink-500 text-black hover:bg-pink-500 hover:text-white mt-4"
          onClick={handleRemoveFav}>
          Remove
        </button>
      )}
    </div>
  );
};

export default BookCard;
