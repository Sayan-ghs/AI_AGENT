import express from "express"
import { login , signup, updateUser, logout} from "../controller/user"
import {authenticate} from "../middlewares/auth"
const router = express.Router()

router.post('/update-user',authenticate,updateUser)
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)

export default router 