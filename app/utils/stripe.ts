import Stripe from 'stripe';

export { stripe };

const stripe = new Stripe(Bun.env.STRIPE_API_KEY, { apiVersion: '2023-10-16' });
