import pool from "./pool.js"

async function insertUser({
	first_name,
	last_name,
	email,
	password_hash,
	is_admin,
}) {
	await pool.query(
		`
      INSERT INTO "user" (first_name, last_name, email, password_hash, is_admin)
        VALUES ($1, $2, $3, $4, $5)
    `,
		[first_name, last_name, email, password_hash, is_admin],
	)
}

async function getUserById(id) {
	const { rows } = await pool.query('SELECT * FROM "user" WHERE id = $1', [id])

	return rows[0] || null
}

async function getUserByEmail(email) {
	const { rows } = await pool.query('SELECT * FROM "user" WHERE email = $1', [
		email,
	])

	return rows[0] || null
}

async function getAllMessages() {
	const { rows } = await pool.query(
		`
		  SELECT m.*,
				u.first_name,
				u.last_name
			FROM message AS m
			JOIN "user" AS u
			  ON m.user_id = u.id
		`,
	)

	return rows
}

export default { insertUser, getUserById, getUserByEmail, getAllMessages }
