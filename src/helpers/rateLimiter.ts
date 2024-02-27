import { rateLimit } from 'express-rate-limit'

export const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, //15 min
	limit: 15, //15/15 req/min
	standardHeaders: 'draft-7',
	legacyHeaders: true,
})

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, //15 min
	limit: 100, //100/15 req/min
	standardHeaders: 'draft-7',
	legacyHeaders: true,
})
