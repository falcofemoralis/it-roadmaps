import { Opinion } from "./Node";

export class Task {
    name: string;
    description: string;
    opinion: Opinion;

    constructor(name: string, opinion: Opinion) {
        this.name = name;
        this.opinion = opinion;
        this.description = "This is tech that creates new blocks and replace them as new on html page";
    }
}

export default Task;