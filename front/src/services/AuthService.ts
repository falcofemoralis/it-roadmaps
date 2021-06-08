import ModelApiService from "./Api";
import { plainToClass } from "class-transformer";

class UsersApiService extends ModelApiService {
    constructor() {
        super("users");
    }

    public async register(credentials: any) {
        const response = await this.post("/register", credentials);
        if (response.status == 200) {
            return await this.login(credentials);
        } else {
            throw new Error(`Error occured with status ${response.status}`)
        }
    }

    public async login(credentials: any) {
        const response = await this.post("/login", credentials);
        if (response.status == 200) {
            return await response.json();
        } else {
            throw new Error(`Error occured with status ${response.status}`)
        }
    }
}

export default new UsersApiService();