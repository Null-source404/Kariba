const fs = require('node:fs/promises')
const path = require('node:path')
const pool = require('./pool')

async function initializeSchema() {
	const schemaPath = path.join(__dirname, 'schema.sql')
	const schema = await fs.readFile(schemaPath, 'utf8')
	const statements = schema.split(';').map((statement) => statement.trim()).filter(Boolean)
	for (const statement of statements) {
		await pool.query(statement)
	}
}

module.exports = { initializeSchema }
