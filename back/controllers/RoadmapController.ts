import RoadmapModel from '../models/RoadmapModel';

export default class RoadmapController {
    roadmapModel: RoadmapModel;

    constructor() {
        this.roadmapModel = new RoadmapModel();
    }

    public getRoadmapData = (req: any, res: any): void => {
        this.roadmapModel.getNodes(req.params.id, (result: any) => {
            res.status(200).send(result);
        })
    }

    public getRoadmap = (req: any, res: any): void => {
        this.roadmapModel.getRoadmap(req.params.id, (result: any) => {
            res.status(200).send(result[0]);
        })
    }

    public getRoadmaps = (req: any, res: any): void => {
        this.roadmapModel.getRoadmaps((result: any) => {
            res.status(200).send(result);
        })
    }

    public saveRoadmap = (req: any, res: any): void => {
        this.roadmapModel.addNodes(req.body, () => {
            res.status(200).send();
        });
    }

    public getOpinions = (req: any, res: any): void => {
        this.roadmapModel.getOpinions((result: any) => {
            res.status(200).send(result);
        });
    }

    public updateRoadmap = (req: any, res: any): void => {
        this.roadmapModel.updateNodes(req.body, () => {
            res.status(200).send();
        });
    }

    public newRoadmap = (req: any, res: any): void => {
        this.roadmapModel.addRoadmap(req.body, (id: string) => {
            console.log(id);

            res.status(200).send({ id: id });
        })
    }
}