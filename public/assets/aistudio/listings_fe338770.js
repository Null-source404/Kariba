// server/routes/listings.js
const express = require('express')
const pool = require('../db/pool')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// GET request --> get all active listings within a certain radius of a given location
router.get('/listings/nearby', async (req, res, next) => {
	const lat = Number(req.query.lat)
	const lng = Number(req.query.lng)
	const radius = Number(req.query.radius ?? 10)

	if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lng) || lng < -180 || lng > 180 || !Number.isFinite(radius) || radius <= 0) {
		return res.status(400).json({ error: 'Valid lat, lng, and positive radius values are required.' })
	}

    // Use the Haversine formula to calculate distance and filter listings within the specified radius
	try {
		const [rows] = await pool.execute(
			`SELECT nearby.*
			FROM (
				SELECT l.id, l.owner_id, l.title, l.description, l.lat, l.lng,
								l.price_per_hour, l.deposit_amount, l.image_url, l.created_at,
								u.email AS owner_email,
								3959 * 2 * ASIN(SQRT(
									POWER(SIN(RADIANS(l.lat - ?) / 2), 2) +
									COS(RADIANS(?)) * COS(RADIANS(l.lat)) *
									POWER(SIN(RADIANS(l.lng - ?) / 2), 2)
								)) AS distance
				FROM listings l
				JOIN users u ON u.id = l.owner_id
				WHERE l.is_active = true
			) nearby
			WHERE nearby.distance <= ?
			ORDER BY nearby.distance ASC`,
			[lat, lat, lng, radius],
		)
		return res.json(rows)
	} catch (error) {
		return next(error)
	}
})

// GET request --> get all listings owned by the authenticated user, including the count of pending borrow requests for each listing
router.get('/listings/mine', requireAuth, async (req, res, next) => {
	try {
		const [rows] = await pool.execute(
			`SELECT l.*,
							COUNT(br.id) AS pending_request_count
			FROM listings l
			LEFT JOIN borrow_requests br
				ON br.listing_id = l.id AND br.status = 'pending'
			WHERE l.owner_id = ?
			GROUP BY l.id
			ORDER BY l.created_at DESC`,
			[req.user.id],
		)
		return res.json(rows)
	} catch (error) {
		return next(error)
	}
})

// GET request --> get a specific listing by ID, including the owner's email
router.get('/listings/:id', async (req, res, next) => {
	try {
		const [rows] = await pool.execute(
			`SELECT l.id, l.owner_id, l.title, l.description, l.lat, l.lng,
							l.price_per_hour, l.deposit_amount, l.image_url, l.created_at,
							u.email AS owner_email
			FROM listings l
			JOIN users u ON u.id = l.owner_id
			WHERE l.id = ? AND l.is_active = true`,
			[req.params.id],
		)
		if (!rows.length) return res.status(404).json({ error: 'Listing not found.' })
		return res.json(rows[0])
	} catch (error) {
		return next(error)
	}
})

// POST request --> create a new listing owned by the authenticated user
router.post('/listings', requireAuth, async (req, res, next) => {
	const { title, description, lat, lng, price_per_hour, deposit_amount } = req.body
	const latitude = Number(lat)
	const longitude = Number(lng)
	const hourlyPrice = Number(price_per_hour)
	const deposit = Number(deposit_amount)

	if (typeof title !== 'string' || !title.trim() || typeof description !== 'string' || !description.trim() ||
			!Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
			!Number.isFinite(longitude) || longitude < -180 || longitude > 180 ||
			!Number.isFinite(hourlyPrice) || hourlyPrice < 0 || !Number.isFinite(deposit) || deposit < 0) {
		return res.status(400).json({ error: 'Provide title, description, valid coordinates, price, and deposit.' })
	}

	try {
		const [result] = await pool.execute(
			`INSERT INTO listings (owner_id, title, description, lat, lng, price_per_hour, deposit_amount)
			VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[req.user.id, title.trim(), description.trim(), latitude, longitude, hourlyPrice, deposit],
		)
		const [rows] = await pool.execute(
			`SELECT id, owner_id, title, description, lat, lng, price_per_hour, deposit_amount, image_url, created_at
			FROM listings WHERE id = ?`,
			[result.insertId],
		)
		return res.status(201).json(rows[0])
	} catch (error) {
		return next(error)
	}
})

module.exports = router
