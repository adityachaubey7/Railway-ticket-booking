

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("loggedInUser")) || null;
}

/**
 * Shows a small toast message in the bottom-right corner instead of
 * using the browser's native alert() popup.
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */
function toast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    document.body.appendChild(container);
  }

  const note = document.createElement("div");
  note.className = `toast toast-${type}`;
  note.textContent = message;
  container.appendChild(note);

  // trigger enter animation
  requestAnimationFrame(() => note.classList.add("show"));

  setTimeout(() => {
    note.classList.remove("show");
    setTimeout(() => note.remove(), 300);
  }, 3200);
}

/**
 * Updates the navbar so it reflects whether someone is logged in.
 * Expects a <div id="navLinks"> element with a data-auth attribute
 * containing the pages that should stay visible either way.
 */
function refreshNavbar() {
  const navLinks = document.getElementById("navLinks");
  if (!navLinks) return;

  const user = getCurrentUser();
  const authSlot = navLinks.querySelector("#authSlot");
  if (!authSlot) return;

  if (user) {
    authSlot.innerHTML = `
      <span class="nav-user">Hi, ${user.name.split(" ")[0]}</span>
      <a href="#" id="logoutLink">Logout</a>
    `;
    document.getElementById("logoutLink").addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  } else {
    authSlot.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Signup</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  toast("You have been logged out.", "info");
  setTimeout(() => (window.location.href = "index.html"), 600);
}

/**
 * Call at the top of any page that should only be reachable while
 * logged in (booking, payment, ticket, my-bookings).
 */
function requireLogin() {
  if (!getCurrentUser()) {
    sessionStorage.setItem("redirectAfterLogin", window.location.pathname.split("/").pop());
    window.location.href = "login.html";
  }
}

/**
 * Adds a show/hide toggle to any password input passed in.
 * @param {string} inputId
 * @param {string} toggleId
 */
function enablePasswordToggle(inputId, toggleId) {
  const input = document.getElementById(inputId);
  const toggle = document.getElementById(toggleId);
  if (!input || !toggle) return;

  toggle.addEventListener("click", () => {
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    toggle.textContent = isHidden ? "Hide" : "Show";
  });
}

document.addEventListener("DOMContentLoaded", refreshNavbar);
