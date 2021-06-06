import express, { Router } from 'express'
import RoadmapController from '../controllers/RoadmapController'

const roadmapRouter: Router = express.Router()
const roadmapController: RoadmapController = new RoadmapController()

roadmapRouter.get("/opinions", roadmapController.getOpinions)
roadmapRouter.get("/all", roadmapController.getRoadmaps)
roadmapRouter.get("/nodes/:id", roadmapController.getRoadmapData)
roadmapRouter.get("/:id", roadmapController.getRoadmap)

roadmapRouter.post("/nodes", roadmapController.saveRoadmap)
roadmapRouter.post("/", roadmapController.newRoadmap)

roadmapRouter.put("/nodes", roadmapController.updateRoadmap)

export default roadmapRouter