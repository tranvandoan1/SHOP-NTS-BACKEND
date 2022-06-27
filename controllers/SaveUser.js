import Saveuser from '../modoles/SaveUser';
import formidable from 'formidable';
import _ from 'lodash';
export const create = (req, res) => {
    const saveuser = new Saveuser(req.body); //tạo đối tượng từ mode cùng với dữ liệu mk đẩy lên
    saveuser.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: "Email hoặc password không đúng"
            })
        }
        res.json(data)
    })
}

export const userById = (req, res, next, id) => {
    Saveuser.findById(id).exec((err, saveuser) => {
        if (err || !saveuser) {
            res.status(400).json({
                error: "Không tìm thấy user"
            })
        }
        req.saveuser = saveuser;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.saveuser);
}

export const deletee = (req, res) => {
    let saveuser = req.saveuser;
    saveuser.remove((err, saveuser) => {
        if (err) {
            return res.status(400).json({
                error: "Không đăng xuất"
            })
        }
        res.json({
            saveuser,
            message: "User đã được xóa thành công"
        })
    })
}

export const list = (req, res) => {
    Saveuser.find((err, data) => {
        if (err) {
            error: "Không tìm thấy users"
        }
        res.json(data)
    })
}
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        let saveuser = req.saveuser;
        saveuser = _.assignIn(saveuser, fields);

        saveuser.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Không sửa được user",
                });
            }
            res.json(data);
        });
    });

};