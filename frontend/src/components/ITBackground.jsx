import { useEffect, useRef } from 'react';

/**
 * ITBackground — canvas-based animated IT-themed background
 * Circuit nodes, floating particles, grid dots, code snippets
 */
export default function ITBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // --- Config ---
    const ACCENT = '108, 92, 231';      // #6C5CE7
    const TEAL   = '0, 217, 192';       // #00D9C0

    // --- Nodes (circuit board nodes) ---
    const NODE_COUNT = Math.min(40, Math.floor((W * H) / 28000));
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    // --- Floating code snippets ---
    const CODE_SNIPPETS = [
      'const x = []', 'import React', '<Component />', 'SELECT *', 'npm install',
      'git commit', 'async/await', 'useState()', '{...props}', 'API.get()',
      'v-model', 'function()', ':root{}', '#include', 'pip install',
      '01001010', 'HTTP/2', 'JSON.parse', 'webpack', 'tailwind',
    ];
    const floats = Array.from({ length: 12 }, (_, i) => ({
      text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
      x: Math.random() * W,
      y: Math.random() * H,
      vy: -(Math.random() * 0.4 + 0.15),
      opacity: Math.random() * 0.12 + 0.04,
      size: Math.random() * 8 + 9,
      color: Math.random() > 0.5 ? ACCENT : TEAL,
    }));

    // --- Grid dots ---
    const GRID_SPACING = 60;

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);

      // 1. Grid dots
      ctx.fillStyle = `rgba(${ACCENT}, 0.06)`;
      for (let gx = 0; gx < W; gx += GRID_SPACING) {
        for (let gy = 0; gy < H; gy += GRID_SPACING) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Connections between close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);

            // Circuit-style: L-shaped lines (horizontal then vertical)
            const midX = nodes[j].x;
            const midY = nodes[i].y;
            ctx.lineTo(midX, midY);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Nodes
      nodes.forEach((n, i) => {
        n.pulse += 0.025;
        const pulseFactor = (Math.sin(n.pulse) * 0.5 + 0.5);

        // Outer glow ring
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        grad.addColorStop(0, `rgba(${i % 3 === 0 ? TEAL : ACCENT}, ${0.15 * pulseFactor})`);
        grad.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(${i % 3 === 0 ? TEAL : ACCENT}, ${0.5 + pulseFactor * 0.4})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        // Move
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // 4. Floating code text
      floats.forEach(f => {
        ctx.font = `${f.size}px 'Courier New', monospace`;
        ctx.fillStyle = `rgba(${f.color}, ${f.opacity})`;
        ctx.fillText(f.text, f.x, f.y);
        f.y += f.vy;
        if (f.y < -20) {
          f.y = H + 10;
          f.x = Math.random() * W;
          f.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        }
      });

      // 5. Horizontal scan line (subtle)
      const scanY = ((t * 0.04) % H);
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, `rgba(${ACCENT}, 0)`);
      scanGrad.addColorStop(0.5, `rgba(${ACCENT}, 0.025)`);
      scanGrad.addColorStop(1, `rgba(${ACCENT}, 0)`);
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, W, 120);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ opacity: 1 }}
    />
  );
}
