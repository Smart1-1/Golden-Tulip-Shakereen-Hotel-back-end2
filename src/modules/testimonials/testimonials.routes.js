import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { testimonialsService } from './testimonials.service.js';

const testimonialsRouter = Router();

testimonialsRouter.post(
  '/',
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

export { testimonialsRouter };
