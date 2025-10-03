document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM cargado - iniciando aplicación');
    initializeApp();
});

async function initializeApp() {
    try {
        await loadComponents();
        
        // Solo cargar productos si estamos en index.html
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            await loadProducts();
        }
        
        setupEventListeners();
        setupNavigation();
        setupLogout();
        createStarfield();
        setActiveNavItem();
    } catch (error) {
        console.error('❌ Error inicializando app:', error);
    }
}

async function loadComponents() {
    try {
        const components = [
            { id: 'header-container', file: 'header.html' },
            { id: 'sidebar-container', file: 'sidebar.html' },
            { id: 'footer-container', file: 'footer.html' }
        ];

        for (const component of components) {
            const response = await fetch(`components/${component.file}`);
            if (response.ok) {
                document.getElementById(component.id).innerHTML = await response.text();
            }
        }
    } catch (error) {
        console.warn('⚠️ Algunos componentes no se cargaron:', error);
    }
}

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        renderProducts(await response.json());
    } catch (error) {
        console.error('❌ Error cargando productos:', error);
        const container = document.getElementById('products-template-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Error cargando productos</h3>
                    <p><strong>${error.message}</strong></p>
                </div>
            `;
        }
    }
}

function renderProducts(products) {
    const container = document.getElementById('products-template-container');
    const template = document.getElementById('product-template');
    
    if (!container || !template) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const clone = template.content.cloneNode(true);
        const article = clone.querySelector('.product-card');
        
        article.setAttribute('data-category', product.type);
        article.querySelector('.product-img').src = product.image;
        article.querySelector('.product-img').alt = product.name;
        article.querySelector('.product-title').textContent = product.name;
        article.querySelector('.product-description').textContent = product.description;
        article.querySelector('.product-price').textContent = product.price;
        article.querySelector('.product-category').textContent = product.type;
        
        container.appendChild(clone);
    });
}

function setupEventListeners() {
    document.addEventListener('click', (e) => {
        // Filtros de productos (solo en index.html)
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            filterProducts(e.target.dataset.filter);
        }
        
        // Botón añadir al carrito (solo en index.html)
        if (e.target.classList.contains('add-to-cart')) {
            const productName = e.target.closest('.product-card').querySelector('.product-title').textContent;
            alert(`🌌 ¡Felicidades! \nHas adquirido: ${productName}\n\nRecibirás los documentos en tu correo cósmico.`);
        }
    });
}

function filterProducts(filter) {
    document.querySelectorAll('.product-card').forEach(product => {
        product.style.display = filter === 'all' ? 'block' : product.getAttribute('data-category') === filter ? 'block' : 'none';
    });
}

function setupNavigation() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-item')) {
            e.preventDefault();
            
            const targetHref = e.target.getAttribute('href');
            const filterType = e.target.getAttribute('data-filter');
            
            // Si es un enlace a otra página HTML
            if (targetHref.endsWith('.html')) {
                window.location.href = targetHref;
                return;
            }
            
            // Si es un filtro desde el sidebar (propiedades/experiencias)
            if (filterType) {
                activateFilter(filterType);
                return;
            }
            
            // Navegación normal
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
}

// Nueva función para activar filtros
function activateFilter(filterType) {
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        window.location.href = 'index.html';
        localStorage.setItem('activeFilter', filterType);
        return;
    }
    
    // Si estamos en index, aplicar el filtro directamente
    applyFilter(filterType);
}

// Función para aplicar el filtro
function applyFilter(filterType) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filterType) {
            btn.classList.add('active');
        }
    });
    
    // Aplicar filtro a los productos
    filterProducts(filterType);
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-filter') === filterType) {
            item.classList.add('active');
        }
    });
    
    // También marcar "Inicio" como activo si estamos en "Todos"
    if (filterType === 'all') {
        document.querySelector('a[href="index.html"]').classList.add('active');
    }
}

function setupLogout() {
    document.addEventListener('click', (e) => {
        if (e.target.id === 'logoutBtn' && confirm('¿Salir del portal galáctico?')) {
            window.location.href = 'login.html';
        }
    });
}

function setActiveNavItem() {
    setTimeout(() => {
        const currentPage = window.location.pathname;
        let activeLink = '';
        
        if (currentPage.includes('index.html') || currentPage === '/') {
            activeLink = 'index.html';
        } else if (currentPage.includes('perfil.html')) {
            activeLink = 'perfil.html';
        } else if (currentPage.includes('login.html')) {
            activeLink = 'login.html';
        }
        
        if (activeLink) {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === activeLink) {
                    item.classList.add('active');
                }
            });
        }
    }, 100);
}

function createStarfield() {
    if (document.querySelector('#starfield-style')) return;
    
    const body = document.body;
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: fixed; width: ${Math.random() * 3}px; height: ${Math.random() * 3}px;
            background: white; border-radius: 50%; left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh; opacity: ${Math.random() * 0.7 + 0.3};
            z-index: -1; animation: twinkle ${Math.random() * 3 + 2}s infinite alternate;
        `;
        body.appendChild(star);
    }
    
    const style = document.createElement('style');
    style.id = 'starfield-style';
    style.textContent = `@keyframes twinkle { 0% { opacity: 0.3; } 100% { opacity: 0.8; } }`;
    document.head.appendChild(style);
}