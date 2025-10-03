class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['name', 'price', 'description', 'image', 'category'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const name = this.getAttribute('name') || 'Producto Cósmico';
        const price = this.getAttribute('price') || '₡---';
        const description = this.getAttribute('description') || 'Descripción galáctica';
        const image = this.getAttribute('image') || 'img/placeholder.jpg';
        const category = this.getAttribute('category') || 'universal';

        this.shadowRoot.innerHTML = `
            <style>
                .card { background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease; font-family: 'Segoe UI', sans-serif; }
                .card:hover { transform: translateY(-5px); border-color: #06b6d4; box-shadow: 0 10px 25px rgba(124,58,237,0.3); }
                .product-image { height: 160px; overflow: hidden; }
                .product-img { width: 100%; height: 100%; object-fit: cover; background: linear-gradient(45deg, #7c3aed, #1e293b); }
                .product-content { padding: 1.25rem; }
                .product-title { color: #06b6d4; font-size: 1.1rem; margin-bottom: 0.5rem; font-weight: 600; }
                .product-description { color: #f1f5f9; opacity: 0.8; font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.4; }
                .product-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
                .product-price { color: #f97316; font-weight: bold; font-size: 1.2rem; }
                .product-category { background: rgba(124,58,237,0.3); color: #c4b5fd; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.7rem; }
                .add-to-cart { width: 100%; padding: 0.75rem; background: linear-gradient(45deg, #7c3aed, #06b6d4); 
                    color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; }
                .add-to-cart:hover { transform: scale(1.05); }
            </style>
            <div class="card">
                <div class="product-image"><img src="${image}" alt="${name}" class="product-img"></div>
                <div class="product-content">
                    <h4 class="product-title">${name}</h4>
                    <p class="product-description">${description}</p>
                    <div class="product-meta">
                        <span class="product-price">${price}</span>
                        <span class="product-category">${category}</span>
                    </div>
                    <button class="add-to-cart">Adquirir</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.add-to-cart').addEventListener('click', () => {
            alert(`🚀 ¡Adquiriste: ${name}! \n\nLos documentos intergalácticos llegarán pronto.`);
        });
    }
}

customElements.define('product-card', ProductCard);