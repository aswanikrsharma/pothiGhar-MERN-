import React, { useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
const Navbar = () => {
  const links = [
    {
      Link: "/",
      title: "Home",
    },
    {
      Link: "/all-books",
      title: "All Books",
    },
    {
      Link: "/cart",
      title: "Cart",
    },
    {
      Link: "/profile",
      title: "Profile",
    },
    {
      Link: "/profile",
      title: "Admin Profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if(isLoggedIn == true && role === "user"){
    links.splice(4,1);
  }
  if(isLoggedIn == true && role === "admin"){
    links.splice(2,2);
  }
  const [open, setOpen] = useState("hidden");

  return (
    <>
      <nav className="relative flex items-center justify-between text-black px-8 py-4 z-50 shadow-md">
        <Link to="/" className="flex items-center">
          <GiBookshelf className="size-10 text-pink-500" />
          <h1 className="text-2xl ml-2 font-bold text-pink-500">PothiGhar</h1>
        </Link>
        <div className="nav-links-pothighar block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center">
                {items.title === "Profile" || items.title === "Admin Profile" ? (
                  <Link
                key={i}
                to={items.Link}
                className="px-4 py-1 border border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300">
                {items.title}
              </Link>) : (<Link
                key={i}
                to={items.Link}
                className="hover:text-pink-500 transition-all duration-300">
                {items.title}
              </Link>)
                }
              </div>
            ))}
          </div>
          {
            isLoggedIn === false && (
              <>
              <div className="hidden md:flex gap-4">
            <Link
              to="/login"
              className="px-4 py-1 border border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 text-white border border-pink-500  bg-pink-500 rounded hover:bg-white hover:text-black transition-all duration-300">
              SignUp
            </Link>
          </div>
              </>
            )
          }
          <button>
            <FiMenu
              className="md:hidden text-black text-2xl hover:text-3xl"
              onClick={() =>
                open === "hidden" ? setOpen("block") : setOpen("hidden")
              }
            />
          </button>
        </div>
      </nav>
      <div
        className={`${open} bg-white h-screen absolute top-8 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((items, i) => (
          <Link
            key={i}
            to={items.Link}
            className={`${open} text-black text-4xl mb-8 font-semibold hover:text-pink-500 transition-all duration-300`}
            onClick={() =>
              open === "hidden" ? setOpen("block") : setOpen("hidden")
            }>
            {items.title}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="/login"
              className={`${open} px-8 mb-8 text-3xl font-semibold text-black  py-2 border border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300`}
              onClick={() =>
                open === "hidden" ? setOpen("block") : setOpen("hidden")
              }>
              Login
            </Link>
            <Link
              to="/signup"
              className={`${open} px-8 mb-8 text-3xl font-semibold py-2 text-white bg-pink-500 border border-pink-500 rounded hover:bg-white hover:text-black transition-all duration-300`}
              onClick={() =>
                open === "hidden" ? setOpen("block") : setOpen("hidden")
              }>
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
