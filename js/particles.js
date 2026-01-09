/* ===================================
   ROBOTICS CLUB - HERO PARTICLE ANIMATION
   Canvas-based particle network effect
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle resize
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Particle Class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = '#000000'; // Black center
            ctx.fill();

            // Blue light boundary effect
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#00d9ff'; // Cyan border

            // Performance optimization: Only add glow on larger screens
            if (window.innerWidth > 768) {
                ctx.shadowBlur = 15; // Glow effect
                ctx.shadowColor = '#00d9ff';
            } else {
                ctx.shadowBlur = 0;
                ctx.shadowColor = 'transparent';
            }
            ctx.stroke();

            // Reset shadow for performance and next operations
            ctx.shadowBlur = 0;
        }

        // Update particle position
        update() {
            // Check if particle is still within canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse Interaction Check
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 2; // Move away right
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 2; // Move away left
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 2; // Move away down
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 2; // Move away up
                }
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            // Draw particle
            this.draw();
        }
    }

    // Mouse position
    let mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 80) * (canvas.width / 80)
    }

    window.addEventListener('mousemove', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Mouse out
    window.addEventListener('mouseout', function () {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // Initialize particles
    function init() {
        particlesArray = [];
        // Adjust particle count for mobile
        let numberOfParticles = (canvas.width * canvas.height) / 9000;
        if (numberOfParticles > 90) numberOfParticles = 90; // Cap at ~90 as requested
        if (numberOfParticles > 90) numberOfParticles = 90; // Cap at ~90 as requested
        if (window.innerWidth < 768) numberOfParticles = 25; // Reduce for mobile performance

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 3; // Size between 3px and 6px (larger for visibility)
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            // Reduced speed: -0.5 to 0.5
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1) - 0.5;
            let color = '#00d9ff'; // var(--success-cyan)

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connect particles with lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                // Distance check (120px * 120px = 14400)
                if (distance < (canvas.width / 7) * (canvas.height / 7)) { // Dynamic distance based on screen size
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(0, 217, 255,' + opacityValue + ')'; // Cyan with opacity
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    init();
    animate();
});
