const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db/pool')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// POST request --> register a new user
router.post('/register', async (req, res, next) => {
	const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
	const password = req.body.password

	if (!email || typeof password !== 'string' || password.length < 8) {
		return res.status(400).json({ error: 'A valid email and password of at least 8 characters are required.' })
	}

	try {
		const passwordHash = await bcrypt.hash(password, 12)
		const [result] = await pool.execute(
			'INSERT INTO users (email, password_hash) VALUES (?, ?)',
			[email, passwordHash],
		)
		return res.status(201).json({ id: result.insertId, email })
	} catch (error) {
		if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'An account with that email already exists.' })
		return next(error)
	}
})

// POST request --> log in an existing user and return a JWT token
router.post('/login', async (req, res, next) => {
	const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
	const password = req.body.password

	if (!email || typeof password !== 'string') {
		return res.status(400).json({ error: 'Email and password are required.' })
	}

	try {
		const [rows] = await pool.execute(
			'SELECT id, email, password_hash FROM users WHERE email = ?',
			[email],
		)
		const user = rows[0]
		if (!user || !(await bcrypt.compare(password, user.password_hash))) {
			return res.status(401).json({ error: 'Email or password is incorrect.' })
		}

		const token = jwt.sign({}, process.env.JWT_SECRET, {
			subject: String(user.id),
			expiresIn: '7d',
		})
		return res.json({ token })
	} catch (error) {
		return next(error)
	}
})

// GET request --> get the authenticated user's information
router.get('/me', requireAuth, async (req, res, next) => {
	try {
		const [rows] = await pool.execute(
			'SELECT id, email FROM users WHERE id = ?',
			[req.user.id],
		)
		if (!rows.length) return res.status(404).json({ error: 'User not found.' })
		return res.json(rows[0])
	} catch (error) {
		return next(error)
	}
})

module.exports = router
