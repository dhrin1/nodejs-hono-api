import { Hono } from "hono";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  updateProductController,
} from "./index";

const router = new Hono()
  .get("/products", getProductsController)
  .get("/products/:id", getProductController)
  .post("/products", createProductController)
  .put("/products/:id", updateProductController)
  .delete("products/:id", deleteProductController);

export default router;
