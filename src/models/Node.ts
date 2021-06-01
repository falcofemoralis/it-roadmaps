import Task from "./Task";

export enum Opinion {
    Recommended = "#9900ff",
    Alternative = "#39761d",
    Extra = "#9c9b9a",
}

export class Node {
    name: string;
    opinion: Opinion | undefined;
    childNodes: Node[] | undefined;
    tasks: Task[] | undefined;

    constructor(name: string, options: any) {
        this.name = name;
        this.opinion = options.opinion;
        this.childNodes = options.childNodes;
        this.tasks = options.tasks;
    }
}

export default Node;