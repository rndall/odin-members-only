import { body } from "express-validator"
import { EyeOff } from "lucide-static"
import { lengthErr } from "../utils/errors.js"

const validateMessage = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title is required.")
		.isLength({ max: 255 })
		.withMessage(`Title ${lengthErr({ max: 50 })}`),
	body("content").trim().notEmpty().withMessage("Message content is required."),
]
function setFormIcon(_req, res, next) {
	res.locals.formIcon = EyeOff
	next()
}

export { validateMessage, setFormIcon }
