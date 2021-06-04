import Task from "./Task";

export class Opinion {
    id: string;
    name: string;
    color: string;

    constructor(id: string, name: string, color: string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

export class Node {
    name: string;
    id: number;
    roadmapId: string;
    parentId: number | undefined;
    opinion: Opinion | undefined;
    tasks: Task[] | undefined;

    constructor(roadmapId: string, name: string, options?: any) {
        this.roadmapId = roadmapId;
        this.name = name;
        this.id = Date.now() + Math.floor(Math.random() * 1000);

        if (options) {
            this.opinion = options.opinion;
            this.tasks = options.tasks;
            this.parentId = options.parentId;
        }
    }
}

export default Node;