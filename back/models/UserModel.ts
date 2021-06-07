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
        try {
            return await this.userModel.find({ username: username });
        } catch (err) {
            throw err;
        }
    }

    public async addUser(username: string, password: string, time: number) {
        try {
            await this.userModel.create({ username: username, password: password, time });
        } catch (err) {
            throw err;
        }
    }

    public async findUser(username: string) {
        try {
            return await this.userModel.find({ username: username });
        } catch (err) {
            throw err;
        }
    }

    public async updateLastLogin(userId: string, time: number) {
        try {
            return await this.userModel.updateOne({ _id: userId }, { time: time });
        } catch (err) {
            throw err;
        }
    }
}