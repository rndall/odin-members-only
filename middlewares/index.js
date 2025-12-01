import { body } from "express-validator"
import { EyeOff, LogOut, Trash2 } from "lucide-static"
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

const validateSecretPasscode = [
	body("passcode")
		.trim()
		.notEmpty()
		.withMessage("Title is required.")
		.custom((value) => value === process.env.SECRET_PASSCODE)
		.withMessage("Incorrect passcode, please try again."),
]

function setFormIcon(_req, res, next) {
	res.locals.formIcon = EyeOff
	next()
}

function setTrashIcon(_req, res, next) {
	res.locals.trashIcon = Trash2
	next()
}

function setLogoutIcon(_req, res, next) {
	res.locals.logoutIcon = LogOut
	next()
}

export {
	validateMessage,
	validateSecretPasscode,
	setFormIcon,
	setTrashIcon,
	setLogoutIcon,
}
