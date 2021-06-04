import Task from "./Task";

export enum Opinion {
    Default = "#fff",
    Recommended = "#9900ff",
    Alternative = "#39761d",
    Extra = "#9c9b9a",
}

export class Node {
    name: string;
    id: number;
    roadmapId: number;
    parentId: number | undefined;
    opinion: Opinion | undefined;
    tasks: Task[] | undefined;

    constructor(name: string, options?: any) {
        this.roadmapId = 0;
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