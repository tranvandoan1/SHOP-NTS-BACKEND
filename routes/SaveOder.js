import express from "express";
import {
  create,
  list,
  update,
  uploadSaveOrders,
  saveoderId,
  read,
  remove,
} from "../controllers/SaveOder";
const router = express.Router();

router.post("/saveoders", create);
router.get("/saveoders", list);
router.get("/saveoders/:id", read);

router.put("/saveoders/:id", update);
router.patch("/saveoders/check", uploadSaveOrders);

router.delete("/saveoders/:id", remove);

router.param("id", saveoderId);

module.exports = router;
