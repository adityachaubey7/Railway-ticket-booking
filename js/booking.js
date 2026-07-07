

requireLogin();

const bookingForm = document.getElementById("bookingForm");
const bookingSummary = document.getElementById("bookingSummary");
const seatMap = document.getElementById("seatMap");
const selectedSeatLabel = document.getElementById("selectedSeatLabel");
const selectedTrain = JSON.parse(localStorage.getItem("selectedTrain"));

let chosenSeat = null;

if (!selectedTrain) {
  toast("No train selected.", "error");
  setTimeout(() => (window.location.href = "search.html"), 700);
}

if (bookingSummary && selectedTrain) {
  bookingSummary.innerHTML = `
    <h3>Booking Summary</h3>
    <p><strong>Train:</strong> ${selectedTrain.trainName} (${selectedTrain.trainNo})</p>
    <p><strong>Route:</strong> ${selectedTrain.from} → ${selectedTrain.to}</p>
    <p><strong>Date:</strong> ${selectedTrain.date}</p>
    <p><strong>Class:</strong> ${selectedTrain.travelClass}</p>
    <p><strong>Passengers:</strong> ${selectedTrain.passengers}</p>
    <p><strong>Total Fare:</strong> ₹${selectedTrain.totalFare}</p>
    <p><strong>Available Seats:</strong> ${getAvailableSeats(selectedTrain.id)}</p>
  `;
}

/* Builds a simple coach layout (rows of 4 with an aisle) and marks
   already-taken seats as unavailable based on local seat data. */
function renderSeatMap() {
  if (!seatMap || !selectedTrain) return;

  const totalSeats = 30;
  const bookedCount = totalSeats - getAvailableSeats(selectedTrain.id);
  // deterministic-looking "taken" seats based on train id, purely cosmetic
  const takenSeats = new Set();
  let seed = selectedTrain.id * 7;
  while (takenSeats.size < bookedCount) {
    seed = (seed * 9301 + 49297) % 233280;
    takenSeats.add((seed % totalSeats) + 1);
  }

  seatMap.innerHTML = "";
  for (let i = 1; i <= totalSeats; i++) {
    const seatBtn = document.createElement("div");
    seatBtn.className = "seat" + (takenSeats.has(i) ? " taken" : "");
    seatBtn.textContent = "S" + i;
    if (!takenSeats.has(i)) {
      seatBtn.addEventListener("click", () => selectSeat(i, seatBtn));
    }
    seatMap.appendChild(seatBtn);
  }
}

function selectSeat(seatNumber, el) {
  document.querySelectorAll(".seat.selected").forEach((s) => s.classList.remove("selected"));
  el.classList.add("selected");
  chosenSeat = "S" + seatNumber;
  if (selectedSeatLabel) selectedSeatLabel.textContent = chosenSeat;
}

renderSeatMap();

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const passengerName = document.getElementById("passengerName").value.trim();
    const passengerAge = document.getElementById("passengerAge").value.trim();
    const passengerGender = document.getElementById("passengerGender").value;
    const passengerEmail = document.getElementById("passengerEmail").value.trim();
    const passengerMobile = document.getElementById("passengerMobile").value.trim();

    if (!passengerName || !passengerAge || !passengerGender || !passengerEmail || !passengerMobile) {
      toast("Please fill all passenger details.", "error");
      return;
    }
    if (passengerMobile.length !== 10 || isNaN(passengerMobile)) {
      toast("Enter a valid 10-digit mobile number.", "error");
      return;
    }
    if (!chosenSeat) {
      toast("Please select a seat from the seat map.", "error");
      return;
    }

    localStorage.setItem(
      "passengerData",
      JSON.stringify({
        passengerName,
        passengerAge,
        passengerGender,
        passengerEmail,
        passengerMobile,
        seatNumber: chosenSeat,
      })
    );
    window.location.href = "payment.html";
  });
}
