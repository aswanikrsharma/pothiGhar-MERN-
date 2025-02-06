import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-3/6 flex flex-col items-center md:items-start justify-center">
        <h1 className=" text-4xl md:text-6xl font-semibold text-center text-yellow-100 md:text-left">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-xl text-zinc-300 md:text-left text-center">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="tex-yellow-100 text-xl md:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full md:w-3/6 mt-10 h-auto md:h-[100%] flex items-center justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2024/04/19/12/13/ai-generated-8706226_640.png"
          alt="books pic"
        />
      </div>
    </div>
  );
};

export default Hero;
