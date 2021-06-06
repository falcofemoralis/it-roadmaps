import mongoose, { Schema } from 'mongoose';

export default class RoadmapModel {
    NodeModel: any;
    OpinionModel: any;
    RoadmapModel: any;

    constructor() {
        const roadmapScheme = new Schema({
            name: { type: String, required: true },
            description: { type: String, required: true }
        });
        this.RoadmapModel = mongoose.model("Roadmap", roadmapScheme);

        const nodeScheme = new Schema({
            roadmapId: { type: String, required: true },
            name: { type: String, required: true },
            id: { type: Number, required: true },
            parentId: { type: Number },
            tasks: {
                type: [{
                    name: { type: String, required: true },
                    description: { type: String },
                    opinionId: { type: String }
                }]
            },
            opinionId: { type: String }
        });
        this.NodeModel = mongoose.model("Node", nodeScheme);

        const opinionScheme = new Schema({
            _id: { type: String, required: true },
            name: { type: String, required: true },
            color: { type: String, required: true }
        });
        this.OpinionModel = mongoose.model("Opinion", opinionScheme);
    }

    public getRoadmaps(callback: Function) {
        this.RoadmapModel.find()
            .then((res: any) => callback(res))
            .catch((err: any) => console.log(err))
    }

    public addNodes(nodes: any, callback: Function) {
        this.NodeModel.insertMany(nodes)
            .then(() => callback())
            .catch((err: any) => console.log(err))
    }

    public getNodes(roadmapId: string, callback: Function) {
        this.NodeModel.find({ roadmapId: roadmapId })
            .then((res: any) => callback(res))
            .catch((err: any) => console.log(err))
    }

    public getOpinions(callback: Function) {
        this.OpinionModel.find()
            .then((res: any) => callback(res))
            .catch((err: any) => console.log(err))
    }

    public updateNodes(nodes: any, callback: Function) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            this.NodeModel.updateOne({ id: node.id }, { tasks: node.tasks })
                .then((res: any) => {
                    if (nodes.length - 1 == i) {
                        callback(res)
                    }
                })
                .catch((err: any) => console.log(err))
        }
    }

    public addRoadmap(roadmap: any, callback: Function) {
        this.RoadmapModel.create(roadmap)
            .then((res: any) => callback(res._id))
            .catch((err: any) => console.log(err))
    }

    public getRoadmap(roadmapId: string, callback: Function) {
        this.RoadmapModel.find({ _id: roadmapId })
            .then((res: any) => callback(res))
            .catch((err: any) => console.log(err))
    }
}