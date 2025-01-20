import type { Context } from "hono";

interface Product {
  id: number;
  name: string;
  price: number;
}

export let products = [
  { id: 1, name: "iphone", price: 10 },
  { id: 2, name: "samsung", price: 10 },
];

export function getProductsController(c: Context) {
  return c.json(products, 200);
}

export function getProductController(c: Context) {
  const { id } = c.req.param();
  const product = products.filter((product) => product.id === Number(id));

  if (!product) {
    return c.json("Product not found", 404);
  }
  return c.json(product, 200);
}

export async function createProductController(c: Context) {
  const body = await c.req.json();

  const newProduct = {
    id: products.length + 1,
    name: body.name,
    price: body.price,
  };

  products.push(newProduct);

  return c.json(newProduct, 201);
}

export async function updateProductController(c: Context) {
  const { id } = c.req.param();
  const body = await c.req.json();

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return c.text("Product not found", 404);
  }

  const updateProduct: Product = {
    ...product,
    ...body,
  };

  products = products.map((product) =>
    product.id === Number(id) ? updateProduct : product
  );

  return c.json(products);
}

export function deleteProductController(c: Context) {
  const { id } = c.req.param();

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return c.text("Product not found", 404);
  }

  const newProducts = products.filter((product) => product.id !== Number(id));

  return c.json({ message: "Product deleted", data: newProducts }, 201);
}
