import { Router } from "express"
import passport from "passport"
import { createUserGet, createUserPost } from "../controllers/auth.js"

const router = Router()

/* GET sign-up form. */
router.get("/sign-up", createUserGet)

/* POST sign-up form. */
router.post("/sign-up", createUserPost)

/* POST login authentication. */
router.post(
	"/log-in",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/",
	}),
)

/* GET logout user. */
router.get("/log-out", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
		res.redirect("/")
	})
})

export default router
