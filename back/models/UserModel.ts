import mongoose, { Schema } from 'mongoose';

export default class UserModel {
    userModel: any;

    constructor() {
        const userSchema = new Schema({
            username: { type: String, required: true, minlength: 3 },
            password: { type: String, required: true, minlength: 6 },
            time: { type: Number, required: true }
        });

        this.userModel = mongoose.model("User", userSchema);
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
}