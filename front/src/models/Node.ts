import Task from "./Task";

export default class Node {
    name: string;
    id: number;
    roadmapId: string;
    parentId: number | undefined;
    opinionId: string | undefined;
    tasks: Array<Task> | undefined;

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