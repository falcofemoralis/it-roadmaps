import mongoose, { Schema } from 'mongoose';

export default class UserModel {
    userModel: any;
    userProgress: any;

    constructor() {
        const userSchema = new Schema({
            username: { type: String, required: true, minlength: 3 },
            password: { type: String, required: true, minlength: 6 },
            time: { type: Number, required: true },
            isAdmin: { type: Boolean, default: false }
        });

        this.userModel = mongoose.model("User", userSchema);

        const progressSchema = new Schema({
            userId: { type: String, required: true },
            roadmapId: { type: String, required: true },
            nodeId: { type: String, required: true },
            taskId: { type: String, required: true },
            isCompleted: { type: Boolean, required: true },
            time: { type: Number, required: true }
        })
        this.userProgress = mongoose.model("Progress", progressSchema)
    }

    public async checkExistUser(username: string) {
        return await this.userModel.find({ username: username });
    }

    public async addUser(username: string, password: string, time: number) {
        await this.userModel.create({ username: username, password: password, time });
    }

    public async findUser(username: string) {
        return await this.userModel.find({ username: username });
    }

    public async updateLastLogin(userId: string, time: number) {
        return await this.userModel.updateOne({ _id: userId }, { time: time });
    }

    public async updateProgress(userId: string, roadmapId: string, nodeId: string, taskId: string, isCompleted: boolean, time: number) {
        const progressNode = { userId: userId, roadmapId: roadmapId, nodeId: nodeId, taskId: taskId, time: time };
        const result = await this.userProgress.find(progressNode);

        if (result.length > 0) {
            return await this.userProgress.findOneAndUpdate(progressNode, { isCompleted: isCompleted })
        } else {
            return await this.userProgress.create(Object.assign(progressNode, { isCompleted: isCompleted }));
        }
    }

    public async getProgress(userId: string, roadmapId: string) {
        return await this.userProgress.find({ userId: userId, roadmapId: roadmapId });
    }

    public async getAllProgress(userId: string) {
        return await this.userProgress.find({ userId: userId }).sort({ time: 1 });
    }

    public async checkUser(userId: string) {
        return await this.userModel.findOne({ _id: userId });
    }
}