import InfoUser from "../modoles/InfoUser";
import formidable from "formidable";
import _ from "lodash";

export const create = (req, res) => {
  let infoUser = new InfoUser(req.body);

  infoUser.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Không thêm được thông tin",
      });
    }
    InfoUser.find((err, data) => {
      if (err) {
        error: "Không tìm thấy thông tin";
      }
      return res.json(data);
    });
  });
};

export const Id = (req, res, next, id) => {
  InfoUser.findById(id).exec((err, infoUser) => {
    if (err || !infoUser) {
      res.status(400).json({
        error: "Không tìm thấy thông tin người dùng",
      });
    }
    req.infoUser = infoUser;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.infoUser);
};

export const remove = (req, res) => {
  let infoUser = req.infoUser;
  infoUser.remove((err, infoUser) => {
    if (err) {
      return res.status(400).json({
        error: "Không xóa được thông tin",
      });
    }
    InfoUser.find((err, data) => {
      if (err) {
        error: "Không tìm thấy thông tin";
      }
      return res.json(data);
    });
  });
};

export const list = (req, res) => {
  InfoUser.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    res.json(data);
  });
};

export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "ko thành côgn",
      });
    }

    let infoUser = req.infoUser;
    infoUser = _.assignIn(infoUser, fields);

    infoUser.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Không sửa được thông tin",
        });
      }
      InfoUser.find((err, data) => {
        if (err) {
          error: "Không tìm thấy thông tin";
        }
        return res.json(data);
      });
    });
  });
};

