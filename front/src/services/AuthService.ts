import ModelApiService from "./Api";
import User from "@/models/User";

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

    public async updateProgress(roadmapId: string, nodeId: string, isCompleted: boolean) {
        const response = await this.setTokenHeader().put("/progress", { roadmapId: roadmapId, isCompleted: isCompleted }, nodeId);

        if (response.status == 200) {
            return;
        } else {
            throw new Error(`Error occured with status ${response.status}`);
        }
    }
}

export default new UsersApiService();