import { formatDistanceToNow } from "date-fns"
import { body, matchedData, validationResult } from "express-validator"
import { EyeOff } from "lucide-static"
import db from "../db/queries.js"
import CustomNotFoundError from "../errors/CustomNotFoundError.js"
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

async function getIndex(_req, res, next) {
	try {
		const messages = await db.getAllMessages()

		if (!messages) {
			throw new CustomNotFoundError("Messages not found!")
		}

		const mappedMessages = messages.map((message) => ({
			...message,
			distanceToNow: formatDistanceToNow(new Date(message.created_at), {
				addSuffix: true,
			}),
		}))

		res.render("index", { title: "The Clubhouse", messages: mappedMessages })
	} catch (err) {
		next(err)
	}
}

function setFormIcon(_req, res, next) {
	res.locals.formIcon = EyeOff
	next()
}

const createMessageGet = [
	setFormIcon,
	(_req, res) => {
		console.log(res.locals.formIcon)
		if (!res.locals.currentUser) {
			return res.redirect("/login")
		}

		res.render("messages/form")
	},
]

const createMessagePost = [
	setFormIcon,
	validateMessage,
	async (req, res, next) => {
		const userId = req.user?.id

		if (!userId) {
			throw new CustomNotFoundError("User not found!")
		}

		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.render("messages/form", { errors: errors.array(), message: req.body })
		}

		const message = matchedData(req)

		try {
			await db.insertMessage(userId, message)
			res.redirect("/")
		} catch (err) {
			next(err)
		}
	},
]

export { getIndex, createMessageGet, createMessagePost }
