import express, { Router } from 'express'
import RoadmapController from '../controllers/RoadmapController'

const roadmapRouter: Router = express.Router()
const roadmapController: RoadmapController = new RoadmapController()

roadmapRouter.get("/opinions", roadmapController.getOpinions)
roadmapRouter.get("/all", roadmapController.getRoadmaps)
roadmapRouter.get("/nodes/:id", roadmapController.getRoadmapData)
roadmapRouter.get("/:id", roadmapController.getRoadmap)

roadmapRouter.post("/node", roadmapController.saveNode)
roadmapRouter.post("/", roadmapController.newRoadmap)

roadmapRouter.put("/node/:id", roadmapController.updateNode)

export default roadmapRouter