
requireLogin();

const bookingList = document.getElementById("bookingList");
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

function renderBookings() {
  if (!bookingList) return;

  if (bookings.length === 0) {
    bookingList.innerHTML = `
      <div class="card text-center">
        <h3>No bookings found</h3>
        <p>You haven't booked any tickets yet.</p>
        <a href="search.html" class="btn mt-20">Book a Ticket</a>
      </div>`;
    return;
  }

  bookingList.innerHTML = bookings
    .map((b) => {
      const statusClass = b.status === "Cancelled" ? "status-cancelled" : "status-confirmed";
      return `
        <div class="card">
          <div class="train-card">
            <div class="train-info">
              <h3>${b.trainName} <span class="status-tag ${statusClass}">${b.status}</span></h3>
              <p class="train-meta">PNR: ${b.pnr}</p>
              <p class="train-meta">Passenger: ${b.passengerName}</p>
            </div>
            <div class="train-time">
              <div class="time-box"><strong>${b.departure}</strong><p>${b.from}</p></div>
              <div class="time-box"><strong>${b.arrival}</strong><p>${b.to}</p></div>
              <div class="time-box"><strong>${b.date}</strong><p>${b.travelClass}</p></div>
            </div>
            <div class="train-fare">
              <h3>₹${b.totalFare}</h3>
              <p>Seat: ${b.seatNumber}</p>
            </div>
            <div class="text-center">
              ${
                b.status === "Cancelled"
                  ? ""
                  : `<button class="btn-danger btn" onclick="cancelBooking(${b.bookingId})">Cancel</button>`
              }
            </div>
          </div>
        </div>`;
    })
    .join("");
}

function cancelBooking(bookingId) {
  if (!confirm("Are you sure you want to cancel this booking?")) return;

  const booking = bookings.find((b) => b.bookingId === bookingId);
  if (booking) {
    incrementSeats(booking.id, booking.passengers);
    booking.status = "Cancelled";
  }

  localStorage.setItem("bookings", JSON.stringify(bookings));
  toast("Booking cancelled.", "info");
  renderBookings();
}

renderBookings();
