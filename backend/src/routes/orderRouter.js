import express from "express";
import { authenticateToken } from "../validator/tokenValidation.js";
import Order from "../Schema/orderSchema.js";
import User from "../Schema/userSchema.js";
import mongoose from "mongoose";

const orderRouter = express.Router();

//place order
orderRouter.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      //saving order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      //clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res
      .status(201)
      .json({ message: "Order placed successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//get order history of particular user

orderRouter.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderData = userData.orders.reverse();
    return res.status(200).json({ data: orderData, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//get all orders for admin
orderRouter.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userdata = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: userdata, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//update order status

orderRouter.put("/update-order-status", authenticateToken, async (req, res) => {
  try {
    const orderId  = new mongoose.Types.ObjectId(req.body.id);
    console.log(orderId);
    console.log("Status checking", req.body.Values.status);
    await Order.findByIdAndUpdate(orderId, {
        status: req.body.Values.status

    });
    return res.status(200).json({ message: "Status updated successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default orderRouter;
