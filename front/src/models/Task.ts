import { Opinion } from "./Node";

export class Task {
    name: string;
    description: string;
    opinion: Opinion | undefined;

    constructor(name: string) {
        this.name = name;
        this.description = "This is tech that creates new blocks and replace them as new on html page";
    }
}

export default Task;