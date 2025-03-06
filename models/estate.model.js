import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const estateSchema = new Scheme(
    {
        name: { type: String, required: true },


        images: { type: Array, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: false },
        area: { type: Number, required: false },
        bathroom: { type: Number, required: false },
        beds: { type: Number, required: false },
        rating: { type: Number, required: false },
        location: { type: String, required: true },
       




    



    },

);

const estate = mongoose.model("estetes", estateSchema);

export default estate;