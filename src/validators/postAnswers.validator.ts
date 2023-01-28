import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export default [
	body('cmId', 'CM ID is required').exists().toInt().isInt({ min: 1 }),
	body('percent', 'Percent is required').optional().isNumeric().isInt({ min: 0, max: 100 }),
	body('answersData', 'Answers Data is required').exists().isArray(),
	body('answersData.*.question', 'Question is required').exists().isString(),
	body('answersData.*.answer', 'Answer is required').exists().isArray(),
	body('answersData.*.answer.*', 'Answer must be an array of strings').isString(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		next();
	},
];
