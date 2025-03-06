import mongoose from "mongoose";
import estate from "../models/estate.model.js";

export const getEstate = async (req, res) => {
  try {
    const data = await estate.find();

    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
