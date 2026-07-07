
const trainResults = document.getElementById("trainResults");
const searchSummary = document.getElementById("searchSummary");
const searchBtn = document.getElementById("searchBtn");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const dateInput = document.getElementById("date");
const classInput = document.getElementById("travelClass");
const passengersInput = document.getElementById("passengers");

function loadSearchData() {
  const saved = JSON.parse(localStorage.getItem("searchData"));
  if (!saved) return;
  fromInput.value = saved.from;
  toInput.value = saved.to;
  dateInput.value = saved.date;
  classInput.value = saved.travelClass;
  passengersInput.value = saved.passengers;
  renderTrains(saved);
}

function renderTrains(query) {
  const { from, to, date, travelClass, passengers } = query;

  searchSummary.innerHTML = `<p><strong>${from}</strong> → <strong>${to}</strong> | Date: <strong>${date}</strong> | Class: <strong>${travelClass}</strong> | Passengers: <strong>${passengers}</strong></p>`;

  trainResults.innerHTML = '<div class="spinner"></div>';

  // small artificial delay so the loading state is visible, like a real API call
  setTimeout(() => {
    const matches = trains.filter(
      (t) =>
        t.from.toLowerCase() === from.toLowerCase() &&
        t.to.toLowerCase() === to.toLowerCase() &&
        t.classes.includes(travelClass)
    );

    if (matches.length === 0) {
      trainResults.innerHTML = `
        <div class="card text-center">
          <h3>No trains found for this route.</h3>
          <p>Try routes like Delhi → Mumbai, Delhi → Lucknow, Chennai → Bengaluru etc.</p>
        </div>`;
      return;
    }

    trainResults.innerHTML = matches
      .map((train) => {
        const fare = train.fares[travelClass];
        const seatsLeft = getAvailableSeats(train.id);
        const seatClass = seatsLeft <= 5 ? "seats-low" : "";
        const soldOut = seatsLeft < Number(passengers);

        return `
          <div class="card">
            <div class="train-card">
              <div class="train-info">
                <h3>${train.trainName}</h3>
                <p class="train-meta">Train No: ${train.trainNo}</p>
                <span class="badge">${travelClass}</span>
              </div>
              <div class="train-time">
                <div class="time-box"><strong>${train.departure}</strong><p>${train.from}</p></div>
                <div class="time-box"><strong>${train.arrival}</strong><p>${train.to}</p></div>
                <div class="time-box"><strong>${train.duration}</strong><p>Duration</p></div>
              </div>
              <div class="train-fare">
                <h3>₹${fare}</h3>
                <p class="${seatClass}">${seatsLeft} seats left</p>
              </div>
              <div class="text-center">
                <button class="btn" ${soldOut ? "disabled" : ""} onclick="bookTrain(${train.id})">
                  ${soldOut ? "Sold Out" : "Book Now"}
                </button>
              </div>
            </div>
          </div>`;
      })
      .join("");
  }, 350);
}

function bookTrain(trainId) {
  const query = JSON.parse(localStorage.getItem("searchData"));
  const train = trains.find((t) => t.id === trainId);

  if (!train || !query) {
    toast("Train selection failed.", "error");
    return;
  }

  if (!getCurrentUser()) {
    toast("Please login to continue booking.", "info");
    sessionStorage.setItem("redirectAfterLogin", "search.html");
    setTimeout(() => (window.location.href = "login.html"), 700);
    return;
  }

  localStorage.setItem(
    "selectedTrain",
    JSON.stringify({
      ...train,
      date: query.date,
      travelClass: query.travelClass,
      passengers: Number(query.passengers),
      totalFare: train.fares[query.travelClass] * Number(query.passengers),
    })
  );
  window.location.href = "booking.html";
}

if (searchBtn) {
  searchBtn.addEventListener("click", function () {
    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    const date = dateInput.value;
    const travelClass = classInput.value;
    const passengers = passengersInput.value;

    if (!from || !to || !date || !travelClass || !passengers) {
      toast("Please fill all fields.", "error");
      return;
    }

    const query = { from, to, date, travelClass, passengers };
    localStorage.setItem("searchData", JSON.stringify(query));
    renderTrains(query);
  });
}

loadSearchData();
