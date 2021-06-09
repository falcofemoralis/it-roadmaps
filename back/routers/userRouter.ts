import express, { Router } from 'express'
import UserController from '../controllers/UserController';

const userRouter: Router = express.Router()
const userController: UserController = new UserController()

userRouter.get("/progress/:id", userController.isLoggedIn, userController.getProgress)
userRouter.get("/progress", userController.isLoggedIn, userController.getAllProgress)
userRouter.get("/userdata", userController.isLoggedIn, userController.getUserData)
userRouter.get("/permission", userController.isLoggedIn, userController.checkPermission)

userRouter.post("/register", userController.validateRegistration, userController.register)
userRouter.post("/login", userController.login)

userRouter.put("/progress/:id", userController.isLoggedIn, userController.updateProgress)

export default userRouter;