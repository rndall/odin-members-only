import { Router } from "express"
import {
	createUserGet,
	createUserPost,
	loginGet,
	loginPost,
	logout,
} from "../controllers/auth.js"

const router = Router()

/* GET sign-up form. */
router.get("/sign-up", createUserGet)

/* POST sign-up form. */
router.post("/sign-up", createUserPost)

/* GET login form. */
router.get("/login", loginGet)

/* POST login authentication. */
router.post("/login", loginPost)

/* GET logout user. */
router.get("/log-out", logout)

export default router
