import Product from "../models/product.model";
import extend from "lodash/extend";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";
import defaultImage from "./../../client/assets/images/default.png";

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  /**
   * @param fields all form fields except file data
   * @param files uploaded file information
   */
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Image could not be uploaded",
      });
    }

    let product = new Product(fields);
    product.shop = req.shop;

    if (files.image) {
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }

    try {
      let result = await product.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const listByShop = async (req, res) => {
  try {
    /**
     * retrieve all products with shop id
     * replace MongoDb Id of the shop field with its _id and name
     * omit the image fields since it will be got by customized api
     */
    let products = await Product.find({ shop: req.shop._id })
      .populate("shop", "_id name")
      .select("-image");
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id)
      .populate("shop", "_id name")
      .exec();

    if (!product)
      return res.status("400").json({
        error: "Product not found",
      });

    req.product = product;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve product",
    });
  }
};

const read = (req, res) => {
  req.product.image = undefined;
  return res.json(req.product);
};

const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Photo could not be uploaded",
      });
    }

    let product = req.product;
    product = extend(product, fields);

    product.updated = Date.now();

    if (files.image) {
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }

    try {
      let result = await product.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const remove = async (req, res) => {
  try {
    let product = req.product;
    let deletedProduct = await product.remove();
    res.json(deletedProduct);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listLatest = async (req, res) => {
  try {
    let products = await Product.find({})
      .sort("-created")
      .limit(5)
      .populate("shop", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listRelated = async (req, res) => {
  try {
    let products = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .limit(5)
      .populate("shop", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 返回所有的categories名称。
 */
const listCategories = async (req, res) => {
  try {
    const products = await Product.distinct('category', {});
    res.json(products);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
    })
  }

};

/**
 * Search and return the results with provided search words and selected category.
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
 const list = async (req, res) => {
  //An object includes one regex for search keywords, one string for search category.
  const query = {}
  if(req.query.search)
    query.name = {'$regex': req.query.search, '$options': "i"}
  if(req.query.category && req.query.category != 'All')
    query.category =  req.query.category
  try {
    let products = await Product.find(query).populate('shop', '_id name').select('-image').exec()
    res.json(products)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
  if (req.product.image.data) {
    res.set("Content-Type", req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + defaultImage);
};

export default {
  create,
  listByShop,
  photo,
  defaultPhoto,
  productByID,
  remove,
  update,
  read,
  listLatest,
  listRelated,
  listCategories,
  list
};
