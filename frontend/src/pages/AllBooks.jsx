import BookCard from "../components/Bookcard/BookCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/getallbooks"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 h-auto px-12 py-8 ">
      <h4 className="text-3xl text-yellow-300">All books</h4>
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
