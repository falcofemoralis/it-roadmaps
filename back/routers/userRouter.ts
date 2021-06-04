import express, { Router } from 'express'
import UserController from '../controllers/UserController';

const userRouter: Router = express.Router()
const userController: UserController = new UserController()

userRouter.get("/", (req, res) => { res.status(200).send(`[{"name": "Ivan"}, {"name": "Anton"}]`) })

export default userRouter;