import ModelApiService from "./Api";
import Node from "@/models/Node";
import Opinion from "@/models/Opinion";
import Roadmap from "@/models/Roadmap";
import Task from "@/models/Task";

class RoadmapsApiService extends ModelApiService {
    constructor() {
        super("roadmaps");
    }

    public async getOpinions() {
        const response = await this.get("/opinions");

        if (response.status == 200) {
            const opinions: Opinion[] = [];
            const dataJson = await response.json();

            dataJson.forEach((obj: any) => {
                opinions.push(new Opinion(obj._id, obj.name, obj.color));
            });
            return opinions;
        } else {
            throw new Error(`Error code: ${response.status}`);
        }
    }

    public getOpinionById(opinions: Opinion[], id: string) {
        return opinions.find(
            (opinion: Opinion) => opinion.id === id
        )
    }

    public async getRoadmap(id: string) {
        const response = await this.get(`/${id}`);

        if (response.status == 200) {
            const dataJson = await response.json();

            return new Roadmap(dataJson._id, dataJson.name, dataJson.description);
        } else {
            throw new Error(`Error code: ${response.status}`);
        }
    }

    public async getRoadmapData(id?: string) {
        const response = await this.get("/nodes", id);

        if (response.status == 200) {
            const dataJson = await response.json();
            const roadmapData: Node[] = [];

            dataJson.forEach((obj: any) => {
                const tasks: Task[] = [];
                obj.tasks.forEach((task: any) => {
                    tasks.push(new Task(task._id, task.name, task.description, task.opinionId));
                })
                roadmapData.push(new Node(obj._id, obj.roadmapId, obj.name, { opinionId: obj.opinionId, tasks: tasks, parentId: obj.parentId }));
            });

            return roadmapData;
        } else {
            throw new Error(`Error code: ${response.status}`)
        }
    }

    public async saveNode(node: Node) {
        const response = await this.post("/node", node);

        if (response.status == 200) {
            const dataJson = await response.json();
            return dataJson.id;
        } else {
            throw new Error(`Error code: ${response.status}`)
        }
    }

    public async updateNode(nodeId: string, data: any) {
        const response = await this.put("/node", data, nodeId);

        if (response.status == 200) {
            const dataJson = await response.json();

            const tasks: Task[] = [];
            dataJson.tasks.forEach((task: any) => {
                tasks.push(new Task(task._id, task.name, task.description, task.opinionId));
            });

            return new Node(dataJson._id, dataJson.roadmapId, dataJson.name, { opinionId: dataJson.opinionId, tasks: tasks, parentId: dataJson.parentId });
        } else {
            throw new Error(`Error code: ${response.status}`)
        }
    }

    public async getRoadmaps() {
        const response = await this.get("/all");

        if (response.status == 200) {
            const dataJson = await response.json();
            const roadmaps: Roadmap[] = [];

            dataJson.forEach((obj: any) => {
                roadmaps.push(new Roadmap(obj._id, obj.name, obj.description));
            })
            return roadmaps;
        } else {
            throw new Error(`Error code: ${response.status}`)
        }
    }

    public async saveRoadmap(roadmap: Roadmap) {
        const response = await this.post("/", roadmap);

        if (response.status == 200) {
            const dataJson = await response.json();
            return dataJson.id;
        } else {
            throw new Error(`Error code: ${response.status}`);
        }
    }
}

export default new RoadmapsApiService();