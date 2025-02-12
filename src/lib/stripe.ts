import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const createSubscription = async (priceId: string, organizationId: string) => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to load');

  const { data: { sessionId } } = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      organizationId,
    }),
  }).then(res => res.json());

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) throw error;
};

export const manageSubscription = async (organizationId: string) => {
  const { data: { url } } = await fetch('/api/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ organizationId }),
  }).then(res => res.json());

  window.location.href = url;
};