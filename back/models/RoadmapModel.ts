import mongoose, { Schema } from 'mongoose';


export default class RoadmapModel {
    Opinion: any;
    Roadmap: any;

    constructor() {
        const nodeScheme = new Schema({
            roadmapId: { type: String, required: true },
            name: { type: String, required: true },
            id: { type: Number, required: true },
            parentId: { type: Number },
            tasks: {
                type: [{
                    name: { type: String, required: true },
                    description: { type: String, required: true },
                    opinionId: { type: String }
                }]
            },
            opinionId: { type: String }
        });
        this.Roadmap = mongoose.model("Roadmap", nodeScheme);

        const opinionScheme = new Schema({ _id: String, name: String, color: String });
        this.Opinion = mongoose.model("opinion", opinionScheme);
    }

    public addNodes(nodes: any, callback: Function) {
        this.Roadmap.insertMany(nodes)
            .then(() => callback())
            .catch((err: any) => console.log(err))
    }

    public getNodes(callback: Function) {
        this.Roadmap.find()
            .then((res: any) => callback(res))
            .catch((err: any) => console.log(err))
    }

    public getOpinions(callback: Function) {
        this.Opinion.find()
            .then((res: any) => callback(res))
            .catch((err: any) => console.log(err))
    }

    public updateNodes(nodes: any, callback: Function) {
        console.log(nodes);

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            this.Roadmap.updateOne({ id: node.id }, { tasks: node.tasks })
                .then((res: any) => {
                    if (nodes.length - 1 == i) {
                        callback(res)
                    }
                })
                .catch((err: any) => console.log(err))
        }
    }
}