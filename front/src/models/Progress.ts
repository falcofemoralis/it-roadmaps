import Task from "./Task";

export class ProgressTask {
    task: Task
    date: string

    constructor(task: Task, date: string) {
        this.task = task;
        this.date = date;
    }
}

export default class Progress {
    id: string;
    nodeId: string;
    taskId: string;
    isCompleted: boolean;
    time: number;

    constructor(id: string, nodeId: string, taskId: string, isCompleted: boolean, time: number) {
        this.id = id;
        this.nodeId = nodeId;
        this.taskId = taskId;
        this.isCompleted = isCompleted;
        this.time = time;
    }
}