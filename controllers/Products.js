import Product from "../modoles/Products";

import formidable from "formidable";
import _, { filter } from "lodash";

export const create = (req, res, next) => {
    let product = new Product(req.body);

    product.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: "Không thêm được sản phẩm",
            });
        }
        res.json(data);
    });

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

export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm",
            });
        }
        res.json({
            deletedProduct,
            message: "Sản phẩm đã được xóa thành công",
        });
    });
};

export const list = (req, res) => {
    Product.find((err, data) => {
        if (err) {
            error: "Không tìm thấy sản phẩm";
        }
        res.json(data);
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