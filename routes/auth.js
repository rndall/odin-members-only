import { hash } from "bcryptjs"
import { Router } from "express"
import { authenticate } from "passport"

const router = Router()

/* GET sign-up form. */
// router.get("/sign-up", (_req, res) => res.render("sign-up-form"))

/* POST sign-up form. */
router.post("/sign-up", async (req, res, next) => {
	try {
		const hashedPassword = await hash(req.body.password, 10)
		/* Implement user query */
		// await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
		// 	req.body.username,
		// 	hashedPassword,
		// ])
		res.redirect("/")
	} catch (err) {
		console.error(err)
		next(err)
	}
})

/* POST login authentication. */
router.post(
	"/log-in",
	authenticate("local", {
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
