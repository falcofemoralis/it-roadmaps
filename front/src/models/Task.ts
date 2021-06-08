export default class Task {
    id: string | undefined;
    name: string;
    description: string;
    opinionId: string;

    constructor(name: string, description: string, opinionId: string) {
        this.name = name;
        this.description = description;
        this.opinionId = opinionId;
    }
}