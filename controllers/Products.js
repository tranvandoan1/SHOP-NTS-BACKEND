import Product from "../modoles/Products";
import Classification from "../modoles/Classification";
const nodemailer = require('nodemailer');

import formidable from "formidable";
import _, { filter } from "lodash";
import { ObjectID } from "mongodb";
export const create = async (req, res, next) => {
    try {
        await Product.create(req.body.product);
        await Classification.create(req.body.classifies);
        Product.find((err, data) => {
            if (err) {
                error: "Không tìm thấy sản phẩm";
            }
            return res.json(data);
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: "Không tìm thấy sản phẩm",
            });
        }
        req.product = product;
        next();
    });
};
export const read = (req, res) => {
    return res.json(req.product);
};

export const remove = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.productId);
        Product.find((err, data) => {
            if (err) {
                error: "Không tìm thấy sản phẩm";
            }
            return res.json(data);
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};
export const removes = async (req, res) => {
    try {
        let id = req.body;
        for (let i = 0; i < id.length; i++) {
            id[i] = ObjectID(id[i]);
        }
        await Product.deleteMany({ _id: { $in: id } });
        Product.find((err, data) => {
            if (err) {
                error: "Không tìm thấy sp oder";
            }
            return res.json(data);
        });
    } catch (error) {
        return res.status(400).json(error);
    }

};

export const list = (req, res) => {
    Product.find((err, data) => {
        console.log(data, 'data')
        if (err) {
            error: "Không tìm thấy sản phẩm";
        }
        return res.json(data);
    });
};

export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        let product = req.product;
        product = _.assignIn(product, fields);

        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Không sửa được sản phẩm",
                });
            }
            res.json(data);
        });
    });
};

