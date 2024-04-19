import {
  getAllPro,
  getProductById,
  getProLimitOrder,
  getProductByCategoryId,
  getCategoryName,
  getProductFilter
} from "../models/productModel.js";


const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllPro();
    res.status(200).json({ products: products });
  } catch (error) {
    next(error);
  }
};


const getProductId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.status(200).json({ product: product });
  } catch (error) {
    next(error);
  }
};


const getProductCategoryId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByCategoryId(id);
    const name_category = await getCategoryName(id);
    res.status(200).json({ name_category, product: product });
  } catch (error) {
    next(error);
  }
};


const getProductOrderLimit = async (req, res, next) => {
  try {
    const { field, direction, limit, page } = req.query;
    const products = await getProLimitOrder(field, direction, limit, page);
    //const products = await getAllPro();
    //const stockTotal = await getAllPro();
    res.status(200).json({ products: products });
  } catch (error) {
    next(error);
  }
};

const getProductsByFilter = async (req, res) => {
  try {
      const parametrosQuery = req.query
      const products = await getProductFilter(parametrosQuery);    
      res.status(200).json({count: products.length, products: products})        
  } catch (error) {
    next(error);            
  }
}

export {
  getAllProducts,
  getProductId,
  getProductCategoryId,
  getProductOrderLimit,
  getProductsByFilter
};
