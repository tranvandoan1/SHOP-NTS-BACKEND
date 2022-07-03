import Saveoder from "../modoles/SaveOder";
import _ from "lodash";
import formidable from "formidable";
const ObjectId = require("mongodb").ObjectID;

export const create = (req, res) => {
  const saveoder = new Saveoder(req.body);
  saveoder.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Không thêm được sp oder",
      });
    }
    Saveoder.find((err, data) => {
      if (err) {
        error: "Không tìm thấy sp oder";
      }
      Saveoder.find((err, data) => {
        if (err) {
          error: "Không tìm thấy sp oder";
        }
        res.json(data);
      });
    });
  });
};

export const saveoderId = (req, res, next, id) => {
  Saveoder.findById(id).exec((err, saveoder) => {
    if (err || !saveoder) {
      res.status(400).json({
        error: "Không tìm thấy sp oder",
      });
    }
    req.saveoder = saveoder;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.saveoder);
};

export const remove = (req, res) => {
  let saveoder = req.saveoder;
  Saveoder.find((err, data) => {
    // return res.json(data);
    console.log(data.length, "trước");
  });
  saveoder.remove((err, saveoder) => {
    if (err) {
      return res.status(400).json({
        error: "Không xóa được sp oder",
      });
    }
    Saveoder.find((err, dataAll) => {
      console.log(dataAll.length, "sau");

      return res.json(dataAll);
    });
  });
};

export const list = (req, res) => {
  Saveoder.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sp oder";
    }
    res.json(data);
  });
};

export const update = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    let saveoder = req.saveoder;
    saveoder = _.assignIn(saveoder, fields);

    saveoder.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Không sửa được oder",
        });
      }
      Saveoder.find((err, dataAll) => {
        if (err) {
          error: "Không tìm thấy sp oder";
        }
        console.log(dataAll, "alll");
        return res.json(dataAll);
      });
    });
  });
};
export const uploadSaveOrders = async (req, res) => {
  const { idSelect, check } = req.body;
  const listIdStudents = await idSelect.map((id) => ObjectId(id));

  await Saveoder.updateMany(
    {
      _id: { $in: listIdStudents },
    },
    {
      $set: {
        check: check,
      },
    }
  );
  
  Saveoder.find((err, dataAll) => {
    if (err) {
      error: "Không tìm thấy sp oder";
    }
    return res.json(dataAll);
  });
};
