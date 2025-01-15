import type { Context } from "hono";

export function getProductsController(c: Context) {
  return c.text("Products");
}

export function getProductController(c: Context) {
  const { id } = c.req.param();
  return c.text(`Products ${id}`);
}

export async function createProductController(c: Context) {
  const { name } = await c.req.json();
  return c.text(`Create product ${name}`);
}

export async function updateProductController(c: Context) {
  const { id } = c.req.param();
  return c.text(`Update product ${id}`);
}

export function deleteProductController(c: Context) {
  const { id } = c.req.param();
  return c.text(`Delete product ${id}`);
}
