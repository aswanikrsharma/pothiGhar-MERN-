import express from "express";
import { PORT } from "./src/config/serverConfig.js";
import dbConnect from "./src/config/dbConfig.js";
import userRouter from "./src/routes/UserRouter.js";
import bookRouter from "./src/routes/bookRouter.js";
import favRouter from "./src/routes/favRouter.js";
import cartRouter from "./src/routes/cartRouter.js";
import orderRouter from "./src/routes/orderRouter.js";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Import routes
app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", favRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);


app.listen(PORT, async () => {
  try {
    await dbConnect();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
