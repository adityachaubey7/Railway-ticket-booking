

requireLogin();

const paymentSummary = document.getElementById("paymentSummary");
const paymentForm = document.getElementById("paymentForm");
const payCards = document.querySelectorAll(".pay-card");
const selectedTrainPayment = JSON.parse(localStorage.getItem("selectedTrain"));
const passengerDataPayment = JSON.parse(localStorage.getItem("passengerData"));

let selectedPaymentMethod = "UPI";

if (!selectedTrainPayment || !passengerDataPayment) {
  toast("Booking details missing.", "error");
  setTimeout(() => (window.location.href = "search.html"), 700);
} else if (paymentSummary) {
  paymentSummary.innerHTML = `
    <div class="summary-box">
      <h3>Payment Summary</h3>
      <p><strong>Passenger:</strong> ${passengerDataPayment.passengerName}</p>
      <p><strong>Train:</strong> ${selectedTrainPayment.trainName}</p>
      <p><strong>Route:</strong> ${selectedTrainPayment.from} → ${selectedTrainPayment.to}</p>
      <p><strong>Date:</strong> ${selectedTrainPayment.date}</p>
      <p><strong>Class:</strong> ${selectedTrainPayment.travelClass}</p>
      <p><strong>Seat:</strong> ${passengerDataPayment.seatNumber}</p>
      <p><strong>Total Amount:</strong> ₹${selectedTrainPayment.totalFare}</p>
    </div>`;
}

payCards.forEach((card) => {
  card.addEventListener("click", function () {
    payCards.forEach((c) => c.classList.remove("active"));
    this.classList.add("active");
    selectedPaymentMethod = this.dataset.method;
  });
});

function generatePNR() {
  return "PNR" + Math.floor(1000000000 + Math.random() * 9000000000);
}

if (paymentForm) {
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const paymentRef = document.getElementById("paymentRef").value.trim();
    if (!paymentRef) {
      toast("Please enter a payment reference.", "error");
      return;
    }

    const submitBtn = paymentForm.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    // simulate a short payment-gateway delay
    setTimeout(() => {
      const booking = {
        bookingId: Date.now(),
        pnr: generatePNR(),
        paymentMethod: selectedPaymentMethod,
        paymentRef,
        bookingTime: new Date().toLocaleString(),
        status: "Confirmed",
        ...selectedTrainPayment,
        ...passengerDataPayment,
      };

      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      bookings.push(booking);
      localStorage.setItem("bookings", JSON.stringify(bookings));
      localStorage.setItem("latestBooking", JSON.stringify(booking));

      decrementSeats(selectedTrainPayment.id, selectedTrainPayment.passengers);

      toast("Payment successful! Ticket booked.", "success");
      setTimeout(() => (window.location.href = "ticket.html"), 700);
    }, 900);
  });
}
