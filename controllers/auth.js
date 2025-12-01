import { hash } from "bcryptjs"
import { matchedData, validationResult } from "express-validator"
import passport from "passport"
import db from "../db/queries.js"
import { validateLogin, validateSignUp } from "../middlewares/auth.js"
import { formQueryErr } from "../utils/errors.js"

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
			const newUser = await db.insertUser({ ...rest, password_hash })
			req.login(newUser, (err) => {
				if (err) {
					return next(err)
				}
				res.redirect("/")
			})
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
