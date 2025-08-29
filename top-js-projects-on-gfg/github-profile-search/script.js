
const API_URL = "https://api.github.com/users/";
const result = document.getElementById('result');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const input = document.getElementById('username');
const themeBtn = document.querySelector('.toggle-theme');

// Load theme from localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '🌞';
  } else {
    document.body.classList.remove('dark');
    themeBtn.textContent = '🌙';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '🌞' : '🌙';
}

async function getUser() {
  const username = input.value.trim();
  if (!username) return;

  result.innerHTML = '';
  error.style.display = 'none';
  loading.style.display = 'block';

  try {
    const res = await fetch(API_URL + username);
    const data = await res.json();

    if (data.message === "Not Found") throw new Error("User not found");

    loading.style.display = 'none';

    result.innerHTML = `
      <div class="card">
        <img src="${data.avatar_url}" alt="${data.name}'s avatar" />
        <h2>${data.name || data.login}</h2>
        <p>${data.bio || "No bio provided."}</p>
        <div class="info">
          <div><strong>Repos</strong><br>${data.public_repos}</div>
          <div><strong>Followers</strong><br>${data.followers}</div>
          <div><strong>Following</strong><br>${data.following}</div>
        </div>
        ${data.location ? `<p style="margin-top:10px;"><strong>📍 ${data.location}</strong></p>` : ""}
        <p><a href="${data.html_url}" target="_blank">View Profile →</a></p>
      </div>
    `;
  } catch (err) {
    loading.style.display = 'none';
    error.style.display = 'block';
  }
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") getUser();
});

// Apply theme on page load
loadTheme();
