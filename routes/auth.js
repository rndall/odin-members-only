import { Router } from "express"
import {
	createUserGet,
	createUserPost,
	loginGet,
	loginPost,
	logout,
} from "../controllers/auth.js"
import { guestOnly } from "../middleware/auth.js"

const router = Router()

/* GET logout user. */
router.get("/log-out", logout)

router.use(guestOnly)

/* GET sign-up form. */
router.get("/sign-up", createUserGet)

/* POST sign-up form. */
router.post("/sign-up", createUserPost)

/* GET login form. */
router.get("/login", loginGet)

/* POST login authentication. */
router.post("/login", loginPost)

export default router
