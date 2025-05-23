(function() {
  const users = [
    { username: "admin", password: "vip123" },
    { username: "user1", password: "pass1" }
  ];

  const storageKey = "vip_access_expire";

  function promptLogin() {
    const username = prompt("Enter VIP Username:");
    if (username === null) return; // cancel
    const password = prompt("Enter VIP Password:");
    if (password === null) return;

    const valid = users.some(u => u.username === username && u.password === password);
    if (valid) {
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 30);
      localStorage.setItem(storageKey, expireDate.getTime());
      loadVIP();
    } else {
      alert("❌ Invalid username or password. Try again.");
      promptLogin();
    }
  }

  function checkAccess() {
    const expire = localStorage.getItem(storageKey);
    if (expire && parseInt(expire) > Date.now()) {
      loadVIP();
    } else {
      promptLogin();
    }
  }

  function loadVIP() {
    // Dynamically load your original VIP.js file
    const script = document.createElement("script");
    script.src = "/VIP.js";  // Change path if needed
    document.head.appendChild(script);
  }

  checkAccess();
})();
