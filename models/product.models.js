import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sort: { type: String, required: true },

  price: { type: Number, required: true },

  with: { type: Number, required: true },
  deep: { type: Number, required: true },
  height: { type: Number, required: true },
  rating: { type: Number, required: true },
  sale: { type: Number, required: true },

  description: {
    type: String,
    required: true,
  },
  image: { type: String, required: true },
});

const Products = mongoose.model("Products", productSchema);

export default Products;
