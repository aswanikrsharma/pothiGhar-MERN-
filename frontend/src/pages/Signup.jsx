import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate()
  const change = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const submit = async () => {
    try {
      if (
        values.username === "" ||
        values.password === "" ||
        values.email === "" ||
        values.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post("https://pothighar-mern-backend.onrender.com/api/signup", values);
        alert(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="h-auto shadow-md px-12 py-8 flex items-center justify-center">
        <div className="shadow-md rounded-lg px-8 py-5 w-full md:w-3/6">
          <p className="text-pink-500 text-2xl text-center">Sign Up</p>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-black">
                Username
              </label>
              <input
                type="text"
                className="w-full mt-2 shadow-sm text-zinc-100 p-2 outline-none"
                placeholder="Enter full name"
                name="username"
                value={values.username}
                onChange={change}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-black">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-2 shadow-sm text-zinc-100 p-2 outline-none"
                placeholder="Enter email address"
                name="email"
                value={values.email}
                onChange={change}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-black">
                password
              </label>
              <input
                type="password"
                className="w-full mt-2 shadow-sm text-zinc-100 p-2 outline-none"
                placeholder="Enter password"
                name="password"
                value={values.password}
                onChange={change}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-black">
                Address
              </label>
              <textarea
                type="text"
                className="w-full mt-2 shadow-sm text-zinc-100 p-2 outline-none"
                placeholder="Enter address here..."
                name="address"
                value={values.address}
                onChange={change}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 rounded-md w-full py-2 text-2xl font-semibold text-white hover:text-black hover:bg-white border border-blue-500 transition-all duration-300"
              onClick={submit}>
              Signup
            </button>
          </div>
          <div className="mt-4 text-black">
            Already have an account?
            <Link className="text-blue-600 underline" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
