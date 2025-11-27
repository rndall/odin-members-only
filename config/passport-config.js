import { compare } from "bcryptjs"
import { deserializeUser, serializeUser, use } from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { query } from "../db/pool.js"

export function configurePassport() {
	use(
		new LocalStrategy(async (username, password, done) => {
			try {
				/* Implement user query */
				// const { rows } = await query(
				// 	"SELECT * FROM users WHERE username = $1",
				// 	[username],
				// )
				const user = rows[0]

				if (!user) {
					return done(null, false, { message: "Incorrect username" })
				}

				const match = await compare(password, user.password)
				if (!match) {
					return done(null, false, { message: "Incorrect password" })
				}
				return done(null, user)
			} catch (err) {
				return done(err)
			}
		}),
	)

	serializeUser((user, done) => {
		done(null, user.id)
	})

	deserializeUser(async (id, done) => {
		try {
			/* Implement user query */
			// const { rows } = await query("SELECT * FROM users WHERE id = $1", [id])
			const user = rows[0]

			done(null, user)
		} catch (err) {
			done(err)
		}
	})
}
