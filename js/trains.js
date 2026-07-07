

const trains = [
  {
    id: 1,
    trainNo: "12952",
    trainName: "Mumbai Rajdhani Express",
    from: "Delhi",
    to: "Mumbai",
    departure: "04:30 PM",
    arrival: "08:35 AM",
    duration: "16h 05m",
    classes: ["Sleeper", "3AC", "2AC"],
    fares: { Sleeper: 750, "3AC": 1450, "2AC": 2250 },
    seatsAvailable: 38,
  },
  {
    id: 2,
    trainNo: "12004",
    trainName: "Lucknow Shatabdi Express",
    from: "Delhi",
    to: "Lucknow",
    departure: "06:10 AM",
    arrival: "12:45 PM",
    duration: "6h 35m",
    classes: ["Chair Car", "Executive"],
    fares: { "Chair Car": 920, Executive: 1650 },
    seatsAvailable: 22,
  },
  {
    id: 3,
    trainNo: "12302",
    trainName: "Howrah Rajdhani Express",
    from: "Delhi",
    to: "Kolkata",
    departure: "05:00 PM",
    arrival: "09:55 AM",
    duration: "16h 55m",
    classes: ["Sleeper", "3AC", "2AC"],
    fares: { Sleeper: 700, "3AC": 1550, "2AC": 2350 },
    seatsAvailable: 41,
  },
  {
    id: 4,
    trainNo: "12658",
    trainName: "Bengaluru Mail",
    from: "Chennai",
    to: "Bengaluru",
    departure: "09:20 AM",
    arrival: "03:45 PM",
    duration: "6h 25m",
    classes: ["Sleeper", "3AC", "2AC"],
    fares: { Sleeper: 420, "3AC": 990, "2AC": 1450 },
    seatsAvailable: 29,
  },
  {
    id: 5,
    trainNo: "12260",
    trainName: "Sealdah Duronto",
    from: "Patna",
    to: "Delhi",
    departure: "07:40 PM",
    arrival: "09:30 AM",
    duration: "13h 50m",
    classes: ["Sleeper", "3AC", "2AC"],
    fares: { Sleeper: 620, "3AC": 1340, "2AC": 2100 },
    seatsAvailable: 35,
  },
  {
    id: 6,
    trainNo: "12628",
    trainName: "Karnataka Express",
    from: "Delhi",
    to: "Bengaluru",
    departure: "08:20 PM",
    arrival: "11:10 AM",
    duration: "38h 50m",
    classes: ["Sleeper", "3AC", "2AC"],
    fares: { Sleeper: 980, "3AC": 2050, "2AC": 3050 },
    seatsAvailable: 18,
  },
];

/** Reads how many seats have already been booked (this browser) per train. */
function getSeatAdjustments() {
  return JSON.parse(localStorage.getItem("seatAdjustments")) || {};
}

/** Returns remaining seats for a train after subtracting local bookings. */
function getAvailableSeats(trainId) {
  const train = trains.find((t) => t.id === trainId);
  if (!train) return 0;
  const adjustments = getSeatAdjustments();
  const booked = adjustments[trainId] || 0;
  return Math.max(train.seatsAvailable - booked, 0);
}

/** Call after a successful booking to reduce the seat count. */
function decrementSeats(trainId, count) {
  const adjustments = getSeatAdjustments();
  adjustments[trainId] = (adjustments[trainId] || 0) + count;
  localStorage.setItem("seatAdjustments", JSON.stringify(adjustments));
}

/** Call after a cancellation to release the seats again. */
function incrementSeats(trainId, count) {
  const adjustments = getSeatAdjustments();
  adjustments[trainId] = Math.max((adjustments[trainId] || 0) - count, 0);
  localStorage.setItem("seatAdjustments", JSON.stringify(adjustments));
}
