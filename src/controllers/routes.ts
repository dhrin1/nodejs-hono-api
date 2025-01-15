import userRoutes from "./users/routes";
import productRoutes from "./products/routes";

export const routes = [userRoutes, productRoutes] as const;

export type AppRoutes = (typeof routes)[number];
