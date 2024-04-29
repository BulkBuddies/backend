import { getAllCategories } from "../models/categoryModel.js";


const getAllCategoriesController = async (req, res, next) => {
    try {
      const categories = await getAllCategories();
      res.status(200).json({ categories: categories });
    } catch (error) {
      next(error);
    }
  };
  


  export { getAllCategoriesController }