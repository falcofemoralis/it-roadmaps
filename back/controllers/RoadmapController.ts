import RoadmapModel from '../models/RoadmapModel';

export default class RoadmapController {
    roadmapModel: RoadmapModel;

    constructor() {
        this.roadmapModel = new RoadmapModel();
    }

    public getRoadmap = (req: any, res: any): void => {

    }

    public saveRoadmap = (req: any, res: any): void => {
        this.roadmapModel.addNodes(req.body);
        res.status(200).send();
    }

    public getOpinions = (req: any, res: any): void => {
        this.roadmapModel.getOpinions((result: any) => {
            res.status(200).send(result);
        });

    }
}