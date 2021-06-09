export default class Task {
    id: string | undefined;
    name: string;
    description: string;
    opinionId: string;
    isCompleted: boolean | undefined;
    time: number | undefined;

    constructor(id: string, name: string, description: string, opinionId: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.opinionId = opinionId;
    }
}