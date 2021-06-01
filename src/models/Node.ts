export enum Opinion {
    Recommended,
    Alternative,
    Extra,
}

export class Node {
    name: string;
    opinion: Opinion | undefined;
    childNodes: Node[] | undefined;
    tasks: string[] | undefined;

    constructor(name: string, options: any) {
        this.name = name;
        this.opinion = options.opinion;
        this.childNodes = options.childNodes;
        this.tasks = options.tasks;
    }
}

export default Node;