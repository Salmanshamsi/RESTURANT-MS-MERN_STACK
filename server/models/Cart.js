import mongoose from "mongoose";
const CartSchema = new mongoose.Schema(
  {
    dishName: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId },
    quantity: { type: Number, required: true },
    dishPrice: { type: Number, required: true },
  },
  { timestamps: true }
);
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
