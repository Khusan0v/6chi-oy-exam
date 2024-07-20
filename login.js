import { checkToken, redirect } from "./utils.js";

const form = document.forms[0];
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const spinner = document.getElementById("spinner");
const loginContainer = document.getElementById("login-container");

(function () {
  const hasToken = checkToken();
  if (hasToken) {
    console.log("Token exists. Redirecting to index.html");
    redirect("./index.html");
  } else {
    console.log("No token found. Staying on login page.");
  }
})();

form.onsubmit = login;

async function login(event) {
  event.preventDefault();

  try {
    spinner.style.display = "block";
    loginContainer.classList.add("hidden");

    loginButton.disabled = true;

    console.log("Sending login request...");
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Login successful. Storing token.");
      localStorage.setItem("token", result.access_token);

      const hasToken = checkToken();
      if (hasToken) {
        console.log("Token found after login. Redirecting to index.html");
        window.location.href = "./index.html";
      } else {
        console.log("Token not found after login.");
      }
    } else {
      console.error(result.message || "Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  } finally {
    loginButton.disabled = false;
    spinner.style.display = "none";
    loginContainer.classList.remove("hidden");
  }
}

emailInput.oninput = function (event) {
  console.log(event.target.value);
};

passwordInput.oninput = function (event) {
  console.log(event.target.value);
};
