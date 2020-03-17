const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Product not found"
                });
            }
            req.product = product;
            next();
        });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        const { name, description, price, category, stock } = fields;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please include all fields"
            });
        }

        let product = new Product(fields);

        //handling files
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // Save to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Saving item to DB failed"
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
        res.set("Content-Type", req.product.photo.contentType);
        res.send(req.product.photo.data);
    }
    next();
};

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.json({
                error: "Failed to delete product"
            });
        }
        res.json({
            message: "Successfully deleted product",
            deletedProduct
        });
    });
};

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        const { name, description, price, category, stock } = fields;

        let product = req.product;
        product = _.extend(product, fields);

        //handling files
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // Save to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Updation of the product failed"
                });
            }
            res.json(product);
        });
    });
};

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.json({
                    error: "No products found."
                });
            }
            res.json(products);
        });
};

exports.updateStock = (req, res, next) => {
    let productOperations = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: {
                    $inc: {
                        stock: -item.count,
                        sold: +item.count
                    }
                }
            }
        };
    });
    Product.bulkWrite(productOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk Operation failed."
            })
        }
        next()
    });
};
