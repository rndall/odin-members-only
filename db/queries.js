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

export default { insertUser }
