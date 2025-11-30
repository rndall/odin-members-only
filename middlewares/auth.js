import { body } from "express-validator"
import { lengthErr } from "../utils/errors.js"

const validateSignUp = [
	body("first_name")
		.trim()
		.notEmpty()
		.withMessage("First name is required.")
		.isLength({ max: 50 })
		.withMessage(`First name ${lengthErr({ max: 50 })}`),
	body("last_name")
		.trim()
		.notEmpty()
		.withMessage("Last name is required.")
		.isLength({ max: 50 })
		.withMessage(`Last name ${lengthErr({ max: 50 })}`),
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required.")
		.isEmail()
		.withMessage("Invalid email address."),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Password is required.")
		.isLength({ min: 8 })
		.withMessage(`Password ${lengthErr({ min: 8 })}`),
	body("password_confirmation")
		.trim()
		.notEmpty()
		.withMessage("Password confirmation is required.")
		.custom((value, { req }) => value === req.body.password)
		.withMessage("Passwords do not match."),
	body("is_admin").toBoolean(),
]

const validateLogin = [
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required.")
		.isEmail()
		.withMessage("Invalid email address."),
	body("password").trim().notEmpty().withMessage("Password is required."),
]

function requireAuth(req, res, next) {
	return req.isAuthenticated() ? next() : res.redirect("/login")
}

function guestOnly(req, res, next) {
	return req.isAuthenticated() ? res.redirect("/") : next()
}

export { validateSignUp, validateLogin, requireAuth, guestOnly }
