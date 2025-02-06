import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../Bookcard/BookCard.jsx";
const Favourite = () => {
  const [fav, setFav] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const fetch = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/get-all-favourite-books",
      { headers }
    );
    setFav(response.data.data);
  };
  useEffect(() => {  
    fetch();
  }, []);
  return (
    <>
    {
      fav && fav.length === 0 && (
        <div className="text-center">No Favourite Books Found</div>
      )
    }
      <div className="grid grid-cols-4 gap-4">
        {fav &&
          fav.map((items, i) => (
            <div key={i}>
              <BookCard data={items} fav={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourite;
