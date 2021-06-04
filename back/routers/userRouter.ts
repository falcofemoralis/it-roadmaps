import express, { Router } from 'express'
import UserController from '../controllers/UserController';

const userRouter: Router = express.Router()
const userController: UserController = new UserController()

userRouter.get("/test", userController.testdb)

export default userRouter;