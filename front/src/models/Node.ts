import Task from "./Task";

export default class Node {
    name: string;
    id: string;
    roadmapId: string;
    parentId: string | undefined;
    opinionId: string | undefined;
    tasks: Array<Task> | undefined;

    constructor(id: string, roadmapId: string, name: string, options?: any) {
        this.id = id;
        this.roadmapId = roadmapId;
        this.name = name;

        if (options) {
            this.opinionId = options.opinionId;
            this.tasks = options.tasks;
            this.parentId = options.parentId;
        }
    }
}