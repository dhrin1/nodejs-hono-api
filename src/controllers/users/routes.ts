import { Hono } from "hono";
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "./index.js";

const router = new Hono()
  .get("/users", getUsersController)
  .get("/users/:id", getUserController)
  .post("/users", createUserController)
  .put("/users/:id", updateUserController)
  .delete("/users/:id", deleteUserController);

export default router;
