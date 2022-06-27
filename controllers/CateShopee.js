import CateShopee from "../modoles/CateShopee";
import _ from "lodash";
export const create = (req, res) => {
  let cateShopee = new CateShopee(req.body);

  cateShopee.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: "Không thêm duoc danh muc",
      });
    }
    res.json(data);
  });
};

export const Id = (req, res, next, id) => {
  CateShopee.findById(id).exec((err, cateShopee) => {
    if (err || !cateShopee) {
      res.status(400).json({
        error: "Không tìm thấy Danh muc",
      });
    }
    req.cateShopee = cateShopee;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.cateShopee);
};

export const remove = (req, res) => {
  let cateShopee = req.cateShopee;
  cateShopee.remove((err, cateShopee) => {
    if (err) {
      return res.status(400).json({
        error: "Không xóa được Danh muc",
      });
    }
    res.json({
      cateShopee,
      message: "Danh muc đã được xóa thành công",
    });
  });
};

export const list = (req, res) => {
  CateShopee.find((error, data) => {
    if (error) {
      error: "Không tìm thấy Danh muc";
    }
    res.json(data);
  });
};

export const update = (req, res) => {
  let cateShopee = req.cateShopee;
  const { name, cateShope_id,shopowner_id } = req.body;
  cateShopee = _.assignIn(cateShopee, { name, cateShope_id ,shopowner_id});

  cateShopee.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Không sửa được danh mục",
      });
    }
    res.json(data);
  });
};
