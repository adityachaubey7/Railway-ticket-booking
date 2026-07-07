# RailEase – Railway Ticket Booking (Frontend Demo)

A multi-page railway ticket booking website built with plain **HTML, CSS, and JavaScript** — no frameworks, no backend, no database. All data (accounts, bookings, seat availability) is simulated in the browser using `localStorage`, so the app is fully static and can run by just opening `index.html`.

## Live Flow

`Home → Search Trains → Select Train → Choose Seat & Passenger Details → Payment → E-Ticket → My Bookings`

## Features

- **Signup / Login** with client-side session handling (`localStorage`)
- **Route search** with date, class, and passenger count filters
- **Interactive seat map** — pick a real seat from a coach layout before checkout
- **Live seat availability** that decreases after booking and is restored on cancellation
- **Mock payment flow** (UPI / Card / Net Banking) with a simulated processing delay
- **Auto-generated PNR** and a printable e-ticket
- **My Bookings** page to view and cancel past bookings
- **Toast notifications** instead of browser `alert()` popups
- **Protected routes** — booking/payment/ticket/my-bookings pages redirect to login if not authenticated
- Fully **responsive** layout (works down to mobile widths)

## Tech Stack

| Layer | Tech |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (Grid, Flexbox, custom properties, no framework) |
| Logic | Vanilla JavaScript (ES6) |
| Data | `localStorage` (mock database, no server) |

## Project Structure

```
railway-ticket-booking/
├── index.html
├── login.html
├── signup.html
├── search.html
├── booking.html
├── payment.html
├── ticket.html
├── mybookings.html
├── css/
│   └── style.css
└── js/
    ├── common.js      # toasts, navbar auth state, route guard
    ├── trains.js       # train data + seat availability helpers
    ├── auth.js         # signup / login
    ├── search.js       # search & list trains
    ├── booking.js       # seat selection + passenger form
    ├── payment.js       # mock payment + booking creation
    ├── ticket.js        # e-ticket rendering
    └── mybookings.js    # booking history + cancellation
```

## Run Locally

No build step required.

```bash
# Just open index.html in a browser, or serve it locally:
npx serve .
```

## Known Limitations (by design)

This is a **frontend-only demo**, so a few things are intentionally simplified:

- No real backend or database — all data lives in the browser's `localStorage` and is lost if it's cleared.
- Passwords are stored in plain text for demo purposes only; a production app would hash and store credentials server-side.
- Seat maps and payment are simulated (no real payment gateway, no real inventory system).

## Possible Next Steps

- Persist data with a real backend (Node/Express + MongoDB or PostgreSQL)
- Real authentication (JWT / hashed passwords)
- Payment gateway integration (Razorpay/Stripe sandbox)
