import UserModel from '../models/UserModel';
import { HttpCodes } from '../constants/HttpCodes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser {
    _id: string,
    username: string,
    password: string,
    time: number
}

export default class UserController {
    userModel: UserModel;
    secretKey: string;

    constructor() {
        this.userModel = new UserModel();
        this.secretKey = "abba";
    }

    // Middlware
    public validateRegistration = (req: any, res: any, next: any): void => {
        // username min length 3
        if (!req.body.username || req.body.username.length < 3) {
            return res.status(HttpCodes.BadRequest).send();
        }

        // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(HttpCodes.BadRequest).send();
        }

        // password (repeat) does not match
        if (
            !req.body.rePassword ||
            req.body.password != req.body.rePassword
        ) {
            return res.status(HttpCodes.BadRequest).send();
        }

        next();
    }

    public register = async (req: any, res: any) => {
        const username = req.body.username;
        const password = req.body.password;

        let users = [];

        try {
            users = await this.userModel.checkExistUser(username);
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
            return;
        }

        if (users.length > 0) {
            res.status(HttpCodes.BadRequest).send();
            return;
        }

        // Username is avalible, creating hashed password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
            return;
        }

        // Starting registration 
        if (hashedPassword) {
            try {
                await this.userModel.addUser(username, hashedPassword, Date.now());
                res.status(HttpCodes.OK).send();
            } catch (err) {
                res.status(HttpCodes.InternalServerError).send(err);
            }
        }
    }

    public login = async (req: any, res: any) => {
        const username = req.body.username;
        const password = req.body.password;

        // Check if user with username exists in database
        let user: IUser;
        try {
            const users = await this.userModel.findUser(username)

            if (!users.length) {
                res.status(HttpCodes.Unauthorized).send();
                return;
            }

            user = users[0];
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
            return;
        }

        // Compare password with hash password from database
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username: user.username, userId: user._id }, this.secretKey, { expiresIn: "7d" });

            try {
                await this.userModel.updateLastLogin(user._id, Date.now());
                return res.status(HttpCodes.OK).send({ token: token });
            } catch (err) {
                res.status(HttpCodes.InternalServerError).send(err);
                return;
            }
        } else {
            res.status(HttpCodes.Unauthorized).send();
        }
    }

    public isLoggedIn = async (req: any, res: any, next: any) => {
        try {
            const token = req.headers.authorization;
            req.userData = jwt.verify(token, this.secretKey);

            next();
        } catch (err) {
            return res.status(HttpCodes.Unauthorized).send();
        }
    }

    public getUserData = async (req: any, res: any) => {
        res.status(HttpCodes.OK).send(req.userData);
    }

    public updateProgress = async (req: any, res: any) => {
        try {
            const userId = req.userData.userId;
            const roadmapId = req.body.roadmapId;
            const nodeId = req.params.id;
            const taskId = req.body.taskId;
            const isCompleted = req.body.isCompleted;

            const insertedProgress = await this.userModel.updateProgress(userId, roadmapId, nodeId, taskId, isCompleted, Date.now());
            res.status(HttpCodes.OK).send(insertedProgress);
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send();
        }
    }

    public getProgress = async (req: any, res: any) => {
        try {
            const userId = req.userData.userId;
            const roadmapId = req.params.id;
            const progress = await this.userModel.getProgress(userId, roadmapId);
            res.status(HttpCodes.OK).send(progress);
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send();
        }
    }

    public getAllProgress = async (req: any, res: any) => {
        try {
            const userId = req.userData.userId;
            const progress = await this.userModel.getAllProgress(userId);
            res.status(HttpCodes.OK).send(progress);
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send();
        }
    }

    public checkPermission = async (req: any, res: any) => {
        try {
            const userId = req.userData.userId;
            const user = await this.userModel.checkUser(userId);
            res.status(HttpCodes.OK).send({ isAdmin: user.isAdmin ?? false });
        } catch (err) {
            res.status(HttpCodes.InternalServerError).send(err);
        }
    }

}