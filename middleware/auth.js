function requireAuth(req, res, next) {
	return req.isAuthenticated() ? next() : res.redirect("/login")
}

function guestOnly(req, res, next) {
	return req.isAuthenticated() ? res.redirect("/") : next()
}

export { requireAuth, guestOnly }
