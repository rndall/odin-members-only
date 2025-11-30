import { Router } from "express"
import {
	createMessageGet,
	createMessagePost,
	getIndex,
} from "../controllers/index.js"

const router = Router()

/* GET home page. */
router.get("/", getIndex)

/* GET new message form. */
router.get("/new", createMessageGet)

/* POST message. */
router.post("/new", createMessagePost)

export default router
