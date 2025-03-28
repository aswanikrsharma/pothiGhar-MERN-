import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
const Setting = () => {
  const [value, setValue] = useState();
  const [ProfileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://pothighar-mern-backend.onrender.com/api/getuserinformation",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const change = (e) => {
    setValue({...value, [e.target.name]: e.target.value });
  };

  const submitAddress = async (e) => {
    const response = await axios.put("https://pothighar-mern-backend.onrender.com/api/updateaddress", value, {headers});
    alert(response.data.message);
  }
  return (
    <>
      {!ProfileData && (
        <div className="flex items-center justify-center h-[100%]">
          {" "}
          <Loader />
        </div>
      )}
      {ProfileData && (
        <div className="h-[100%] p-0 md:p-4 text-black">
          <h1 className="text-3xl md:text:5xl font-semibold text-pink-500 mb-8">
            Setting
          </h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor=""> Username</label>
              <p className="p-2 rounded shadow-lg mt-2 font-semibold">
                {ProfileData.username}
              </p>
            </div>
            <div className="">
              <label htmlFor=""> Email</label>
              <p className="p-2 rounded shadow-lg mt-2 font-semibold">
                {ProfileData.email}
              </p>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" > Address</label>
              <textarea
                className="p-2 rounded shadow-lg mt-2 font-semibold "
                rows="5"
                placeholder="Address"
                name="address"
                value={value.address}
                onChange={change}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400" onClick={submitAddress}>Update</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
