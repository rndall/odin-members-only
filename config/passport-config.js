import { compare } from "bcryptjs"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import db from "../db/queries.js"

export function configurePassport() {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email" },
			async (email, password, done) => {
				try {
					const user = await db.getUserByEmail(email)

					if (!user) {
						return done(null, false, { message: "Incorrect email" })
					}

					const match = await compare(password, user.password_hash)
					if (!match) {
						return done(null, false, { message: "Incorrect password" })
					}
					return done(null, user)
				} catch (err) {
					return done(err)
				}
			},
		),
	)

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await db.getUserById(Number(id))

			done(null, user)
		} catch (err) {
			done(err)
		}
	})
}
