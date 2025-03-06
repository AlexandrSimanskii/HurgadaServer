import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const excursionSchema = new Scheme(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        images: { type: Array, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        "full descriptions": { type: String, required: true },
        duration: { type: String, required: true },
        group: { type: String, required: true },
        reviews: { type: Array, required: false },
        rating: { type: Number, required: false },
        location: { type: String, required: true },
        "important information": { type: Array, required: false },
        program: { type: Array, required: true }

    },

);

const excursion = mongoose.model("excursion", excursionSchema);

export default excursion;