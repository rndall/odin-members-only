import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import flash from "connect-flash"
import cookieParser from "cookie-parser"
import express, { json, static as static_, urlencoded } from "express"
import createError from "http-errors"
import logger from "morgan"
import passport from "passport"

import { configurePassport } from "./config/passport-config.js"
import { sessionMiddleware } from "./config/session.js"

import authRouter from "./routes/auth.js"
import indexRouter from "./routes/index.js"
import usersRouter from "./routes/users.js"

const app = express()

// view engine setup
app.set("views", join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(static_(join(__dirname, "public")))

app.use(sessionMiddleware)

configurePassport()
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
	res.locals.currentUser = req.user
	res.locals.errors = req.flash("error")
	next()
})

app.use("/", indexRouter)
app.use("/", authRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
	next(createError(404))
})

// error handler
app.use((err, req, res, _next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

export default app
