import { getPostModel, 
    createPostModel } from '../models/postModel.js';
  
  const getPostController = async (_, res) => {
    try {
      const posts = await getPostModel();
      if (!posts) {
        return res.status(404).send({ message: "This entity does not exist" });
    }
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const createPostController = async (req, res) => {
    try {
      const { title, description, status, product_id } = req.body;
      if (!title || !description || !status || !product_id) {
        return res.status(400).json({ message: "You should enter all the fields" });
    }else{    
      const newPost = await createPostModel(title, description, status, product_id);
      return res.status(200).json(newPost);
    }
    } catch (error) { 
      return res.status(500).json({ message: error.message });
     }
  };
  
  
  export {getPostController, createPostController};