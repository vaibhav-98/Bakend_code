import { Router } from "express"
import { getProfile, login, logout, register } from "../controllers/user.controllers"

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getPtofile', getProfile)

export default router 