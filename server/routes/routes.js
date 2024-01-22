import { fetchRepos, getDetails } from "../controllers/apiControllers.js";
import express from "express";
const Router=express.Router();

Router.post("/",getDetails)
      .post("/repos",fetchRepos)

export default Router;