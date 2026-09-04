/**
 * Aion Neural - Interactive Frontend Logic
 */

// --- CONFIGURACIÓN DEL GOOGLE APPS SCRIPT ---
// Reemplaza esta URL con la URL de tu aplicación web obtenida al implementar el Apps Script.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyL-8tehNWofBFt7MrvaUO17t0DHRmLhx7WdFrdqMl9cpOGts0hPmh9y3NaupqVNNkBoQ/exec'; 

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initQuantumCanvas();
    initEcosystemTabs();
    initScrollAnimations();
    initContactForm();
});

/* =========================================================================
   1. NAVIGATION & MOBILE DRAWER
   ========================================================================= */
function initNavigation() {
    const header = document.querySelector('.main-header');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navDrawer = document.querySelector('.mobile-nav-drawer');
    const navDrawerLinks = document.querySelectorAll('.mobile-nav-item');

    // Sticky header shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
            header.style.backgroundColor = 'rgba(3, 3, 6, 0.9)';
            header.style.height = '70px';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(3, 3, 6, 0.7)';
            header.style.height = '80px';
        }
    });

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.classList.contains('open');
        if (isOpen) {
            menuToggle.classList.remove('open');
            navDrawer.classList.remove('open');
            document.body.style.overflow = 'auto';
        } else {
            menuToggle.classList.add('open');
            navDrawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });

    // Close menu when clicking link
    navDrawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navDrawer.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });
}

/* =========================================================================
   2. QUANTUM NEURAL CANVAS BACKGROUND
   ========================================================================= */
function initQuantumCanvas() {
    const canvas = document.getElementById('quantum-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y, velocityX, velocityY, size, color) {
            this.x = x;
            this.y = y;
            this.vx = velocityX;
            this.vy = velocityY;
            this.size = size;
            this.color = color;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
        }

        update() {
            // Check bounds
            if (this.x > canvas.width || this.x < 0) this.vx = -this.vx;
            if (this.y > canvas.height || this.y < 0) this.vy = -this.vy;

            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Mouse interact (push away slightly)
            if (mouse.x != null && mouse.y != null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x += (dx / distance) * force * 2;
                    this.y += (dy / distance) * force * 2;
                }
            }

            this.draw();
        }
    }

    function initParticles() {
        particles = [];
        // Adaptive particle count based on screen size
        const numParticles = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 75);
        const colors = ['#00f2fe', '#9b51e0', '#39ff14'];

        for (let i = 0; i < numParticles; i++) {
            let size = Math.random() * 2 + 1;
            let x = Math.random() * (canvas.width - size * 2) + size;
            let y = Math.random() * (canvas.height - size * 2) + size;
            let vx = (Math.random() - 0.5) * 0.6;
            let vy = (Math.random() - 0.5) * 0.6;
            let color = colors[Math.floor(Math.random() * colors.length)];
            
            particles.push(new Particle(x, y, vx, vy, size, color));
        }
    }

    // Connect particles with lines
    function connect() {
        let maxDistance = 110;
        ctx.globalAlpha = 1;
        
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    let alpha = (1 - (distance / maxDistance)) * 0.12;
                    ctx.strokeStyle = '#ffffff';
                    ctx.globalAlpha = alpha;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        connect();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();
}

/* =========================================================================
   3. ECOSYSTEM COMPONENT SWITCHER
   ========================================================================= */
function initEcosystemTabs() {
    const items = document.querySelectorAll('.eco-item');
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active classes
            items.forEach(i => i.classList.remove('active'));
            // Add to clicked
            item.classList.add('active');
        });
    });
}

/* =========================================================================
   4. SCROLL REVEAL & ROADMAP SCROLL PROGRESS
   ========================================================================= */
