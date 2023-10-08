import { Express } from "express";
import { Routes } from "./RouteFactory.class";
import { RouteFactory } from "./RouteFactory.class";
import { Route } from "./Route.class";

export function Router(app: Express): void {
  Object.values(Routes).forEach((name) => {
    const currRoute: Route = RouteFactory.Create(name);
    console.log(name.toLowerCase());
    app.get(`/${name.toLowerCase()}/*`, currRoute.Get);
    app.post(`/${name.toLowerCase()}`, currRoute.Post);
    app.patch(`/${name.toLowerCase()}/*`, currRoute.Patch);
    app.delete(`/${name.toLowerCase()}/*`, currRoute.Delete);
  });
}