import ModelApiService from "./Api";
import { plainToClass } from "class-transformer";
import Node from "@/models/Node";
import Opinion from "@/models/Opinion";
import Roadmap from "@/models/Roadmap";

class RoadmapsApiService extends ModelApiService {
    constructor() {
        super("roadmaps");
    }

    public async getOpinions() {
        return plainToClass(Opinion, await this.get("/opinions"));
    }

    public async getRoadmap(id: string) {
        return plainToClass(Roadmap, await this.get(`/${id}`))[0];
    }

    public async getRoadmapData(id: string) {
        return plainToClass(Node, await this.get(`/nodes/${id}`));
    }

    public async saveRoadmapData(data: any) {
        await this.post("/nodes", data);
    }

    public async updateRoadmapData(data: any) {
        await this.put("/nodes", data);
    }

    public async getRoadmaps() {
        return plainToClass(Roadmap, await this.get("/all"));
    }

    public async saveRoadmap(roadmap: Roadmap) {
        const response = await this.post("/", roadmap);
        const jsonData = await response.json();

        if (response) {
            return jsonData.id;
        }
    }
}

export default new RoadmapsApiService();