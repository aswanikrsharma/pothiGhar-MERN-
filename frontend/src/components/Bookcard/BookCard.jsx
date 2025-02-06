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
    const response = await axios.put("http://localhost:3000/api/remove-favourite-books", {}, {headers});
    alert(response.data.message);
  }
  return (
    <div className="bg-zinc-800 rouded p-4 flex flex-col">
      <Link to={`/book-details/${data._id}`}>
        <div className="">
          <div className="bg-zinc-800 rounded flex items-center justify-center flex-col">
            <img src={data.url} alt="/" className="h-[30vh]" />
            <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
            <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
            <p className="mt-2 text-zinc-200 font-semibold text-xl">
              ₹ {data.price}
            </p>
          </div>
        </div>
      </Link>
      {fav && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveFav}>
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
