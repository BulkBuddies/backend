import { createNewError } from "../helpers/requestError.js";
import {
  getAllPostModel,
  getUserPostModel,
  createPostModel,
  getItemDataFromPostById,
  getUserDataById,
  updatePostModel,
  getLogByPostId,
  getLogByUsertId,
  softDeletePostModel,
  getPostById,
  getCategoryNameById,
  getPostCategoryId,
  getRequiredStockPostId,
  updateUserStockById,
} from "../models/postModel.js";
import { findUserBy } from "../models/userModel.js";

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

const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findUserBy("id", id);
    if (!user) {
      throw createNewError("auth_01");
    }
    const posts = await getUserPostModel(id);
    const { id: userId, email, username } = user;
    return res
      .status(200)
      .json({ userData: { userId, email, username }, posts: posts });
  } catch (error) {
    next(error);
  }
};

const getPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await getPostById(id);
    if (!posts) {
      throw createNewError("post_1");
    }
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getLogByPostIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const logs = await getLogByPostId(id);

    if (logs.length === 0) {
      return res.status(404).send({ message: "This entity does not exist" });
    }
    const itemData = await getItemDataFromPostById(id);
    const post_id = itemData.id;
    const title = itemData.title;
    const description = itemData.description;

    return res
      .status(200)
      .json({ itemData: { post_id, title, description }, logs: logs });
  } catch (error) {
    next(error);
  }
};

const getLogByUserIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const logs = await getLogByUsertId(id);
    if (logs.length === 0) {
      return res
        .status(404)
        .send({ message: "This user don't register any log." });
    }
    const userData = await getUserDataById(id);
    const user_id = userData.id;
    const email = userData.email;
    const username = userData.username;

    return res
      .status(200)
      .json({ userData: { user_id, email, username }, logs: logs });
  } catch (error) {
    next(error);
  }
};

const getAllPostByCategoryId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await getPostCategoryId(id);

    if (posts.length === 0) {
      return res.status(404).send({ message: "Theres no post in this category" });
    }
    const categoryData = await getCategoryNameById(id);    
    const category = categoryData.name;

    return res
      .status(200)
      .json({ categoryData: { category }, posts: posts });
  } catch (error) {
    next(error);
  }
};


const createPostController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      expiration_date,
      unit_price,
      url,
      img_url,
      category_id,
      required_stock,
      min_contribution,
      user_stock,
    } = req.body;

    const created_by = req.token.id;

    const newPost = await createPostModel(
      title,
      created_by,
      description,
      expiration_date,
      unit_price,
      url,
      img_url,
      category_id,
      required_stock,
      min_contribution,
      user_stock
    );
    return res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};

const updatePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post) {
      throw createNewError("post_1");
    }
    const newData = req.body;
    const updatePost = await updatePostModel(id, newData);
    return res
      .status(201)
      .json({ message: "Post actualizado correctamente", post: updatePost });
  } catch (error) {
    next(error);
  }
};

const updateUserStockController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, user_contribution } = req.body;
    const user_contribution_parse = parseInt(user_contribution);

    const post = await getPostById(id);
    if (!post) {
      return res.status(404).send({ message: "This Post Id does not exists." });
    }
    const stocks = await getRequiredStockPostId(id);
    const min_contribution = stocks.min_contribution;

    if (user_contribution_parse < min_contribution) {
      return res.status(400).send({
        message: "user_contribution cannot be less than the min_contribution",
      });
    }

    const updateStockPost = await updateUserStockById(
      id,
      user_contribution,
      user_id
    );
    return res.status(201).json({
      message: "User Stock updated succesfully",
      post: updateStockPost,
    });
  } catch (error) {
    next(error);
  }
};

const softDeletePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post) {
      throw createNewError("", 404, "Este post no existe");
    }
    const userId = req.token.id;
    const deletePost = await softDeletePostModel(userId, id);
    res
      .status(204)
      .json({ message: "Post soft deleted correctamente", post: deletePost });
  } catch (error) {
    next(error);
  }
};

export {
  getAllPost,
  getUserPost,
  createPostController,
  updatePostController,
  getPostByIdController,
  getLogByUserIdController,
  softDeletePostController,
  getLogByPostIdController,
  getAllPostByCategoryId,
  updateUserStockController,
};
