import { Express } from "express";
import { Routes } from "./Routes";

export function Router(app: Express): void {
  Routes.forEach(({path, method}) => {
    app.get(`/${path}/*`, method.Get);
    app.post(`/${path}/*`, method.Post);
    app.patch(`/${path}/*`, method.Patch);
    app.delete(`/${path}/*`, method.Delete);
  });
}