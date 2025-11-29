import { MessageCircle } from "lucide-static"
import db from "../db/queries.js"
import CustomNotFoundError from "../errors/CustomNotFoundError.js"

async function getIndex(req, res) {
	const messages = await db.getAllMessages()

	if (!messages) {
		throw new CustomNotFoundError("Messages not found!")
	}

	const icon = MessageCircle.replace('stroke-width="2"', 'stroke-width="2.5"')
	res.render("index", { title: "The Clubhouse", messages, icon })
}

export { getIndex }
