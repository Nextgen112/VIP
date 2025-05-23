const users = [
  { username: "admin", password: "vip123" }
];

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  const found = users.find(x => x.username === u && x.password === p);
  if (found) {
    const expire = new Date();
    expire.setDate(expire.getDate() + 30);
    localStorage.setItem("vip_ok", expire.getTime());
    showVIP();
  } else {
    document.getElementById("message").textContent = "❌ Wrong credentials.";
  }
}

function showVIP() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("content").style.display = "block";
  injectVIP();
}

function injectVIP() {
  const vipCode = `
    (function(){
      console.log("🔥 VIP logic running");
      alert("✅ Access granted!");
      // Your secure VIP logic here
      const secret = "DTC_SECRET_CODE_999";
      console.log("Running hidden logic with code:", secret);
    })();
  `;
  const script = document.createElement("script");
  script.textContent = btoa(vipCode); // base64 encode
  const decode = document.createElement("script");
  decode.textContent = `
    eval(atob(document.scripts[document.scripts.length-1].textContent));
  `;
  document.body.appendChild(script);
  document.body.appendChild(decode);
}

function checkAccess() {
  const t = localStorage.getItem("vip_ok");
  if (t && parseInt(t) > Date.now()) {
    showVIP();
  }
}

checkAccess();
