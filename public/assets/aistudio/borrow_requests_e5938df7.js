// server/routes/borrow_requests.js
const express = require('express')
const pool = require('../db/pool')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
const validStatuses = new Set(['approved', 'rejected', 'active', 'returned'])

// GET request --> get borrow requests for the authenticated user
router.get('/borrow-requests/mine', requireAuth, async (req, res, next) => {
	try {
		const [rows] = await pool.execute(
			`SELECT br.id, br.listing_id, br.start_date, br.end_date, br.status, br.created_at,
							l.title, l.price_per_hour, l.deposit_amount, u.email AS owner_email
			FROM borrow_requests br
			JOIN listings l ON l.id = br.listing_id
			JOIN users u ON u.id = l.owner_id
			WHERE br.borrower_id = ?
			ORDER BY br.created_at DESC`,
			[req.user.id],
		)
		return res.json(rows)
	} catch (error) {
		return next(error)
	}
})

// GET request --> get incoming borrow requests for listings owned by the authenticated user
router.get('/borrow-requests/incoming', requireAuth, async (req, res, next) => {
	try {
		const [rows] = await pool.execute(
			`SELECT br.id, br.listing_id, br.borrower_id, br.start_date, br.end_date,
							br.status, br.created_at, l.title, u.email AS borrower_email
			FROM borrow_requests br
			JOIN listings l ON l.id = br.listing_id
			JOIN users u ON u.id = br.borrower_id
			WHERE l.owner_id = ?
			ORDER BY br.created_at DESC`,
			[req.user.id],
		)
		return res.json(rows)
	} catch (error) {
		return next(error)
	}
})

// POST request --> create a new borrow request for a listing
router.post('/listings/:listingId/borrow', requireAuth, async (req, res, next) => {
	const { start_date, end_date } = req.body
	const start = new Date(start_date)
	const end = new Date(end_date)

	if (!start_date || !end_date || Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf()) || start >= end) {
		return res.status(400).json({ error: 'A valid start_date and end_date are required; end_date must be later.' })
	}

	try {
		const [listingRows] = await pool.execute(
			'SELECT id, owner_id FROM listings WHERE id = ? AND is_active = true',
			[req.params.listingId],
		)
		if (!listingRows.length) return res.status(404).json({ error: 'Listing not found.' })
		if (String(listingRows[0].owner_id) === String(req.user.id)) {
			return res.status(400).json({ error: 'You cannot borrow your own listing.' })
		}

		const [overlapRows] = await pool.execute(
			`SELECT 1 FROM borrow_requests
			WHERE listing_id = ? AND status IN ('approved', 'active')
				AND start_date < ? AND end_date > ?
			LIMIT 1`,
			[req.params.listingId, end_date, start_date],
		)
		if (overlapRows.length) return res.status(409).json({ error: 'The listing is already booked for some of those dates.' })

		const [result] = await pool.execute(
			`INSERT INTO borrow_requests (listing_id, borrower_id, start_date, end_date, status)
			VALUES (?, ?, ?, ?, 'pending')`,
			[req.params.listingId, req.user.id, start_date, end_date],
		)
		const [rows] = await pool.execute(
			`SELECT id, listing_id, borrower_id, start_date, end_date, status, created_at
			FROM borrow_requests WHERE id = ?`,
			[result.insertId],
		)
		return res.status(201).json(rows[0])
	} catch (error) {
		return next(error)
	}
})

// PATCH request --> update the status of a borrow request (approve, reject, mark as active, or mark as returned)
router.patch('/borrow-requests/:id', requireAuth, async (req, res, next) => {
	const { status } = req.body
	if (!validStatuses.has(status)) {
		return res.status(400).json({ error: 'Status must be approved, rejected, active, or returned.' })
	}

	try {
		const [requestRows] = await pool.execute(
			`SELECT br.id, br.status, br.borrower_id, l.owner_id
			FROM borrow_requests br
			JOIN listings l ON l.id = br.listing_id
			WHERE br.id = ?`,
			[req.params.id],
		)
		if (!requestRows.length) return res.status(404).json({ error: 'Borrow request not found.' })

		const request = requestRows[0]
		if (String(request.owner_id) !== String(req.user.id)) {
			return res.status(403).json({ error: 'Only the listing owner can update this request.' })
		}

		const allowedNext = {
			pending: ['approved', 'rejected'],
			approved: ['active'],
			active: ['returned'],
			rejected: [],
			returned: [],
		}
		if (!allowedNext[request.status]?.includes(status)) {
			return res.status(409).json({ error: `Cannot change a ${request.status} request to ${status}.` })
		}

		await pool.execute(
			`UPDATE borrow_requests SET status = ?
			WHERE id = ?`,
			[status, req.params.id],
		)
		const [updatedRows] = await pool.execute(
			`SELECT id, listing_id, borrower_id, start_date, end_date, status, created_at
			FROM borrow_requests WHERE id = ?`,
			[req.params.id],
		)
		return res.json(updatedRows[0])
	} catch (error) {
		return next(error)
	}
})

module.exports = router
