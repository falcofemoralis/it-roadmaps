import Task from "./Task";

export interface Opinion {
    _id: string;
    name: string;
    color: string;
}

export class Node {
    name: string;
    id: number;
    roadmapId: string;
    parentId: number | undefined;
    opinionId: string | undefined;
    tasks: Task[] | undefined;

    constructor(roadmapId: string, name: string, options?: any) {
        this.roadmapId = roadmapId;
        this.name = name;
        this.id = Date.now() + Math.floor(Math.random() * 1000);

        if (options) {
            this.opinionId = options.opinionId;
            this.tasks = options.tasks;
            this.parentId = options.parentId;
        }
    }
}

export default Node;