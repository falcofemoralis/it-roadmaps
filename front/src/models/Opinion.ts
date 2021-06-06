export default class Opinion {
    _id: string;
    name: string;
    color: string;

    constructor(id: string, name: string, color: string) {
        this._id = id;
        this.name = name;
        this.color = color;
    }
}