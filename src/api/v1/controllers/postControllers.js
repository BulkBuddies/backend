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
  getRequiredStockPostId,
  updateUserStockById,
} from "../models/postModel.js";

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
    const posts = await getUserPostModel(id);
    if (!posts) {
      return res.status(404).send({ message: "This entity does not exist" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await getPostById(id);
    if (!posts) {
      return res.status(404).send({ message: "This entity does not exist" });
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
    if (!logs) {
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
    if (!logs) {
      return res.status(404).send({ message: "This entity does not exist" });
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
      return res.status(404).send({ message: "This Post Id does not exists." });
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
    const required_stock = stocks.required_stock;
    const min_contribution = stocks.min_contribution;
    const user_stock = stocks.user_stock;
    const goal_stock = stocks.required_stock - user_stock;

    //console.log(required_stock)
    //console.log(min_contribution)
    //console.log(goal_stock)

    if (user_contribution_parse > required_stock) {
      return res.status(400).send({
        message: "user_contribution cannot be greater than the required_stock",
      });
    }

    if (user_contribution_parse < min_contribution) {
      return res.status(400).send({
        message: "user_contribution cannot be less than the min_contribution",
      });
    }

    if (user_contribution_parse > goal_stock) {
      return res.status(400).send({
        message: "user_contribution cannot be greater than the goal_stock",
        goal_stock: goal_stock,
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
      return res.status(404).send({ message: "This Post Id does not exists." });
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
  updateUserStockController,
};
