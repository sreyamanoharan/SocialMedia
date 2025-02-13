import express from 'express'
import {Register} from '../Controllers/UserController.js'
import { login } from '../Controllers/UserController.js'
import { newPosts } from '../Controllers/UserController.js'
import { getAllPosts } from '../Controllers/UserController.js'
const userRoute=express.Router()

userRoute.post('/register',Register)
userRoute.post('/login',login)
userRoute.post('/add-post',newPosts)
userRoute.get('/get-posts',getAllPosts)


export default userRoute