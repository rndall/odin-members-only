import { Router } from "express"
import { createMessageGet, getIndex } from "../controllers/index.js"

const router = Router()

/* GET home page. */
router.get("/", getIndex)

/* GET new message form. */
router.get("/new", createMessageGet)

export default router
