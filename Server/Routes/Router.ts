import { Express } from "express";
import { Routes } from "./Routes";
import { RouteFactory } from "./RouteFactory.class";
import { Route } from "./Route.class";

export function Router(app: Express): void {
  Routes.forEach((name) => {
    const currRoute: Route = RouteFactory.Create(name);

    app.get(`/${name}/*`, currRoute.Get);
    app.post(`/${name}`, currRoute.Post);
    app.patch(`/${name}/*`, currRoute.Patch);
    app.delete(`/${name}/*`, currRoute.Delete);
  });
}