import mongoose from "mongoose";
import night from "../models/night.model.js";

export const getNightLives = async (req, res) => {
  try {
    const startIndex = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 6;
    const categoryFilter = req.query.category
      ? req.query.category.toLowerCase()
      : "";

    const data = await night.find();
    const totalCount = data.length;

    const filteredData = data
      .filter(
        (night) =>
          !categoryFilter || night.category.toLowerCase() === categoryFilter
      )
      .map(({ _id, name, images, description, rating, reviews, category }) => ({
        _id,
        name,
        images: images.length > 0 ? images[0] : null,
        description,
        rating,
        reviews: reviews.length,
        category,
      }));
    const filteredCount = filteredData.length;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    res.json({
      totalCount,
      filteredCount,
      startIndex,
      limit,
      data: paginatedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при получении Ночных развлечений",
        error: error.message,
      });
  }
};

export const getNightCategories = async (req, res) => {
  try {
    const data = await night.distinct("category");
    res.json(data);
  } catch (error) {
    res.json("error populate");
  }
};
export const getNightLive = async (req, res) => {
 
  
  try {
    const id = req.params.id;

    console.log(98765789);
  
    if (!id) {
      return res.status(400).json({ message: "Не указан ID заведения" });
    }

    const response = await night.findById(id);

    if (!response) {
      return res.status(404).json({ message: "Заведение не найдена" });
    }

    res.json(response); 
  } catch (error) {
    console.error("Ошибка при получении заведения:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
