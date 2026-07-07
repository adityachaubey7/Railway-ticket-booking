

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

enablePasswordToggle("signupPassword", "signupToggle");
enablePasswordToggle("loginPassword", "loginToggle");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
      toast("Please fill all fields.", "error");
      return;
    }
    if (password.length < 6) {
      toast("Password should be at least 6 characters.", "error");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      toast("An account with this email already exists.", "error");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    toast("Signup successful! Please login.", "success");
    setTimeout(() => (window.location.href = "login.html"), 900);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      toast("Invalid email or password.", "error");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    toast(`Welcome back, ${user.name.split(" ")[0]}!`, "success");

    const redirectTo = sessionStorage.getItem("redirectAfterLogin");
    sessionStorage.removeItem("redirectAfterLogin");
    setTimeout(() => (window.location.href = redirectTo || "index.html"), 700);
  });
}