function initScrollAnimations() {
    // 4a. Reveal section elements on scroll
    const sections = document.querySelectorAll('.reveal-section');
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Remove section from observer since we want it to stay visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4b. Roadmap progress line scroll handler
    const roadmap = document.querySelector('.roadmap-section');
    const progressLine = document.querySelector('.timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');

    window.addEventListener('scroll', () => {
        if (!roadmap || !progressLine) return;
        
        const rect = roadmap.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate roadmap section visibility progress
        // 0 when section starts entering, 1 when section is fully past center
        const sectionHeight = rect.height;
        const visibleTop = rect.top - (viewportHeight * 0.3);
        
        let scrollProgress = 0;
        if (visibleTop < 0) {
            scrollProgress = Math.min(Math.abs(visibleTop) / (sectionHeight * 0.6), 1);
        }
        
        // Map height between 0% and 100%
        progressLine.style.height = `${scrollProgress * 100}%`;

        // Activate timeline phases dynamically based on scroll depth
        if (scrollProgress < 0.2) {
            setTimelineActive(1);
        } else if (scrollProgress >= 0.2 && scrollProgress < 0.65) {
            setTimelineActive(2);
        } else {
            setTimelineActive(3);
        }
    });

    function setTimelineActive(phaseNum) {
        timelineItems.forEach((item, index) => {
            if (index + 1 <= phaseNum) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

/* =========================================================================
   5. CONTACT FORM & SILENT GOOGLE SHEET SUBMISSION
   ========================================================================= */
function initContactForm() {
    const form = document.getElementById('aion-capture-form');
    const feedback = document.getElementById('form-feedback');
    const btnSubmit = document.getElementById('btn-submit-form');
    const btnText = btnSubmit.querySelector('.btn-text');
    const btnLoader = btnSubmit.querySelector('.btn-loader');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Reset feedback message & status classes
        feedback.className = 'form-feedback hidden';
        feedback.textContent = '';

        // 2. Client side validation check
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const profile = form.profile.value;
        const message = form.message.value.trim();
        const honeypot = form.website.value;

        // Security check: Honeypot for bots (discard silently)
        if (honeypot) {
            console.warn("Spam bot detected via honeypot.");
            setTimeout(() => {
                showFeedback('✓ Solicitud de transmisión recibida. Tu perfil ha sido registrado en el sistema Aion.', 'success');
                form.reset();
            }, 500);
            return;
        }

        if (!name || !email || !profile || !message) {
            showFeedback('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }

        // 3. UI Loading State
        btnSubmit.disabled = true;
        btnText.style.opacity = '0.3';
        btnLoader.classList.remove('hidden');

        // Prepare data to send
        const formData = {
            name: name,
            email: email,
            profile: profile,
            message: message
        };

        // 4. Submission
        if (!GOOGLE_SCRIPT_URL) {
            // SIMULACIÓN DE DESPLIEGUE (En caso de que el usuario aún no haya configurado la URL)
            console.warn('Aion Neural: GOOGLE_SCRIPT_URL no está configurada. Simulando envío local exitoso.');
            
            setTimeout(() => {
                resetLoadingState();
                showFeedback('✓ Solicitud de transmisión recibida. Tu perfil ha sido registrado en el sistema Aion.', 'success');
                form.reset();
            }, 1200);
            return;
        }

        try {
            // Realizar post usando fetch con JSON (apoyado por el soporte doOptions en el Script)
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                resetLoadingState();
                
                if (result.status === 'success') {
                    showFeedback('✓ Solicitud de transmisión recibida. Tu perfil ha sido registrado en el sistema Aion.', 'success');
                    form.reset();
                } else {
                    showFeedback(`Error en servidor: ${result.message || 'Error desconocido'}`, 'error');
                }
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Submission Error:', error);
            resetLoadingState();
            
            // Intento de fallback: Si falla CORS, puede que se haya guardado igual (modo 'no-cors' por redirección de script de google)
            // Hacemos una validación de fallback silenciosa en caso de que sea un redireccionamiento opaque
            try {
                // Enviar como simple url-encoded post en caso de problemas con JSON preflight
                const urlParams = new URLSearchParams(formData);
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: urlParams.toString()
                });
                
                // Al ser no-cors no podemos leer la respuesta, pero si no tira excepción asumimos que llegó (comportamiento normal de scripts de google)
                showFeedback('✓ Solicitud de transmisión recibida. Tu perfil ha sido registrado en el sistema Aion.', 'success');
                form.reset();
            } catch (fallbackError) {
                showFeedback('Error al transmitir datos. Por favor verifica tu conexión o intenta más tarde.', 'error');
            }
        }
    });

    function showFeedback(msg, type) {
        feedback.textContent = msg;
        feedback.classList.remove('hidden');
        feedback.classList.add(type);
    }

    function resetLoadingState() {
        btnSubmit.disabled = false;
        btnText.style.opacity = '1';
        btnLoader.classList.add('hidden');
    }
}
