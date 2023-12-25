import { Router } from "express"
import { getProfile, login, logout, register } from "../controllers/user.controllers.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getPtofile', isLoggedIn ,getProfile)

export default router 