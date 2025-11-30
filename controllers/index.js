import { formatDistanceToNow } from "date-fns"
import { EyeOff } from "lucide-static"
import db from "../db/queries.js"
import CustomNotFoundError from "../errors/CustomNotFoundError.js"

async function getIndex(_req, res) {
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
}

async function createMessageGet(req, res) {
	if (!res.locals.currentUser) {
		return res.redirect("/login")
	}

	res.render("messages/form", { formIcon: EyeOff })
}

export { getIndex, createMessageGet }
