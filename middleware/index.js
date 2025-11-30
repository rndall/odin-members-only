import { EyeOff } from "lucide-static"

function setFormIcon(_req, res, next) {
	res.locals.formIcon = EyeOff
	next()
}

export { setFormIcon }
