import { hash } from "bcryptjs"
import { body, matchedData, validationResult } from "express-validator"
import passport from "passport"
import db from "../db/queries.js"
import { formQueryErr, lengthErr } from "../utils/errors.js"

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

async function createUserGet(_req, res) {
	res.render("sign-up-form")
}

const createUserPost = [
	validateSignUp,
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.render("sign-up-form", { errors: errors.array(), user: req.body })
		}

		const { password, ...rest } = matchedData(req)

		try {
			const password_hash = await hash(password, 10)
			await db.insertUser({ ...rest, password_hash })
			res.redirect("/")
		} catch (err) {
			// next(err)
			const errors = [formQueryErr(err)]
			return res.status(400).render("sign-up-form", { errors, user: req.body })
		}
	},
]

async function loginGet(_req, res) {
	res.render("login-form")
}

const loginPost = [
	validateLogin,
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	}),
]

async function logout(req, res, next) {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
		res.redirect("/")
	})
}

export { createUserGet, createUserPost, loginGet, loginPost, logout }
