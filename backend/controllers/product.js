const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const product = require('../models/product');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate('category')
    .exec((error, product) => {
      if (error) {
        return res.status(400).json({
          error: 'Product not found',
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;

  form.parse(req, (error, fields, file) => {
    if (error) {
      res.status(400).json({
        error: 'Problem with image',
      });
    }

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !category || !price || !stock) {
      return res.status(400).json({
        error: 'Please include all the fields',
      });
    }

    let product = new Product(fields);

    // HANDLE FILE HERE
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: 'File should be less than 3Mb in size',
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((error, product) => {
      if (error) {
        return res.status(400).json({
          error: 'Cannot save the product',
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((error, deletedProduct) => {
    if (error) {
      return res.status(400).json({
        error: 'Unable to delete the product',
      });
    }
    res.json({
      message: 'Product deleted successfuly',
      deletedProduct,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;

  form.parse(req, (error, fields, file) => {
    if (error) {
      res.status(400).json({
        error: 'Problem with image',
      });
    }

    // UPDATION CODE
    let product = req.product;
    product = _.extend(product, fields);

    // HANDLE FILE HERE
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: 'File should be less than 3Mb in size',
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((error, product) => {
      if (error) {
        return res.status(400).json({
          error: 'Cannot update the product',
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id ';
  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: 'No products found',
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct('category', {}, (error, category) => {
    if (error) {
      return res.status(400).json({
        error: 'No category found',
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: {
          $inc: {
            stock: -prod.count,
            sold: +prod.count,
          },
        },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: 'Bulk operations failed',
      });
    }
    next();
  });
};
