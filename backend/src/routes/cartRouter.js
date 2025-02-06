import express from "express";
import User from "../Schema/userSchema.js";
import { authenticateToken } from "../validator/tokenValidation.js";

const cartRouter = express.Router();

//create cart
cartRouter.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.status(200).json({ message: "Book already added to cart" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ message: "Book is added to card" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//remove from cart
cartRouter.put(
  "/remove-books-from-cart/:bookid",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;
      await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
      return res.status(200).json({ message: "Book removed from cart" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

//get cart of a particular user
cartRouter.get("/get-user-cart", authenticateToken,async (req, res) => {
try{
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.status(200).json({
        message: "Cart fetched successfully",
        data: cart
    })
}
catch(error){
    console.error(error);
    res.status(500).json({ message: "Server Error" });
}
});

export default cartRouter;



