import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [1, "username should contain atleast 3 characters"],
      maxlength: [50, "username should not exceed 50 characters"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "password must be at least 6 characters long"],
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/552/552721.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favourites: [{
      type: mongoose.Types.ObjectId,
      ref: "books",
    }],
    cart:[ {
      type: mongoose.Types.ObjectId,
      ref: "books",
    }],
    orders: [{
      type: mongoose.Types.ObjectId,
      ref: "orders",
    }],
  },
  { timestamps: true }
);

//hashing using pre-save middleware

userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("users", userSchema);

export default User;
