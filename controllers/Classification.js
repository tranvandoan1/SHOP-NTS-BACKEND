import Classification from '../modoles/Classification';
import formidable from 'formidable';
import _ from 'lodash';
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

export const remove = (req, res) => {
    let classification = req.classification;
    classification.remove((err, classification) => {
        if (err) {
            return res.status(400).json({
                error: "Không xóa được tên loại sản phẩm"
            })
        }
        res.json({
            classification,
            message: "tên loại sản phẩm đã được xóa thành công"
        })
    })
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