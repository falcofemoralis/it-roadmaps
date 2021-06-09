import ModelApiService from "./Api";
import User from "@/models/User";
import Progress from "@/models/Progress";

class UsersApiService extends ModelApiService {
    constructor() {
        super("users");
    }

    public async register(credentials: any) {
        const response = await this.post("/register", credentials);

        if (response.status == 200) {
            return await this.login(credentials);
        } else {
            throw new Error(`Error occured with status ${response.status}`);
        }
    }

    public async login(credentials: any) {
        const response = await this.post("/login", credentials);

        if (response.status == 200) {
            const dataJson = await response.json();
            return dataJson.token;
        } else {
            throw new Error(`Error occured with status ${response.status}`);
        }
    }

    public async getUserData() {
        const response = await this.setTokenHeader().get("/userdata");
        const dataJson = await response.json();

        if (response.status == 200) {
            return new User(dataJson.username, dataJson.password);
        } else {
            throw new Error(`Error occured with status ${response.status}`);
        }
    }

    public async updateProgress(roadmapId: string, nodeId: string, taskId: string, isCompleted: boolean) {
        const response = await this.setTokenHeader().put("/progress", { roadmapId: roadmapId, taskId: taskId, isCompleted: isCompleted }, nodeId);

        if (response.status == 200) {
            const dataJson = await response.json();

            return new Progress(dataJson._id, dataJson.nodeId, dataJson.taskId, dataJson.isCompleted, dataJson.time);
        } else {
            throw new Error(`Error occured with status ${response.status}`);
        }
    }

    public async getProgress(roadmapId?: string) {
        const response = await this.setTokenHeader().get("/progress", roadmapId);

        if (response.status == 200) {
            const dataJson = await response.json();

            if (dataJson.length > 0) {
                const progress: Progress[] = [];

                dataJson.forEach((obj: any) => {
                    progress.push(new Progress(obj._id, obj.nodeId, obj.taskId, obj.isCompleted, obj.time));
                })

                return progress;
            }
            return [];
        } else {
            throw new Error(`Error occured with status ${response.status}`);
        }
    }

    public async checkPermission() {
        const response = await this.setTokenHeader().get("/permission");

        if (response.status == 200) {
            const isAdmin = (await response.json()).isAdmin;
            return isAdmin;
        } else {
            throw new Error(`Error occured with status ${response.status}`);
        }
    }
}

export default new UsersApiService();