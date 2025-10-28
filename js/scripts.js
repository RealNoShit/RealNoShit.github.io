window.onload = function() {

  // Secret code detection
  let secretInput = "";
const activationCode = "snake";

document.addEventListener("keydown", (event) => {
  secretInput += event.key.toLowerCase();

  // Keep only last characters equal to the code length
  if (secretInput.length > activationCode.length) {
    secretInput = secretInput.slice(-activationCode.length);
  }

  if (secretInput === activationCode) {
    startSnakeGame();
  }
});

//Bouncing pngs
const bouncers = [
  { el: document.getElementById('bouncer1'), x: 100, y: 100, dx: 3, dy: 2 },
  { el: document.getElementById('bouncer2'), x: 300, y: 200, dx: -2, dy: 3 },
  { el: document.getElementById('bouncer3'), x: 600, y: 50, dx: 4, dy: -3 },
  { el: document.getElementById('bouncer4'), x: 50, y: 200, dx: 5, dy: -2 }
];

// Only run bouncing if the first bouncer exists
if (bouncers[0].el) {

  function moveBouncers() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    bouncers.forEach(b => {
      if (!b.el) return;

      b.x += b.dx;
      b.y += b.dy;

      if (b.x <= 0) { b.x = 0; b.dx *= -1; }
      if (b.x + b.el.offsetWidth >= w) {
        b.x = w - b.el.offsetWidth;
        b.dx *= -1;
      }
      if (b.y <= 0) { b.y = 0; b.dy *= -1; }
      if (b.y + b.el.offsetHeight >= h) {
        b.y = h - b.el.offsetHeight;
        b.dy *= -1;
      }

      b.el.style.left = b.x + 'px';
      b.el.style.top = b.y + 'px';
    });

    requestAnimationFrame(moveBouncers);
  }

  moveBouncers();
}

// Slide menu toggle (update 2 now orwks on all pages)
const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');

if (menuButton && sideMenu) {
  menuButton.addEventListener('click', () => {
    sideMenu.style.left = (sideMenu.style.left === "0px") ? "-220px" : "0px";
  });
}


//Music related
const music = document.getElementById('menumusic');
const muteBtn = document.getElementById('mute-button');
const volumeSlider = document.getElementById('volume-slider');

music.volume = 0.5;
volumeSlider.value = 0.5;

// Only activate audio controls if they exist on this page
if (music && muteBtn && volumeSlider) {

  music.volume = 0.5;
  volumeSlider.value = 0.5;

  document.addEventListener('click', () => {
    music.muted = false;
    music.play();
  }, { once: true });

  muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    muteBtn.textContent = music.muted ? "🔇" : "🔊";
  });

  volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
    muteBtn.textContent = (music.volume == 0) ? "🔇" : "🔊";
  });

}

// Mute toggle button
muteBtn.addEventListener('click', () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "🔇" : "🔊";
});

// Volume slider
volumeSlider.addEventListener('input', () => {
  music.volume = volumeSlider.value;
  if (music.volume == 0) {
    music.muted = true;
    muteBtn.textContent = "🔇";
  } else {
    music.muted = false;
    muteBtn.textContent = "🔊";
  }

});
};
