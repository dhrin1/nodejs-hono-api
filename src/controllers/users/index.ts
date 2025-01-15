import type { Context } from "hono";

interface User {
  name: string;
  id: number;
}

export let users: User[] = [
  { id: 1, name: "Bob" },
  { id: 2, name: "Anna" },
];

export function getUsersController(c: Context) {
  return c.json(users);
}

export function getUserController(c: Context) {
  const { id } = c.req.param();
  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    return c.text("User not found", 404);
  }
  return c.json(user);
}

export async function createUserController(c: Context) {
  const { name } = await c.req.json();

  const newUser = {
    id: users.length + 1,
    name: name,
  };

  users.push(newUser);

  return c.json(users, 201);
}

export async function updateUserController(c: Context) {
  const { id } = c.req.param();

  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return c.text("User not found", 404);
  }
  const body = await c.req.json();

  const updatedUser: User = {
    ...user,
    ...body,
  };

  users = users.map((user) => (user.id === Number(id) ? updatedUser : user));

  return c.json(users, 200);

  // return c.json(updatedUser, 200);
}

export function deleteUserController(c: Context) {
  const { id } = c.req.param();

  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return c.text("User not found", 404);
  }

  const newUsers = users.filter((user) => user.id !== Number(id));

  return c.json({ message: "User deleted", data: newUsers }, 201);
}
