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
        try {
            return await this.RoadmapModel.find();
        } catch (err) {
            throw err;
        }
    }

    public async addNodes(nodes: any) {
        try {
            await this.NodeModel.insertMany(nodes);
        } catch (err) {
            throw err;
        }
    }

    public async getNodes(roadmapId: string) {
        try {
            return await this.NodeModel.find({ roadmapId: roadmapId });
        } catch (err) {
            throw err;
        }
    }

    public async getOpinions() {
        try {
            return await this.OpinionModel.find()
        } catch (err) {
            throw err;
        }
    }

    public async updateNodes(nodes: any) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            try {
                await this.NodeModel.updateOne({ id: node.id }, { tasks: node.tasks });
            } catch (err) {
                throw err;
            }
        }
    }

    public async addRoadmap(roadmap: any) {
        try {
            const res = await this.RoadmapModel.create(roadmap);
            return res._id;
        } catch (err) {
            throw err;
        }
    }

    public async getRoadmap(roadmapId: string) {
        try {
            return this.RoadmapModel.find({ _id: roadmapId });
        } catch (err) {
            throw err;
        }
    }
}