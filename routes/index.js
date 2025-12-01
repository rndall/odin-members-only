import { Router } from "express"
import {
	createMessageGet,
	createMessagePost,
	deleteMessage,
	getIndex,
	getJoin,
	postJoin,
} from "../controllers/index.js"
import { adminOnly, nonMembersOnly, requireAuth } from "../middlewares/auth.js"
import { setFormIcon, setTrashIcon } from "../middlewares/index.js"

const router = Router()

/* GET home page. */
router.get("/", setTrashIcon, getIndex)

/* GET join club form. */
router.get("/join", nonMembersOnly, getJoin)

/* POST join club form. */
router.post("/join", nonMembersOnly, postJoin)

router.use(setFormIcon)

/* GET new message form. */
router.get("/new", requireAuth, createMessageGet)

/* POST message. */
router.post("/new", requireAuth, createMessagePost)

/* DELETE message. */
router.delete("/:id", adminOnly, deleteMessage)

export default router
