import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AllOrders from "./pages/AllOrders";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Bookdetails from "./components/BookDetails/Bookdetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/auth";
import { useEffect } from "react";
import Favourite from "./components/Profile/Favourite";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Setting from "./components/Profile/Setting";
import UpdateBook from "./pages/UpdateBook";


function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[])
  return (
    <>
      <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route  path="/all-books" element={<AllBooks/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/profile" element={<Profile/>}>
              {role === "user" ? 
              (<Route index element={<Favourite/>}/>):(<Route index element={<AllOrders/>}/>)
              }
              {role === "admin" && (<Route path="/profile/add-book" element={<AddBook/>}/>)}
              <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
              <Route path="/profile/settings" element={<Setting/>}/>
            </Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/updatebook/:id" element={<UpdateBook/>} />
            <Route path="/book-details/:id" element={<Bookdetails/>} />
          </Routes>
          <Footer />
      </div>
    </>
  );
}

export default App;
