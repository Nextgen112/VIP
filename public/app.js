const users = [
  { username: "admin", password: "vip123" },
  { username: "user1", password: "abc123" }
];

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  const match = users.find(u => u.username === user && u.password === pass);
  if (match) {
    const expire = new Date();
    expire.setDate(expire.getDate() + 30);
    localStorage.setItem("vip_access_expires", expire.getTime());
    showContent();
  } else {
    message.textContent = "❌ Invalid login.";
  }
}

function showContent() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("content").style.display = "block";
  loadVIP();
}

function loadVIP() {
  const script = document.createElement("script");
  script.textContent = `
    console.log("🔥 VIP script running");
    alert("✅ VIP features unlocked");
    // Add your VIP-only code here
  `;
  document.body.appendChild(script);
}

function checkAccess() {
  const expireTime = localStorage.getItem("vip_access_expires");
  if (expireTime && new Date().getTime() < parseInt(expireTime)) {
    showContent();
  }
}

window.onload = checkAccess;
