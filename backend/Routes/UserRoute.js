import express from 'express'
import {Register} from '../Controllers/UserController.js'
import { login } from '../Controllers/UserController.js'

const userRoute=express.Router()

userRoute.post('/register',Register)
userRoute.post('/login',login)

export default userRoute