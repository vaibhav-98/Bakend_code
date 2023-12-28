import { Router } from "express"
import { changePassword, forgortPassword, getProfile, login, logout, register, resetPassword, updateUser } from "../controllers/user.controllers.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
import upload from '../middlewares/multer.middleware.js'

const router = Router()

router.post('/register', upload.single("avatar") ,register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getProfile', isLoggedIn,getProfile ) 
router.post('/forgortPassword', forgortPassword)
router.post('/reset/:resetToken', resetPassword)
router.post('/change-password', isLoggedIn , changePassword)  
router.put('/update', isLoggedIn, upload.single("avatar"), updateUser) 

export default router 