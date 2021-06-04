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
                    opinion: { type: Number }
                }]
            },
            opinion: { type: Number }
        });
        this.Roadmap = mongoose.model("Roadmap", nodeScheme);

        const opinionScheme = new Schema({ _id: String, name: String, color: String });
        this.Opinion = mongoose.model("opinion", opinionScheme);
    }

    public addNodes(nodes: any) {
        this.Roadmap.insertMany(nodes)
            .then(() => console.log("Сохранен объект"))
            .catch((err: any) => console.log(err))
            .finally(() => mongoose.disconnect());
    }

    public getNodes() {

    }

    public getOpinions(callback: Function) {
        this.Opinion.find()
            .then((res: any) => callback(res))
            .catch((err: any) => console.log(err))
            .finally(() => mongoose.disconnect());
    }

}