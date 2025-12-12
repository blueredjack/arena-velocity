/* ==========================================
   VELOCITY ARENA - NAVIGATION
   Arquivo: js/navigation.js
   Descrição: Navegação, scroll e progress bar
   ========================================== */

const Navigation = {
    // ===========================
    // CONFIGURAÇÃO
    // ===========================
    config: {
        navOffset: 80,
        progressBarId: 'progressBar',
        activeClass: 'active'
    },

    // ===========================
    // INICIALIZAÇÃO
    // ===========================
    init() {
        this.setupScrollToSection();
        this.setupProgressBar();
        this.setupActiveNavOnScroll();
    },

    // ===========================
    // SCROLL SUAVE PARA SEÇÃO
    // ===========================
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - this.config.navOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    // ===========================
    // SETUP SCROLL TO SECTION
    // ===========================
    setupScrollToSection() {
        // Adiciona listener global para botões de navegação
        document.addEventListener('click', (e) => {
            const navBtn = e.target.closest('[data-section]');
            if (navBtn) {
                e.preventDefault();
                const sectionId = navBtn.dataset.section;
                this.scrollToSection(sectionId);
                this.updateActiveButton(navBtn);
            }
        });
    },

    // ===========================
    // PROGRESS BAR
    // ===========================
    setupProgressBar() {
        const progressBar = document.getElementById(this.config.progressBarId);
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }, { passive: true });
    },

    // ===========================
    // ATUALIZAR BOTÃO ATIVO
    // ===========================
    updateActiveButton(activeBtn) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove(this.config.activeClass);
        });
        activeBtn.classList.add(this.config.activeClass);
    },

    // ===========================
    // NAV ATIVO NO SCROLL
    // ===========================
    setupActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navButtons = document.querySelectorAll('.nav-btn[data-section]');

        if (sections.length === 0 || navButtons.length === 0) return;

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navButtons.forEach(btn => {
                btn.classList.remove(this.config.activeClass);
                if (btn.dataset.section === current) {
                    btn.classList.add(this.config.activeClass);
                }
            });
        }, { passive: true });
    },

    // ===========================
    // SCROLL TO TOP
    // ===========================
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// ===========================
// INICIALIZA QUANDO DOM READY
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
});

// Função global para compatibilidade com onclick inline
function scrollToSection(sectionId) {
    Navigation.scrollToSection(sectionId);
}

// Exporta para uso global
window.Navigation = Navigation;
