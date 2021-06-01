import { Opinion } from "./Node";

export class Task {
    name: string;
    opinion: Opinion;

    constructor(name: string, opinion: Opinion) {
        this.name = name;
        this.opinion = opinion;
    }
}

export default Task;