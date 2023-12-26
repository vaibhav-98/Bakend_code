import { Router } from "express"
import { getProfile, login, logout, register } from "../controllers/user.controllers.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
import upload from '../middlewares/multer.middleware.js'

const router = Router()

router.post('/register', upload.single("avatar") ,register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getProfile', isLoggedIn,getProfile )

export default router 