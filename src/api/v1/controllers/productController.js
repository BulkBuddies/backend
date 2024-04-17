import prepareHateoas from "../helpers/hateoas.js";
import { getAllPro, getProductById, getProLimitOrder } from "../models/productModel.js";
import { findError } from "../utils/utils.js"


export const getAllProducts = async (req, res) => {
    try {
      const products = await getAllPro();
      res.status(200).json({products: products})
    } catch (error) {
        //console.error("Error al procesar", error.code);
         const errorFound = findError(error.code)
         res.status(errorFound[0].status).json({error: errorFound[0].message})
    } 
  };

  export const getProductId = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        res.status(200).json({product: product})           
    } catch (error) {
        const errorFound = findError(error.code)
        res.status(errorFound[0].status).json({error: errorFound[0].message})            
    }
  };

  export const getProductOrderLimit = async (req, res) => {
    try {
        const {field, direction, limit, page } = req.query;
        const products = await getProLimitOrder(field, direction, limit, page);
        //const products = await getAllPro();
        //const stockTotal = await getAllPro();
        const productsHateoas = await prepareHateoas("id", products)
        res.status(200).json({products: productsHateoas})
    } catch (error) {
        const errorFound = findError(error.code)
        res.status(errorFound[0].status).json({error: errorFound[0].message})      
    }
 
  }