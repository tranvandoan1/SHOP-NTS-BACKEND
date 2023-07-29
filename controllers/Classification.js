import Classification from '../modoles/Classification';
import formidable from 'formidable';
import _ from 'lodash';
import { ObjectID } from "mongodb";

export const create = (req, res) => {
    let classification = new Classification(req.body);
    classification.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: "Không thêm duoc tên loại sản phẩm"
            })
        }
        res.json(data)
    })

}

export const Id = (req, res, next, id) => {
    Classification.findById(id).exec((err, classification) => {
        if (err || !classification) {
            res.status(400).json({
                error: "Không tìm thấy tên loại sản phẩm"
            })
        }
        req.classification = classification;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.classification);
}

export const removes = async (req, res) => {
    try {

        let id = req.body;
        for (let i = 0; i < id.length; i++) {
            id[i] = ObjectID(id[i]);
        }
        await Classification.deleteMany({ _id: { $in: id } });
        Classification.find((err, data) => {
            if (err) {
                error: "Không tìm thấy sp oder";
            }
            return res.json(data);
        });
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const list = (req, res) => {
    console.log('2')
    Classification.find((error, data) => {
        if (error) {
            error: "Không tìm thấy tên loại sản phẩm"
        }
        res.json(data)
    })
}

export const update = (req, res) => {


    let classification = req.classification;
    const { name, condition, pro_id, quantity, price } = req.body
    classification = _.assignIn(classification, { name, condition, pro_id, quantity, price });

    classification.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: "Không sửa được tên loại sản phẩm"
            })
        }
        res.json(data)
    })

}