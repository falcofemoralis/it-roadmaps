import express, { Router } from 'express';
import RoadmapController from '../controllers/RoadmapController';

const roadmapRouter: Router = express.Router();
const roadmapController: RoadmapController = new RoadmapController();

roadmapRouter.get("/opinions", roadmapController.getOpinions)
roadmapRouter.get("/", roadmapController.getRoadmap);
roadmapRouter.post("/", roadmapController.saveRoadmap);

export default roadmapRouter;