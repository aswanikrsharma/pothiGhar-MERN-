import BookCard from "../components/Bookcard/BookCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://pothighar-mern-backend.onrender.com/api/getallbooks"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className=" h-auto px-12 py-8 shadow-md">
      <h4 className="text-3xl text-pink-500">All books</h4>
      {!Data && (
        <div className="h-[100%] flex items-center justify-center"><Loader /></div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
