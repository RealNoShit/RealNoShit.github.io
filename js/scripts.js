const bouncers = [
  { el: document.getElementById('bouncer1'), x: 100, y: 100, dx: 3, dy: 2 },
  { el: document.getElementById('bouncer2'), x: 300, y: 200, dx: -2, dy: 3 },
  { el: document.getElementById('bouncer3'), x: 1000, y: 720, dx: -2, dy: 3 },
  { el: document.getElementById('bouncer4'), x: 1300, y: 400, dx: 3, dy: 2 },
];

function moveBouncers() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  bouncers.forEach(b => {
    b.x += b.dx;
    b.y += b.dy;

    if (b.x <= 0 || b.x + b.el.width >= w) b.dx *= -1;
    if (b.y <= 0 || b.y + b.el.height >= h) b.dy *= -1;

    b.el.style.left = b.x + 'px';
    b.el.style.top = b.y + 'px';
  });

  requestAnimationFrame(moveBouncers);
}

moveBouncers();
