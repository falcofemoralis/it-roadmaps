export default class Roadmap {
    _id: string | undefined;
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}