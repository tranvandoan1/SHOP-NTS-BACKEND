import formidable from 'formidable';
import _ from 'lodash';
import User from '../modoles/Users';

export const listUser = (req, res) => {
    User.find((err, data) => {
        if (err) {
            res.status(400).json({
                err: " Không có tài khoản nào !"
            })
        }
        res.json(data)
    })
}
export const list = (req, res) => {
    User.find((err, data) => {
        if (err) {
            error: "Không tìm thấy sản phẩm"
        }
        res.json(data)
    })
}
export const userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next()
    })
}
export const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
}
export const update = (req, res) => {
    User.findOneAndUpdate({ _id: req.profile.id }, { $set: req.body }, { new: true },
            (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Bạn không được phép thực hiện trong hành động'
                    })
                }
                req.profile.hashed_password = undefined;
                req.profile.salt = undefined;
                res.json(user);

            }
        )
        // const form = formidable.IncomingForm();
        // form.keepExtensions = true;
        // form.parse(req, (err, fields, files) => {
        //     let newss = req.profile;
        //     newss = _.assignIn(newss, fields);

    //     newss.save((err, data) => {
    //         if (err) {
    //             res.status(400).json({
    //                 error: "Không sửa được user"
    //             })
    //         }
    //         req.profile.hashed_password = undefined;
    //         req.profile.salt = undefined;
    //         res.json(data)
    //     })

    // })
}

export const remove = (req, res) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        res.json({
            user,
            message: "Sản phẩm đã được xóa thành công"
        })
    })
}