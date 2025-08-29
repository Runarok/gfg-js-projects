const container = document.getElementById('toast-container');
const codeTabs = document.getElementById('code-tabs');
const tabHtml = document.getElementById('tab-html');
const tabCss = document.getElementById('tab-css');
const tabJs = document.getElementById('tab-js');

// Code snippets for each toast (trimmed for brevity — you can expand more)
const codeMap = {
  1: {
    html: `<div class="toast toast1">
  Success! Your action was completed.
  <div class="progress"></div>
</div>`,
    css: `
.toast1 {
  background: #4caf50;
  color: white;
  padding: 14px 24px;
  border-radius: 6px;
  animation: slideInRight 0.5s forwards;
  position: relative;
  width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toast1 .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: #81c784;
  animation: progressBar 4s linear forwards;
  width: 100%;
  border-radius: 0 0 6px 6px;
}

@keyframes slideInRight {
  from { right: -320px; opacity: 0; }
  to { right: 20px; opacity: 1; }
}
@keyframes progressBar {
  from { width: 100%; }
  to { width: 0; }
}`,
    js: `// Auto dismiss after 4 seconds
setTimeout(() => toast.remove(), 4000);`
  },
  2: {
    html: `<div class="toast toast2">
  <span class="icon">⚠️</span> Warning! Please check your input.
  <button class="close-btn">&times;</button>
</div>`,
    css: `
.toast2 {
  background: #ff9800;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 6px;
  width: 280px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.toast2 .icon {
  font-size: 20px;
}
.toast2 .close-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
`,
    js: `// Close button event
toast.querySelector('.close-btn').onclick = () => toast.remove();`
  },
  3: {
    html: `<div class="toast toast3">
  Top bar notification: Update successful!
</div>`,
    css: `
.toast3 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #2196f3;
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  z-index: 10000;
  animation: slideDown 0.4s ease forwards;
}`,
    js: `// Auto dismiss after 3 seconds
setTimeout(() => toast.remove(), 3000);`
  },
  4: {
    html: `<div class="toast4-wrapper">
  <div class="toast4">
    Something went wrong! <button class="close-btn">Close</button>
  </div>
</div>`,
    css: `
.toast4-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
  background: rgba(0,0,0,0.3);
  z-index: 10000;
}
.toast4 {
  background: #e91e63;
  color: white;
  padding: 20px 24px;
  border-radius: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  animation: fadeIn 0.4s ease;
}
.toast4 .close-btn {
  background: white;
  color: #e91e63;
  font-weight: bold;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
`,
    js: `// Close button closes wrapper
closeBtn.onclick = () => wrapper.remove();`
  },
  5: {
    html: `<div class="toast toast5">
  Side Ribbon Toast
</div>`,
    css: `
.toast5 {
  background: #673ab7;
  border-radius: 6px 0 0 6px;
  width: 230px;
  color: white;
  padding: 14px 18px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.toast5::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-top: 40px solid #4527a0;
  border-right: 40px solid transparent;
}
`,
    js: `// Auto dismiss after 4 seconds
setTimeout(() => toast.remove(), 4000);`
  },
  6: {
    html: `<div class="toast toast6">
  Centered Flip! <button class="close-btn">&times;</button>
</div>`,
    css: `
.toast6 {
  background: #00bcd4;
  color: white;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  animation: flipIn 0.6s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}
.toast6 .close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
}
`,
    js: `// Close button closes toast
toast.querySelector('.close-btn').onclick = () => toast.remove();`
  },
  7: {
    html: `<div class="toast toast7">
  Typing toast...
</div>`,
    css: `
.toast7 {
  background: #795548;
  border-radius: 25px;
  padding: 12px 22px;
  font-family: monospace;
  font-size: 18px;
  color: white;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
`,
    js: `// Auto dismiss after 3 seconds
setTimeout(() => toast.remove(), 3000);`
  },
  8: {
    html: `<div class="toast toast8">
  Fancy 3D Slide Toast
</div>`,
    css: `
.toast8 {
  background: #009688;
  padding: 18px 26px;
  border-radius: 8px;
  color: white;
  animation: slide3D 0.6s forwards;
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 240px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.15);
}
`,
    js: `// Auto dismiss after 3 seconds
setTimeout(() => toast.remove(), 3000);`
  },
  9: {
    html: `<div class="toast toast9">
  Round Alert! (Click to close)
</div>`,
    css: `
.toast9 {
  background: #ff5722;
  border-radius: 50px;
  padding: 14px 24px;
  color: white;
  animation: expandCircle 0.5s forwards;
  position: fixed;
  top: 50px;
  right: 50px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
`,
    js: `// Clicking removes toast
toast.onclick = () => toast.remove();`
  },
  10: {
    html: `<div class="toast toast10">
  Please wait<span class="dots"></span>
</div>`,
    css: `
.toast10 {
  background: #607d8b;
  padding: 12px 18px;
  border-radius: 5px;
  font-family: monospace;
  font-weight: 600;
  color: white;
  display: flex;
  gap: 6px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.dots::after {
  content: '.';
  animation: dots 1s steps(3, end) infinite;
}
`,
    js: `// Auto dismiss after 4 seconds
setTimeout(() => toast.remove(), 4000);`
  }
};


function createToast(id) {
  container.innerHTML = "";

  if (id === 4) {
    // Special centered toast
    const wrapper = document.createElement('div');
    wrapper.className = 'toast4-wrapper';

    const toast = document.createElement('div');
    toast.className = 'toast4';
    toast.innerHTML = `Something went wrong!<button class="close-btn">Close</button>`;

    toast.querySelector('.close-btn').onclick = () => wrapper.remove();
    wrapper.appendChild(toast);
    document.body.appendChild(wrapper);
    showCode(id);
    return;
  }

  const toast = document.createElement('div');
  toast.className = `toast toast${id}`;

  // Custom content per toast
  switch (id) {
    case 1:
      toast.innerHTML = `Success!<div class="progress"></div>`;
      break;
    case 2:
      toast.innerHTML = `<span class="icon">⚠️</span> Warning! <button class="close-btn">&times;</button>`;
      toast.querySelector('.close-btn').onclick = () => toast.remove();
      break;
    case 3:
      toast.innerHTML = `Top bar notification!`;
      break;
    case 5:
      toast.textContent = "Side Ribbon Toast";
      break;
    case 6:
      toast.innerHTML = `Centered Flip! <button class="close-btn">&times;</button>`;
      toast.querySelector('.close-btn').onclick = () => toast.remove();
      break;
    case 7:
      toast.innerHTML = `Typing toast...`;
      break;
    case 8:
      toast.innerHTML = `Fancy 3D Slide`;
      break;
    case 9:
      toast.innerHTML = `Round Alert!`;
      toast.onclick = () => toast.remove();
      break;
    case 10:
      toast.innerHTML = `Please wait<span class="dots"></span>`;
      break;
    default:
      toast.textContent = `Toast #${id}`;
  }

  container.appendChild(toast);
  if (![2, 4, 6, 9].includes(id)) {
    setTimeout(() => toast.remove(), 4000);
  }

  showCode(id);
}

function showCode(id) {
  const code = codeMap[id];
  if (!code) {
    codeTabs.style.display = 'none';
    return;
  }
  tabHtml.textContent = code.html.trim();
  tabCss.textContent = code.css.trim();
  tabJs.textContent = code.js.trim();
  codeTabs.style.display = 'block';
}

document.querySelectorAll('button.trigger').forEach(btn => {
  btn.onclick = () => createToast(+btn.dataset.toast);
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  };
});
