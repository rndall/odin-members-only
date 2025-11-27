#! /usr/bin/env node

import { Client } from "pg"

const SQL = `
CREATE TABLE IF NOT EXISTS "user" (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_member BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

async function main() {
	console.log("seeding...")
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	})
	await client.connect()

	try {
		await client.query(SQL)
		console.log("done")
	} catch (err) {
		console.error(err)
	} finally {
		await client.end()
	}
}

main()
