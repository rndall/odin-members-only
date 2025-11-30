import { Router } from "express"
import {
	createMessageGet,
	createMessagePost,
	getIndex,
} from "../controllers/index.js"
import { requireAuth } from "../middleware/auth.js"
import { setFormIcon } from "../middleware/index.js"

const router = Router()

/* GET home page. */
router.get("/", getIndex)

router.use(setFormIcon)

/* GET new message form. */
router.get("/new", requireAuth, createMessageGet)

/* POST message. */
router.post("/new", requireAuth, createMessagePost)

export default router
