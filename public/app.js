// Hardcoded user list
const users = [
  { username: "admin", password: "vip123" },
  { username: "user1", password: "pass1" }
];

// Login function
function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const found = users.find(user => user.username === u && user.password === p);
  const message = document.getElementById("message");
  if (found) {
    // Save token valid for 30 days
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    localStorage.setItem("vip_access_expire", expireDate.getTime());
    showVIP();
    message.textContent = "";
  } else {
    message.textContent = "❌ Invalid username or password.";
  }
}

// Show VIP content and inject VIP code
function showVIP() {
  document.getElementById("login-form").style.display = "none";
  const vipContent = document.getElementById("vip-content");
  vipContent.style.display = "block";
  injectVIP();
}

// Inject VIP logic dynamically (instead of separate VIP.js)
function injectVIP() {
  const vipScript = document.createElement("script");
  vipScript.textContent = `
    (function() {
      console.log("🔥 VIP features activated!");
      alert("Welcome VIP user! Access granted.");
      // Your VIP secret code here
      // For example:
      // alert("Here is your secret VIP code: DTC-VIP-1234");
    })();
  `;
  document.body.appendChild(vipScript);
}

// Check if user has valid token on page load
function checkAccess() {
  const expire = localStorage.getItem("vip_access_expire");
  if (expire && parseInt(expire) > Date.now()) {
    showVIP();
  }
}

// Run on page load
checkAccess();
