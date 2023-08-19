import mongoose from "mongoose";
const OfferSchema = new mongoose.Schema(
  {
    image: {
      public_id: String,
      url: String,
    },
    expiryDate: { type: String, required: true },
    previousFile: {
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      buffer: Array,
    },
    isUpdate: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Offer = mongoose.model("Offer", OfferSchema);
export default Offer;
