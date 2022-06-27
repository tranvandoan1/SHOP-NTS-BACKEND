import OderDetail from "../modoles/OderDetail";
import _ from "lodash";

export const create = (req, res) => {
  let oderdetail = new OderDetail(req.body);
  oderdetail.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Không thêm được sản phẩm",
      });
    }
    OderDetail.find((err, data) => {
      if (err) {
        error: "Không tìm thấy sản phẩm";
      }
      return res.json(data);
    });
  });
};

export const Id = (req, res, next, id) => {
  OderDetail.findById(id).exec((err, oderdetail) => {
    if (err || !oderdetail) {
      res.status(400).json({
        error: "Không tìm thấy sản phẩm",
      });
    }
    req.oderdetail = oderdetail;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.oderdetail);
};

export const remove = (req, res) => {
  let oderdetail = req.oderdetail;
  oderdetail.remove((err, oder) => {
    if (err) {
      return res.status(400).json({
        error: "Không xóa được sản phẩm",
      });
    }
    res.json({
      oderdetail,
      message: "Sản phẩm đã được xóa thành công",
    });
  });
};

export const list = (req, res) => {
  OderDetail.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sản phẩm";
    }
    res.json(data);
  });
};
