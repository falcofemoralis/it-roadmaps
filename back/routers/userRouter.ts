import express, { Router } from 'express'
import UserController from '../controllers/UserController';

const userRouter: Router = express.Router()
const userController: UserController = new UserController()

userRouter.get("/userdata", userController.isLoggedIn, userController.getUserData)
userRouter.get("/progress", userController.isLoggedIn, userController.getProgress)

userRouter.post("/register", userController.validateRegistration, userController.register)
userRouter.post("/login", userController.login)

userRouter.put("/progress/:id", userController.isLoggedIn, userController.updateProgress)

export default userRouter;