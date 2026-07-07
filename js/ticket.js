
requireLogin();

const ticketContainer = document.getElementById("ticketContainer");
const latestBooking = JSON.parse(localStorage.getItem("latestBooking"));

if (latestBooking) {
  ticketContainer.innerHTML = `
    <div class="ticket-card">
      <div class="ticket-top">
        <div class="ticket-title">
          <h2>RailEase E-Ticket</h2>
          <p>Your booking has been confirmed successfully.</p>
        </div>
        <div>
          <p><strong>PNR:</strong> ${latestBooking.pnr}</p>
          <p><strong>Booked On:</strong> ${latestBooking.bookingTime}</p>
        </div>
      </div>
      <div class="ticket-grid">
        <div class="ticket-item"><h4>Passenger Name</h4><p>${latestBooking.passengerName}</p></div>
        <div class="ticket-item"><h4>Age / Gender</h4><p>${latestBooking.passengerAge} / ${latestBooking.passengerGender}</p></div>
        <div class="ticket-item"><h4>Mobile</h4><p>${latestBooking.passengerMobile}</p></div>
        <div class="ticket-item"><h4>Train</h4><p>${latestBooking.trainName} (${latestBooking.trainNo})</p></div>
        <div class="ticket-item"><h4>Route</h4><p>${latestBooking.from} → ${latestBooking.to}</p></div>
        <div class="ticket-item"><h4>Journey Date</h4><p>${latestBooking.date}</p></div>
        <div class="ticket-item"><h4>Departure</h4><p>${latestBooking.departure}</p></div>
        <div class="ticket-item"><h4>Arrival</h4><p>${latestBooking.arrival}</p></div>
        <div class="ticket-item"><h4>Duration</h4><p>${latestBooking.duration}</p></div>
        <div class="ticket-item"><h4>Class</h4><p>${latestBooking.travelClass}</p></div>
        <div class="ticket-item"><h4>Seat</h4><p>${latestBooking.seatNumber}</p></div>
        <div class="ticket-item"><h4>Fare</h4><p>₹${latestBooking.totalFare}</p></div>
        <div class="ticket-item"><h4>Payment Method</h4><p>${latestBooking.paymentMethod}</p></div>
        <div class="ticket-item"><h4>Email</h4><p>${latestBooking.passengerEmail}</p></div>
      </div>
      <div class="ticket-actions">
        <button class="btn" onclick="window.print()">Print Ticket</button>
        <a href="mybookings.html" class="btn btn-secondary">Go to My Bookings</a>
      </div>
    </div>`;
} else {
  ticketContainer.innerHTML = `
    <div class="card text-center">
      <h3>No ticket found.</h3>
      <a href="search.html" class="btn mt-20">Book a Ticket</a>
    </div>`;
}
