const validUsername = "admin";
const validPassword = "vip123";

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const message = document.getElementById('message');

  if (user === validUsername && pass === validPassword) {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    localStorage.setItem('loginExpire', expireDate.getTime());

    showContent();
  } else {
    message.textContent = "❌ Invalid username or password.";
  }
}

function showContent() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('content').style.display = 'block';
}

function checkLogin() {
  const expire = localStorage.getItem('loginExpire');
  if (expire && new Date().getTime() < parseInt(expire)) {
    showContent();
  }
}

window.onload = checkLogin;
