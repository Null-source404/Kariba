// Verify the bearer token and expose its subject as req.user.id.
const jwt = require('jsonwebtoken')

function requireAuth(req, res, next) {
	const authorization = req.get('authorization') || ''
	const match = authorization.match(/^Bearer\s+(.+)$/i)

	if (!match) return res.status(401).json({ error: 'A bearer token is required.' })
	if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'Authentication is not configured.' })

	try {
		const payload = jwt.verify(match[1], process.env.JWT_SECRET)
		if (!payload.sub) return res.status(401).json({ error: 'The token is invalid.' })
		req.user = { id: payload.sub }
		return next()
	} catch {
		return res.status(401).json({ error: 'The token is invalid or expired.' })
	}
}

module.exports = requireAuth

