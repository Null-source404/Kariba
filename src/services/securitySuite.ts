/**
 * Kariba API Security Suite
 * Production-grade security middleware implementations for Express
 */

// 1. Rate Limiter (Defends against brute-force password guessing & credential stuffing)
export function createAuthRateLimiter(windowMs: number = 15 * 60 * 1000, maxAttempts: number = 5) {
  const ipAttempts = new Map<string, { count: number; resetTime: number }>();

  return (req: any, res: any, next: any) => {
    const ip = req.ip || req.connection?.remoteAddress || 'unknown-ip';
    const now = Date.now();
    const record = ipAttempts.get(ip);

    if (record) {
      if (now > record.resetTime) {
        ipAttempts.set(ip, { count: 1, resetTime: now + windowMs });
      } else {
        record.count += 1;
        if (record.count > maxAttempts) {
          const retryAfterSec = Math.ceil((record.resetTime - now) / 1000);
          res.setHeader('Retry-After', retryAfterSec);
          return res.status(429).json({
            error: `Too many login attempts. For your security, this IP is locked for ${Math.ceil(retryAfterSec / 60)} minutes.`,
          });
        }
      }
    } else {
      ipAttempts.set(ip, { count: 1, resetTime: now + windowMs });
    }

    return next();
  };
}

// 2. Strict Input Sanitizer (Defends against Stored XSS and script injection attacks)
export function sanitizeInputString(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// 3. Security Headers Middleware (Defends against Clickjacking, MIME sniffing, and cross-site leaks)
export function securityHeadersMiddleware(req: any, res: any, next: any) {
  // Prevent clickjacking by forbidding embedding in foreign iframes
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Prevent MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Enforce Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Strict Transport Security (HSTS) - enforce HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  return next();
}

// 4. Schema Validator for Listing and Borrow Payloads
export function validateBorrowPayload(body: any): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') return { valid: false, error: 'Invalid payload.' };
  
  const { start_date, end_date } = body;
  if (!start_date || !end_date) return { valid: false, error: 'start_date and end_date are required.' };
  
  const start = new Date(start_date);
  const end = new Date(end_date);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { valid: false, error: 'Invalid date-time format.' };
  }
  if (start >= end) {
    return { valid: false, error: 'end_date must be strictly later than start_date.' };
  }
  // Max duration guard: prevent infinite reservations (e.g. max 30 days)
  const maxBookingDays = 30;
  if ((end.getTime() - start.getTime()) > maxBookingDays * 24 * 60 * 60 * 1000) {
    return { valid: false, error: `Borrow duration cannot exceed ${maxBookingDays} days.` };
  }
  
  return { valid: true };
}
