document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const validCredentials = { email: "ciudadano@uresa.com", password: "universo2024" };

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === validCredentials.email && password === validCredentials.password) {
            window.location.href = 'index.html';
        } else {
            errorMessage.style.display = 'block';
            setTimeout(() => errorMessage.style.display = 'none', 3000);
        }
    });

    createStarfield();
});

function createStarfield() {
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
    
    if (!document.querySelector('#starfield-style')) {
        const style = document.createElement('style');
        style.id = 'starfield-style';
        style.textContent = `@keyframes twinkle { 0% { opacity: 0.3; } 100% { opacity: 0.8; } }`;
        document.head.appendChild(style);
    }
}