import { Router } from "express";
import userService from "../service/userService.js";

const userRoute = Router()

userRoute.get('/', userService.getAllUsers)
userRoute.post('/signup', userService.createUser)
userRoute.post('/login', userService.loginUser)
userRoute.post('/sendlink', userService.sendLink)
// userRoute.post('/verify', userService.verifyKey)
userRoute.post('/reset',userService.resetPassword)

export default userRoute;
