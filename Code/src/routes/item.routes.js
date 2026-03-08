import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/Item.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const ItemRouter = express.Router();

ItemRouter.post("/", protect, createItem);
ItemRouter.get("/", protect, getItems);
ItemRouter.get("/:id", protect, getItemById);
ItemRouter.put("/:id", protect, updateItem);
ItemRouter.delete("/:id", protect, deleteItem);

export default ItemRouter;
