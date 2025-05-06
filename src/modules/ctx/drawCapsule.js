module.exports = function drawCapsule(ctx, x, y, width, height, radius) {
    const r = radius;
  
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);                // top straight
    ctx.arc(x + width - r, y + r, r, -Math.PI / 2, Math.PI / 2); // right half-circle
    ctx.lineTo(x + r, y + height);              // bottom straight
    ctx.arc(x + r, y + r, r, Math.PI / 2, -Math.PI / 2); // left half-circle
    ctx.closePath();
  }
  