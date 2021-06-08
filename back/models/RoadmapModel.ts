import e from 'express';
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

    public async getRoadmaps() {
        return await this.RoadmapModel.find();
    }

    public async addNodes(nodes: any) {
        await this.NodeModel.insertMany(nodes);
    }

    public async getNodes(roadmapId: string) {
        return await this.NodeModel.find({ roadmapId: roadmapId });
    }

    public async getOpinions() {
        return await this.OpinionModel.find()
    }

    public async updateNodes(nodes: any) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            await this.NodeModel.updateOne({ id: node.id }, { tasks: node.tasks });
        }
    }

    public async addRoadmap(roadmap: any) {
        const res = await this.RoadmapModel.create(roadmap);
        return res._id;
    }

    public async getRoadmap(roadmapId: string) {
        return this.RoadmapModel.find({ _id: roadmapId });
    }
}