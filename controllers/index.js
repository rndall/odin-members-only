import { EyeOff } from "lucide-static"
import db from "../db/queries.js"
import CustomNotFoundError from "../errors/CustomNotFoundError.js"

async function getIndex(_req, res) {
	const messages = await db.getAllMessages()

	if (!messages) {
		throw new CustomNotFoundError("Messages not found!")
	}

	res.render("index", { title: "The Clubhouse", messages })
}

async function createMessageGet(req, res) {
	if (!res.locals.currentUser) {
		return res.redirect("/login")
	}

	res.render("messages/form", { formIcon: EyeOff })
}

export { getIndex, createMessageGet }
