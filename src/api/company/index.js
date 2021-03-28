import {Router} from "express";
import passport from "passport";
import companyController from "./controllerMogoose";


const companyRouter = new Router();
companyRouter.get("/", companyController.get);
companyRouter.get("/:id", companyController.getById);
companyRouter.post("/",  companyController.post);
companyRouter.delete("/:id",  companyController.delete);
companyRouter.patch("/:id", /* passport.authenticate("jwt", {session:false}),*/ companyController.patch);
// companyRouter.put("/", companyController.put);

export default companyRouter;