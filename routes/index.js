import { Router } from "express"
import { getIndex } from "../controllers/index.js"

const router = Router()

/* GET home page. */
router.get("/", getIndex)

export default router
