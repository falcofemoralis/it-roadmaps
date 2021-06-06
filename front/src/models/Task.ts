import { Opinion } from "./Node";

export class Task {
    name: string;
    description: string;
    opinionId: string | undefined;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export default Task;