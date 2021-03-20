/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51ITT8iD7OpwWkfOmCp8w5UiRs9TotedyIabNkm9m4xnlWQP9ZGMcPWu6wviwUfgbxXWj5ahIb6FPmpxGvI9SxoeZ00ZqgmxOAN'
);

// const stripe = Stripe(
//   'pk_test_51IW3jOCs9p56VM4jjpfvD2JSpTMns6qcRI6NqsAWD2zcNIOcyPEkfTdmh0RDHGCc3V7LiXn2yPGERDzpJQQzcitE00Mq9kyqch'
// );

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
