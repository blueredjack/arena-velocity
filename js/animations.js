/* ==========================================
   VELOCITY ARENA - ANIMATIONS
   Arquivo: js/animations.js
   Descrição: Animações on scroll e efeitos
   ========================================== */

const Animations = {
    // ===========================
    // CONFIGURAÇÃO
    // ===========================
    config: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        animateClass: 'animate-on-scroll',
        visibleClass: 'visible'
    },

    // ===========================
    // INICIALIZAÇÃO
    // ===========================
    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
    },

    // ===========================
    // ANIMAÇÕES ON SCROLL
    // ===========================
    setupScrollAnimations() {
        const elements = document.querySelectorAll(`.${this.config.animateClass}`);
        
        if (elements.length === 0) return;

        // Verifica se IntersectionObserver é suportado
        if (!('IntersectionObserver' in window)) {
            // Fallback: mostra todos os elementos
            elements.forEach(el => el.classList.add(this.config.visibleClass));
            return;
        }

        const observerOptions = {
            threshold: this.config.threshold,
            rootMargin: this.config.rootMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(this.config.visibleClass);
                    // Opcional: para de observar após animado
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));
    },

    // ===========================
    // ANIMAÇÃO DE CONTADORES
    // ===========================
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        if (counters.length === 0) return;

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    },

    // ===========================
    // ANIMAR CONTADOR
    // ===========================
    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = parseInt(element.dataset.duration) || 2000;
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        
        let start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);

            element.textContent = prefix + this.formatNumber(current) + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + this.formatNumber(target) + suffix;
            }
        };

        requestAnimationFrame(updateCounter);
    },

    // ===========================
    // FORMATAR NÚMERO
    // ===========================
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    // ===========================
    // PARALLAX (OPCIONAL)
    // ===========================
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = scrollY * speed;
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    },

    // ===========================
    // REVELAR ELEMENTOS
    // ===========================
    reveal(element, delay = 0) {
        setTimeout(() => {
            element.classList.add(this.config.visibleClass);
        }, delay);
    },

    // ===========================
    // ESCONDER ELEMENTOS
    // ===========================
    hide(element) {
        element.classList.remove(this.config.visibleClass);
    }
};

// ===========================
// INICIALIZA QUANDO DOM READY
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    Animations.init();
});

// Exporta para uso global
window.Animations = Animations;
