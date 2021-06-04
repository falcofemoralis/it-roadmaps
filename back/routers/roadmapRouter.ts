import express, { Router } from 'express';

const roadmapRouter: Router = express.Router();

roadmapRouter.get("/test", (req, res) => res.send(`{"data": 1}`));
roadmapRouter.put("/", (req, res) => res.send("update"));

export default roadmapRouter;