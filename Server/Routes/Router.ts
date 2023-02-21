import { Express } from "express";
import { Routes } from "./Routes";

// FIXME add to Routes parametre to insure that we should use symbols after name
export function Router(app: Express): void {
  Routes.forEach(({name, method}) => {
    app.get(`/${name}/*`, method.Get);
    app.post(`/${name}`, method.Post);
    app.patch(`/${name}/*`, method.Patch);
    app.delete(`/${name}/*`, method.Delete);
  });
}