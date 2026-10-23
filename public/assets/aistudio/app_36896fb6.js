require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { initializeSchema } = require('./db/schema')

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/', require('./routes/auth'))
app.use('/', require('./routes/listings'))
app.use('/', require('./routes/borrow_requests'))

app.use((error, _req, res, _next) => {
	console.error(error)
	return res.status(500).json({ error: 'An unexpected server error occurred.' })
})

const port = process.env.PORT || 3000
initializeSchema()
	.then(() => app.listen(port, () => console.log(`Kariba API listening on port ${port}`)))
	.catch((error) => {
		console.error('Could not initialize the database:', error.message)
		process.exitCode = 1
	})