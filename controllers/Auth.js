import User from "../modoles/Users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userSignupValidator } from "../validator";
const crypto = require("crypto");
dotenv.config();
const expressJwt = require("express-jwt");
const bcrypt = require('bcrypt');

export const signup = (req, res) => {
  const saltRounds = 10; // số lần lặp lại để tạo salt
  bcrypt.hash(req.body.password, saltRounds, function (err, password) {
    // hàm callback được gọi khi quá trình mã hóa hoàn tất
    if (err) {
      return res.json(err);
    } else {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        hashed_password: password,
        avatar: req.body.avatar,
        phone: req.body.phone,
      }
      const user = new User(newUser);
      user.save((error, user) => {
        if (error) {
          return res.status(400).json({
            error: "Không thêm được",
          });
        }
        return res.json(user);
      });

    }
  });



};
export const signin = async (req, res) => {
  const { value, password } = req.body;
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const user = await User.findOne(isValidEmail(value) == true ? {
    email: value,
  } : {
    phone: value,
  });

  console.log(user, 'user')

  if (user !== null || user !== undefined) {
    bcrypt.compare(password, user.hashed_password, function (error, result) {
      console.log(result, 'result')
      // hàm callback được gọi khi quá trình so sánh hoàn tất
      if (error) {
        return res.status(400).json({ error: 'Lỗi 400' });
      } else if (result) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("t", token, { expire: new Date() + 9999 });

        const { _id, name, avatar, email, role, phone } = user;
        return res.json({
          token,
          user: { _id, avatar, email, name, role, phone },
        });
      } else {
        return res.status(400).json({
          error: "Mật khẩu không khớp"
        })
      }
    });
  } else {
    return res.status(400).json({
      error:
        "Email hoặc số điện thoại của bạn không hợp lệ . Vui lòng đăng ký",
    });
  }
};

export const signout = (req, res) => {
  res.clearCookie("t");
  res.json({
    message: "Đăng xuất thành công",
  });
};
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Quyền truy cập bị Từ chối",
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denined",
    });
  }
  next();
};
