import { getAllPostModel, 
  getUserPostModel,
    createPostModel, 
    updatePostModel,
    deletePostModel } from '../models/postModel.js';
  
  const getAllPost = async (_, res, next) => {
    try {
      const posts = await getAllPostModel();
      if (!posts) {
        return res.status(404).send({ message: "This entity does not exist" });
    }
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  const getUserPost = async (_, res, next) => {
    try {
      const posts = await getUserPostModel();
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

  const updatePostController = async (req, res, next) => {
    try {
      const {id} = req.params;
      if (!id) {
        return res.status(400).json({ message: "Post not found" });
    }
      const updatePost = await updatePostModel(id);
      return res.status(201).json(updatePost);
    } catch (error) {
      next(error);
    }
  }
  

  const deletePostController = async (req, res) => {
    try {
      const {id} = req.params;
      if (!id) {
        return res.status(400).json({ message: "Post not found" });
    }
      const deletePost = await deletePostModel(id);
      return res.status(204).json({ message: "Post deleted" })
    } catch (error) {
      next(error);
    }
  }
  
  export {getAllPost, getUserPost, createPostController, updatePostController, deletePostController};