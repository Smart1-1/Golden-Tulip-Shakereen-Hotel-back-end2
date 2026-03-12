import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { requireAdminKey } from '../../middleware/requireAdminKey.js';
import { inquiriesService } from './inquiries.service.js';
import { testimonialsService } from '../testimonials/testimonials.service.js';

const parseLimit = (queryValue, fallback = 50) => {
  const parsed = Number.parseInt(`${queryValue ?? ''}`, 10);
  return Number.isInteger(parsed) ? parsed : fallback;
};

const inquiriesRouter = Router();

inquiriesRouter.post(
  '/contact-requests',
  asyncHandler(async (req, res) => {
    const data = await inquiriesService.createContactRequest(req.body, req);
    res.status(201).json({
      message: 'Contact request submitted successfully.',
      data
    });
  })
);

inquiriesRouter.post(
  '/booking-requests',
  asyncHandler(async (req, res) => {
    const data = await inquiriesService.createBookingRequest(req.body, req);
    res.status(201).json({
      message: 'Booking request submitted successfully.',
      data
    });
  })
);

inquiriesRouter.post(
  '/testimonials',
  asyncHandler(async (req, res) => {
    const testimonial = await testimonialsService.createPublicTestimonial(req.body, req);
    res.status(201).json({
      message: 'Review submitted successfully.',
      data: {
        testimonial
      }
    });
  })
);

inquiriesRouter.get(
  '/contact-requests',
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const data = await inquiriesService.listContactRequests(parseLimit(req.query.limit));
    res.json({ data });
  })
);

inquiriesRouter.get(
  '/booking-requests',
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const data = await inquiriesService.listBookingRequests(parseLimit(req.query.limit));
    res.json({ data });
  })
);

export { inquiriesRouter };
