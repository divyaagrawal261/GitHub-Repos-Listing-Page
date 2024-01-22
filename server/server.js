import dotenv from "dotenv";
import express from "express";
import repoRoutes from "./routes/routes.js"
import cors from "cors";
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use("/username",repoRoutes);
app.listen(7474,()=>console.log("Server is listening"))
