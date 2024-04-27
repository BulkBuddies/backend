import { getPostModel, 
    createPostModel } from '../models/postModel.js';
  
  const getPostController = async (_, res, next) => {
    try {
      const posts = await getPostModel();
      if (!posts) {
        return res.status(404).send({ message: "This entity does not exist" });
    }
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };
  
  const createPostController = async (req, res, next) => {
    try {
      const { title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible } = req.body;
      if (!title || !created_by || !description || !status || !expiration_date || !unit_price || !url || !img_url || !category_id || !required_stock || !min_contribution || !user_stock || !visible) {
        return res.status(400).json({ message: "You should enter all the fields" });
    }else{    
      const newPost = await createPostModel(title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible);
      return res.status(200).json(newPost);
    }
    } catch (error) { 
      next(error);
     }
  };
  
  
  export {getPostController, createPostController};