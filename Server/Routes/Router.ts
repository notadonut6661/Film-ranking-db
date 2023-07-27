import { Express } from "express";
import { Routes } from "./Routes";
import { RouteFactory } from "./RouteFactory.class";

export function Router(app: Express): void {
  Routes.forEach((name) => {
    app.get(`/${name}/*`, RouteFactory.Create(name).Get);
    app.post(`/${name}`, method.Post);
    app.patch(`/${name}/*`, method.Patch);
    app.delete(`/${name}/*`, method.Delete);
  });
}