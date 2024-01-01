import { Router } from "express"
import { getAllCourses, getLecturesByCourseId } from "../controllers/course.controllers.js";

const router = Router()

router.get('/', getAllCourses);

router.get('/', getLecturesByCourseId)

export default router