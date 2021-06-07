import express, { Router } from 'express'
import UserController from '../controllers/UserController';

const userRouter: Router = express.Router()
const userController: UserController = new UserController()

userRouter.get("/test", userController.isLoggedIn, (req, res) => { res.status(200).send("ok") })

userRouter.post("/register", userController.validateRegistration, userController.register)
userRouter.post("/login", userController.login)

export default userRouter;