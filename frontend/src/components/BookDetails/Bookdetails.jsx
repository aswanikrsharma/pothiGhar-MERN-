import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrLanguage } from "react-icons/gr";
import Loader from "../Loader/Loader";
import { FaEdit, FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Bookdetails = () => {
  const navigate = useNavigate() ;
  const { id } = useParams();
  const [Data, setData] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://pothighar-mern-backend.onrender.com/api/getbookbyid/${id}`
      );
      console.log(response)
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFav = async () => {
    const response = await axios.put(
      "https://pothighar-mern-backend.onrender.com/api/mark-favourite-books",
      {},
      { headers }
    );
    alert(response.data.message);
  };

const handleAddToCart = async () => {
  const response = await axios.put(
    "https://pothighar-mern-backend.onrender.com/api/add-to-cart",
    {},
    { headers }
  );
  alert(response.data.message);
}

const deleteBook = async (bookid) => {
  try {
    const response = await axios.delete(
      `https://pothighar-mern-backend.onrender.com/api/deletebook`,
      {
        headers,
        data: { bookid }, // Send bookid in the request body
      }
    );
    alert(response.data.message);
    navigate("/all-books");
  } catch (error) {
    alert(error.response?.data?.message || "Error deleting the book");
  }
};


  return (
    <>
      {Data && (
        <div className=" px-4 md:px-12 py-8 flex flex-col md:flex-row gap-8 items-start shadow-md">
          <div className="w-full md:w-3/6">
            {" "}
            <div className=" flex flex-col md:flex-row justify-around shadow-lg p-12 rounded  md:gap-8">
              {" "}
              <img
                src={Data.url}
                className="h-[50vh] md:h-[60vh] lg:[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row items-center justify-between md:justify-start lg:flex-col mt-8 md:mt-0">
                  <button
                    className="bg-blue-500 rounded md:rounded-full text-3xl md:3xl p-2 text-red-500 flex items-center justify-center "
                    onClick={handleFav}>
                    <FaHeart />{" "}
                    <span className="ms-4 block md:hidden text-white">
                      Add to Fav
                    </span>
                  </button>
                  <button className="text-white rounded mt-8 md:mt-0 lg:mt-8 md:rounded-full text-3xl p-2 bg-blue-500 flex items-center justify-center" onClick={handleAddToCart}>
                    <FaShoppingCart />{" "}
                    <span className="ms-4 block md:hidden">Add to Cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-row md:flex-col items-center justify-around md:justify-start lg:flex-col mt-8 md:mt-0">
                  <Link to={`/updatebook/${id}`} className="bg-white rounded md:rounded-full text-3xl p-2 text-black flex items-center justify-center ">
                    <FaEdit />{" "}
                  </Link>
                  <button className="text-red-500 rounded  lg:mt-8 md:rounded-full text-3xl p-2 bg-white flex items-center justify-center" onClick={()=>deleteBook(Data?._id)}>
                    <MdOutlineDeleteOutline />{" "}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full md:w-3/6">
            <h1 className="text-4xl text-black font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-500 mt-1">by {Data.author}</p>
            <p className="text-zinc-400 mt-4 text-xl">{Data.description}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-500">
              <GrLanguage className="me-3" />
              {Data.language}
            </p>
            <p className="text-black mt-4 text-3xl font-semibold">
              ₹ {Data.price}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen flex items-center justify-center">
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default Bookdetails;
