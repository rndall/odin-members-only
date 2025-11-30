import { Router } from "express"
import {
	createMessageGet,
	createMessagePost,
	getIndex,
	getJoin,
	postJoin,
} from "../controllers/index.js"
import { nonMembersOnly, requireAuth } from "../middlewares/auth.js"
import { setFormIcon } from "../middlewares/index.js"

const router = Router()

/* GET home page. */
router.get("/", getIndex)

router.use(setFormIcon)

/* GET join club form. */
router.get("/join", nonMembersOnly, getJoin)

/* POST join club form. */
router.post("/join", nonMembersOnly, postJoin)

/* GET new message form. */
router.get("/new", requireAuth, createMessageGet)

/* POST message. */
router.post("/new", requireAuth, createMessagePost)

export default router
