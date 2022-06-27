import express from "express";
import {
  create,
  list,
  update,
  Id,
  read,
  remove,
} from "../controllers/CateShopee";
const router = express.Router();

router.post("/cate-shopee", create);
router.get("/cate-shopee", list);
router.get("/cate-shopee/:Id", read);

router.put("/cate-shopee/:Id", update);

router.delete("/cate-shopee/:Id", remove);

router.param("Id", Id);

module.exports = router;
