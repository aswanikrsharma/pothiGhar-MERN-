import React from "react";
import { Link , useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../Store/auth.js";
const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto md:h-[100%]">
      <div className="flex items-center flex-col justify-center">
        {" "}
        <img src={data.avatar} alt="/" className="h-[10vh]" />
        <p className="mt-1 text-normal text-zinc-300">{data.username}</p>
        <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500"></div>
      </div>

      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden md:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Setting
        </Link>
      </div>
      )}
      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden md:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          All Order
        </Link>
        <Link
          to="/profile/add-book"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Add Book
        </Link>
        
      </div>
      )}
      <button
        className="bg-blue-500 py-2 px-4 rounded-md w-3/6 md:w-full font-semibold flex items-center justify-center hover:bg-white hover:text-black"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
