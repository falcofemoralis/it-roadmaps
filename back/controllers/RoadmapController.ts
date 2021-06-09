import RoadmapModel from '../models/RoadmapModel';
import { HttpCodes } from '../constants/HttpCodes';

export default class RoadmapController {
    roadmapModel: RoadmapModel;

    constructor() {
        this.roadmapModel = new RoadmapModel();
    }

    public getOpinions = async (req: any, res: any) => {
        try {
            const opinions = await this.roadmapModel.getOpinions();

            if (opinions.length > 0) {
                res.status(HttpCodes.OK).send(opinions);
            } else {
                res.status(HttpCodes.NotFound).send();
            }
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
        }
    }

    public getRoadmapData = async (req: any, res: any) => {
        try {
            const nodes = await this.roadmapModel.getNodes(req.params.id);
            res.status(HttpCodes.OK).send(nodes);
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
        }
    }

    public getAllData = async (req: any, res: any) => {
        try {
            const nodes = await this.roadmapModel.getAllNodes();
            res.status(HttpCodes.OK).send(nodes);
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
        }
    }

    public getRoadmap = async (req: any, res: any) => {
        try {
            const roadmap = (await this.roadmapModel.getRoadmap(req.params.id))[0];
            if (roadmap) {
                res.status(HttpCodes.OK).send(roadmap);
            } else {
                res.status(HttpCodes.NotFound).send();
            }
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
        }
    }

    public getRoadmaps = async (req: any, res: any) => {
        try {
            const roadmaps = await this.roadmapModel.getRoadmaps();
            if (roadmaps.length > 0) {
                res.status(HttpCodes.OK).send(roadmaps);
            } else {
                res.status(HttpCodes.NotFound).send();
            }
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
        }
    }

    public saveNode = async (req: any, res: any) => {
        try {
            const insertedId = await this.roadmapModel.addNode(req.body)
            res.status(HttpCodes.OK).send({ id: insertedId });
        } catch (err) {
            console.log(err);

            res.status(HttpCodes.InternalServerError).send(err);
        }
    }

    public updateNode = async (req: any, res: any) => {
        try {
            await this.roadmapModel.updateNode(req.params.id, req.body);
            res.status(HttpCodes.OK).send();
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
        }
    }

    public newRoadmap = async (req: any, res: any) => {
        try {
            const insertedId = await this.roadmapModel.addRoadmap(req.body);
            res.status(HttpCodes.OK).send({ id: insertedId });
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
        }
    }
}