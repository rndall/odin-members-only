import connectPgSimple from "connect-pg-simple"
import session from "express-session"
import pool from "../db/pool.js"

const PgSession = connectPgSimple(session)

const secret = process.env.SECRET

export const sessionMiddleware = session({
	store: new PgSession({
		pool,
		createTableIfMissing: true,
	}),
	secret,
	resave: false,
	saveUninitialized: false,
})
