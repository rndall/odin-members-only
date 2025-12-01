import { formatDistanceToNow } from "date-fns"
import { matchedData, validationResult } from "express-validator"
import db from "../db/queries.js"
import CustomNotFoundError from "../errors/CustomNotFoundError.js"
import {
	validateMessage,
	validateSecretPasscode,
} from "../middlewares/index.js"

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

function createMessageGet(_req, res) {
	res.render("messages/form")
}

const createMessagePost = [
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

function getJoin(_req, res) {
	res.render("join")
}

const postJoin = [
	validateSecretPasscode,
	async (req, res) => {
		const userId = req.user?.id

		if (!userId) {
			throw new CustomNotFoundError("User not found!")
		}

		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).render("join", {
				errors: errors.array(),
			})
		}

		try {
			await db.setMember(userId)
			res.redirect("/")
		} catch (err) {
			next(err)
		}
	},
]

async function deleteMessage(req, res, next) {
	const { id } = req.params

	if (!id) {
		throw new CustomNotFoundError("Message ID not found!")
	}

	try {
		await db.deleteMessage(Number(id))
		res.redirect("/")
	} catch (err) {
		next(err)
	}
}

export {
	getIndex,
	createMessageGet,
	createMessagePost,
	getJoin,
	postJoin,
	deleteMessage,
}
